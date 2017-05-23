import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import io from 'socket.io-client';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect } from 'redux-async-connect';
// import useScroll from 'scroll-behavior/lib/useStandardScroll';
import getRoutes from './routes';
// import {browserHistory} from "react-router";
const client = new ApiClient();
// const _browserHistory = useScroll(() => browserHistory)();
const dest = document.getElementById('content');
const store = createStore(browserHistory, client, window.__data);
//其中window.__data表示的是服务器端传递过来的sotre的状态，通过它来构建出客户端的store
//此时watch-client打包的时候，此处__CIENT__为true，表示客户端代码
//window.__data=${serialize(store.getState())};
// const store = createStore(_browserHistory, client, window.__data);
// const history = syncHistoryWithStore(_browserHistory, store);
const history = syncHistoryWithStore(browserHistory, store);
//这里实例化一个socket，path为"/ws"，其会发送到我们的反代理服务器，我们的反代理服务器会接收到
//最后通过反代理服务器发送到我们的API服务器上
//app.use('/ws', (req, res) => {
//   proxy.web(req, res, {target: targetUrl + '/ws'});
// });
function initSocket() {
  const socket = io('', {path: '/ws'});
   // socket.emit('news', {msg: `'Hello World!' from server`});
   // 如果服务端接收到连接的时候，服务端会发送一个news事件并携带相应的数据
  socket.on('news', (data) => {
    console.log(data);
    // socket.emit('my other event', { my: 'data from client' });
     socket.emit('msg', { my: '我是来自于客户端的数据' });
  });
  //接收到服务器端的msg事件
  socket.on('msg', (data) => {
    console.log("客户端msg接收到服务端数据",data);
  });
  return socket;
}
//客户端sockt接收了news和msg等服务器发送过来的内容
global.socket = initSocket();

const component = (
  <Router render={(props) =>
        <ReduxAsyncConnect {...props} helpers={{client}} filter={item => !item.deferred} />
      } history={history}>
    {getRoutes(store)}
  </Router>
);

//我们的
ReactDOM.render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

if (__DEVTOOLS__ && !window.devToolsExtension) {
  const DevTools = require('./containers/DevTools/DevTools');
  ReactDOM.render(
    <Provider store={store} key="provider">
      <div>
        {component}
        <DevTools />
      </div>
    </Provider>,
    dest
  );
}
