自已以前对redux,react,rect-redux,react-router都是有一点的了解，但是不足的地方在于没有做一个demo将他们串起来,所以总是感觉似懂非懂。所以我最后写了这个例子，希望有同样困扰的同学能够有所收益。也欢迎star,issue

#### 1.项目基本知识点
(1)代理与反代理的基本内容，使用http-proxy来完成。通过如下函数完成:
```js
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    return 'http://' + (process.env.APIHOST||"localhost") + ':' + (process.env.APIPORT||"3030") + adjustedPath;
  }
  //客户端ajax请求，__SERVER__为false
  return '/api' + adjustedPath;
}
//通过superagent发送请求到API服务器
export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (params) {
          request.query(params);
        }
        //如果传入了参数，那么通过query添加进去
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        if (data) {
          request.send(data);
        }
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  empty() {}
}

```
其中在bin/server.js中将__SERVER__设置为true。对于那些服务端渲染发送的请求，其实都是反代理服务器向代理服务器发出的，所以此时__SERVER__为true，发送请求时候要加上域名+端口号，这是两个服务器之间的沟通。当服务器端渲染好了(将组件中需要的store中的数据全部封装完成以后)，资源发送到客户端以后，客户端通过ajax请求(实际上是通过此处的superagent来完成的)反代理服务器的时候，其实是一个应用之间的沟通，此时客户端只要将请求发送到反代理服务器就可以了，具体后续的请求由反代理服务器自己完成。而且因为是在一个服务器之间请求，所以无需添加域名和端口号。其中ajax请求是通过dispatch一个action而修改整个应用的state来完成的，下面是发送的一个action(后续会通过clientMiddleware来完成):
```js
export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/widget/load/param1/param2') 
  };
}
```
当这个ajax请求发送到反代理服务器的时候，通过http-proxy发送到API服务器:
```js
app.use("/api",(req,res)=>{
  proxy.web(req,res,{target:targetUrl});
});
```

(2)react-router,react,redux,react-redux,redux-async-connect,redux-thunk等一系列react相关的基本内容

(3)使用bootstrap-loader来加载自定义的bootstrap文件，从而减小打包后文件的大小。如果你要单独使用这部分的内容，你可以[参考这里](https://github.com/liangklfangl/bootstrap-loader-demo/tree/daily/0.0.1)

(4)webpack实现HMR(react-transform-hmr)等基本功能，以及webpack-dev-middleware，webpack-hot-middleware等的使用。如果你想深入了解HMR，你也可以[参考这里](https://github.com/liangklfangl/webpack-dev-server)

(5)redux-devtools,redux-devtools-dock-monitor,redux-devtools-log-monitor等redux开发工具的使用

(6)react的match方法实现[服务端渲染](https://github.com/liangklfangl/react-router-renderProps)，使用webpack-isomorphic-tools来管理服务端模块依赖关系

(7)better-npm-run以及[webpackcc](https://github.com/liangklfangl/wcf)打包工具的使用

(8)superagent,express等与服务器相关的内容

#### 2.你能够学到的东西
内部所有的代码都有详细的注释，而且都给出了代码相关说明的链接。通过这个项目，对于react*全家桶*应该会有一个深入的了解，如果你有不懂的地方，也可以通过github上的邮箱联系我。希望我们能够共同进步