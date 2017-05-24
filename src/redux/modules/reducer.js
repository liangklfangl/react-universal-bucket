import { combineReducers } from 'redux';
//combineReducers来自于redux
import multireducer from 'multireducer';
// https://github.com/liangklfang/multireducer/blob/master/docs/Usage.md
// 这个库允许你使用多个同名的reducer
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
// https://github.com/liangklfang/redux-async-connect
import { createPaginator } from 'violet-paginator'
// https://github.com/liangklfang/violet-paginator
import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';
import connect from './paginator/connected';
//判断是否链接上了服务端，进而判断是否显示遮罩层
import fetch from './paginator/fetch';
//https://www.npmjs.com/package/react-router-redux
//https://zhuanlan.zhihu.com/p/21648398?refer=turborender
//(1)你必须知道，当你dispatch一个action的时候，其实会遍历这个combineReducers中所有的key
//比如这里有routing,reduxAsyncConnect,auth,form,multireducer,info,pagination,widgets这些
//key，那么dispatch一个action为{type:'redux-example/auth/LOAD_SUCCESS'}那么会遍历所有的key
//对应的reducer进行处理,其中源码中for循环从0开始就可以看出来:https://github.com/liangklfangl/redux-createstore
//(2)你要知道上面说的for循环，其实每次传入的都是 var previousStateForKey = state[key]
//   也就是说传入下面的connect方法的state对象其实就是一个object即{connectd:false}或者{connected:true}
//   注意，此时不是immutable对象，而要在createStore中的if(data)中做判断
export default combineReducers({
  routing: routerReducer,
  //(1)react-router-redux的routerReducer必须在combineReducers里面，同时key必须是routing
  //保证history,location,store同步更新，支持时间旅行
  reduxAsyncConnect,
  //(2)redux-async-connect用于先获取数据然后保存到store中
  auth,
  //(3)对于我们的combineReducer中每一个key对应的函数都只会传入我们的相应的key对应的state部分
  //其中看到我们的for循环就知道原因了
  form,
  //multireducer里面的key不同，但是value都是同一个counter
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  connect ,
  // //是否显示遮罩层的state判断
  recipeGrid: createPaginator({
    listId: 'recipeGrid',
    fetch
  }),
  //fetch表示获取服务器数据的方法，listId用于UI组件
 //https://sslotsky.gitbooks.io/violet-paginator/content/v/v1.9.1/
 //1.9.1版本以后无法这样直接使用
  widgets
});
