import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import { routerMiddleware } from 'react-router-redux';
//这个中间件将会作用于我们的redux的store，它会接收action creators发出的actions
//同时将这些actions重定向到我们指定的history实例，解决时间旅行等问题
import thunk from 'redux-thunk';
import Immutable from 'immutable';
/*其中client对象是下面这个函数的返回值，即一个对象，每一个函数接收一个path
,其中path表示superagent应该发送到的URL。同时接收一个对象包含{params,data}两个属性，返回的是一个promise
 const methods = ['get', 'post', 'put', 'patch', 'del'];
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
        //request.end才会真正发送请求出去
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  createStore(memoryHistory, client)
  */
 //一定要注意：createStore肯定要指定两个东西=store+reducer，前者是数据库
 //后者是算法，当然你在createStore的时候也可以指定[...middlewares]
export default function createStore(history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);
  //会将我们的redux的memoryHistory传入react-router-redux的routerMiddleware中
  //也就是说我们的react-router-redux主要是对history进行了增强
  //Detail:https://github.com/liangklfang/react-router-redux
  //history + store (redux) → react-router-redux → enhanced history → react-router
  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];
  //得到所有的中间件,createMiddleware(client)作用应该很明显，和其他middleware一样
  //要完成对dispatch的增强~~~
  let finalCreateStore;
  //如果是开发环境，同时是客户端，同时__DEVTOOLS__设置为true
  //那么我们加入redux的开发工具
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
     //提供一个redux及时编辑的事件旅行环境
    const DevTools = require('../containers/DevTools/DevTools');
    //得到我们的redux的开发工具
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      //如果有window.devToolsExtension，那么使用用户自己的，否则使用我们配置的
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
      //当前dock的大小以及位置可以通过Redux DevTools的persistState()来完成
    )(_createStore);
    //applyMiddleware的第一级已经被打开，得到(reducer, preloadedState, enhancer) => {}
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
    //applyMiddleware的第一级已经被打开，得到(reducer, preloadedState, enhancer) => {}
  }
  const reducer = require('./modules/reducer');
  //如果createStore传入了第三个参数那么保存他的pagination
  if (data) {
    data.pagination = Immutable.fromJS(data.pagination);
  }
  const store = finalCreateStore(reducer, data);
  //其中data传入的表示我们整个应用的state状态
  //继续调用(reducer, preloadedState, enhancer) => {}得到如下结构：
  // return {
    //   ...store,
    //   dispatch
    // }
    // 此时返回的对象有一个dispatch用于直接发送消息到store，传入action即可
    // 同时我们的store上具有的原有方法都被保存下来，同时也外加了一个dispatch
  //如果是开发环境，同时模块本身支持HMR，那么我们热加载
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }
  return store;
}
