import { combineReducers } from 'redux';
//combineReducers来自于redux
import multireducer from 'multireducer';
// https://github.com/liangklfang/multireducer/blob/master/docs/Usage.md
// 这个库允许你使用多个同名的reducer
import { routerReducer } from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
// https://github.com/liangklfang/redux-async-connect
import { pagination } from 'violet-paginator';
// https://github.com/liangklfang/violet-paginator

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import info from './info';
import widgets from './widgets';

//https://www.npmjs.com/package/react-router-redux
//https://zhuanlan.zhihu.com/p/21648398?refer=turborender
export default combineReducers({
  routing: routerReducer,
  //react-router-redux的routerReducer必须在combineReducers里面，同时key必须是routing
  reduxAsyncConnect,
  auth,
  //通过redux-form的中间件来处理
  form,
  //multireducer里面的key不同，但是value都是同一个counter
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  info,
  pagination,
  widgets
});
