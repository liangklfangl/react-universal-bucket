//注意，虽然这里都是运行在服务器端的代码，但是我们都是用了import语法，处理交给了isomophic
import Express from "express";
import React from "react";
import {renderToString} from "react-dom/server";
import httpProxy from 'http-proxy';
import http from 'http';
import PrettyError from 'pretty-error';
import favicon from 'serve-favicon';
import compression from 'compression';
import createStore from './redux/create';
import Html from './helpers/Html';
import {Provider} from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
// You must provide the enhanced history to your <Router> component
// https://github.com/liangklfang/react-router/blob/master/docs/API.md#match-routes-location-history-options--cb
import {createMemoryHistory} from "react-router";
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import { match } from 'react-router';
import getRoutes from './routes';
//memory history不会从地址栏中读取地址（所以客户端不会自己根据location渲染组件树），这也是我们服务端渲染的基础
//也有利于测试以及其他如React Native的渲染环境。所以当你按后退的时候其实history是服务端维持的
//http://galen-yip.com/react/webpack/2016/02/14/redux-server-rendering-and-webpack-optimization/
import ApiClient from './helpers/ApiClient';
//可以通过这个对象的get,post,put,delete等向我们的服务器发送消息，是对superagent的一层封装
const path = require("path");
const config = require("./config.js");
const targetUrl = 'http://' + (process.env.APIHOST||"localhost") + ':' + (process.env.APIPORT||"8888");
//反向代理向那个服务器地址发送消息
const app = new Express();
const server = new http.Server(app);
//node-http-proxy是一个HTTP代理库，它支持websocket，可以用于反向代理或者负载均衡
//https://github.com/nodejitsu/node-http-proxy
//反向代理就是由他来接收外部的请求，然后将请求发送给内网的用户
//正向代理(从内往外):client要告诉代理服务器要访问的网站的名称，然后代理服务器向该网站发送请求并把内容返回给客户端
//         此时client访问的就是一个代理服务器
//反向代理(从外向内)：client像是直接访问服务器，而服务器本身判断需要从哪里获取数据
//          此时client访问的就是一个服务器而不是代理服务器
//正向代理的典型用途是为在防火墙内的[局域网客户端]提供访问Internet的途径（如用户通过DLUT的服务器访问其他网站）。正向代理还可以使用缓冲特性减少网络使用率。
//反向代理的典型用途是将防火墙后面的服务器提供给Internet用户访问（我直接访问baidu服务器，由服务器选择从哪里获取资源static.baidu.com）。我直接访问一个服务器，然后访问的服务器自动选择要访问的服务器来获取资源
//Detail : http://www.jianshu.com/p/94e86e2c5874
//你访问这个反向代理，这个代理决定去访问谁，这里是直接访问localhost:3030,这是API服务器
const proxy = httpProxy.createProxyServer({
	target:targetUrl,
	ws:true
  //反代理服务器与服务器之间支持webpack socket
});
app.use(compression());
//启动压缩
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));
//我们在client端将资源打包到static/dist目录下，所以我们将静态资源设置为这个路径
app.use("/api",(req,res)=>{
	proxy.web(req,res,{target:targetUrl});
	//web方法用来代理请求普通的https/http请求。
  //当你发送http://localhost:3000/api，我发送到真实的服务器上去
  //本项目不支持该请求，直接访问会返回NotFound。这是我们API服务器的返回结果
});

//在ApiClient中判断URL的时候，如果__SERVER__为false那么表示是客户端user向反代理服务器发送请求
//此时就会发送到这里进行处理，由反代理服务器向代理服务器发送api请求
app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});
//要求升级协议
//用来代理websocket请求
server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});
proxy.on('error', (error, req, res) => {
  console.log("res内部的东西",res);
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }
  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});
//这里是Express中间件，所以要有客户端请求才会执行
app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // 如果是开发环境，我们不要缓存webpack的stats,因为资源在开发环境中启动了HMR
    // 所以经常会发生改变
    // 这个方法会从硬盘中重新读取webpack-assets.json，同时刷新以前require进来的资源的缓存
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  //此时client有['get', 'post', 'put', 'patch', 'del']实例方法
  const memoryHistory = createMemoryHistory(req.originalUrl);
  //通过URL得到一个历史记录,memoryHistory是服务器渲染的基础
  const store = createStore(memoryHistory, client);
  //注意：我们的store是依赖于memoryHistory的，因为store要根据浏览器历史来得到正确的消息
  //同时我们的store也与ApiClient有关，后者用于服务器端发送Get/post等请求
  //传入的client是一个ApiClient实例，是对superagent的封装
  //我们这里的store已经通过react-router-redux添加了中间件了。reducer已经在这个store中指定了，也就是对
  //store有那些行为操作
  const history = syncHistoryWithStore(memoryHistory, store);
  //从提供的history对象获得一个增强了的history，这个增强的history会首先将history.listen获取到的
  //location更新传递到store。这样可以保证当store更新了，不管是从个浏览器还是时间旅行，这个增强了
  //的history.listen都能将状态始终保持一致。你要将这个增强的history传给Router组件，这样可以保证
  //Router始终和location和store保持一致
  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }
  //如果支持服务端渲染
  //webpackIsomorphicTools.assets()得到的是目录下的webpack-assets.json的完整内容
  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }
  // https://github.com/liangklfang/react-router/blob/master/docs/API.md#match-routes-location-history-options--cb
  // match({ routes, location, [history], [...options] }, cb)
  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
      //重定向要添加pathname+search
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
      //发送500告诉客户端请求失败，同时不让缓存了
    } else if (renderProps) {
      //以前都是:构造一个action，这个action做一些异步的事情来加载数据，在reducer
      //中我们保存数据到redux的state中，然后将数据传递给组件或者容器
      //这都是经常完成的事情。但是有时候，我们想要数据预先加载，或者你想要构建一个通用的
      //应用，或者让你的页面更加健壮，当数据加载的时候不要跳转页面
      //这个redux-async-connect包含两部分:
      //(1)延缓容器的渲染直到异步的请求完成
      //(2)保存数据到store中，同时将加载的connect到你的容器中~
      //const store = createStore(combineReducers({reduxAsyncConnect}));
      //在reducer中完成，也就是说这个异步请求可以操作数据库。reducer是用于操作数据库
      //这里的helpers是干嘛？其是一个ApiClient对象?
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );
          //这里不是 <RouterContext {...renderProps} />
            //https://zhuanlan.zhihu.com/p/22875338
        res.status(200);
        global.navigator = {userAgent: req.headers['user-agent']};
        //正确发送到客户端,你会发现这里的Html组件是有一个component的，而
        //这个component就是Provider里面添加ReduxAsyncConnect，并给ReduxAsyncConnect
        //添加整个renderProps属性。
        //其中我们的component会全部在Html中添加到下面的div结构中
        //<div id="content" dangerouslySetInnerHTML={{__html: content}}/>
        res.send('<!doctype html>\n' +
          renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

//我自己的反向代理服务器开始工作
if (process.env.PORT) {
  server.listen(process.env.PORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
