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
  //那么我们加入redux的开发工具,服务端渲染的时候我们的__CLIENT__是false,我们不会添加
  //这部分代码
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const { persistState } = require('redux-devtools');
     //提供一个redux及时编辑的事件旅行环境
    const DevTools = require('../containers/DevTools/DevTools');
    //得到我们的redux的开发工具
    //http://redux.js.org/docs/api/compose.html
    //使用我们的compose组合多个store enhancer来增强store
    //applyMiddleware的结构不要忘了：https://github.com/liangklfangl/redux-createstore
    //(1)一般我们直接将applyMiddleware作为createStore的参数传递来增强store
    //(2)但是我们这里使用了另外一种方式来增强store
    //其实我们调用middleware以及传入__createStore后得到的这个函数的签名和createStore是完全一样的，这也是为什么我们
    //这里命名为finalCreateStore的原因，我们此时得到的store也是通过middleware增强后的store，和
    //调用createStore传入applyMiddleware是一样的结果，一样的结果，一样的结果!!!
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
  //这里的data是服务端传递的store.getState，即应用的完整的state状态。所以你可以通过
  //combineReducer得到操作的结果
  if (data) {
    data.pagination = Immutable.fromJS(data.pagination);
  }
  const store = finalCreateStore(reducer, data);
  // createStore(reducer, [preloadedState], [enhancer])
  // 对我们增强后的store进行进一步的处理
  // 第一个参数表示数据库计算方式，第二个表示初始状态，我们从服务器端获取到的内容
  // 就是初始客户端state
  // http://redux.js.org/docs/api/createStore.html
  // 最后得到的结果就是如下内容，即store里面的所有内容以及一个dispatch方法
  // 即返回的这个对象有dispatch,subscribe,getState,replaceReducer,observable等一系列store应该由的方式
  //  return {
    //   ...store,
    //   dispatch
    // }
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./modules/reducer', () => {
      store.replaceReducer(require('./modules/reducer'));
    });
  }
  return store;
}
