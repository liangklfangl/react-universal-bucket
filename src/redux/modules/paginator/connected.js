import { Map } from 'immutable'
import { resolveEach } from 'redux-resolver'
import * as actionTypes from './actionTypes'
const initialState = Map({
  connected: false
})
/**
 * (1)此处使用了immutable.js，所以我们在create.js中要使用下面的方法来完成
 *  if (data) {
 *     data.recipeGrid = Immutable.fromJS(data.recipeGrid);
 *     data.connect = Immutable.fromJS(data.connect);
 * }
 *第一个recipeGrid表示分页，分页使用immutable.js是比较好的，防止多余的渲染
 *第二个connect表示是否链接,我们也使用了immutable.js来维护
 *注意：如果这里我们不设置上面两句代码，那么客户端获取到的state就不是immutable.js的
 *所以你发送请求到服务端，然后修改store中的状态，都是不能使用set来完成的，所以这里的
 *immutable.js是为了客户端渲染而设置的，而非用于服务端
 */
function connected(state) {
  return state.set('connected', true);
}
//其中CONNECTED就是我们的export const CONNECTED = 'CONNECTED'
//就是使用resolveEach来将[CONNNECTED]设置为true
//返回一个reducer函数，其接收state和action两个参数，然后根据派发的action的action.type
//决定执行handlers中的哪一个函数
export default resolveEach(initialState, {
  [actionTypes.CONNECTED]: connected
})
// export function resolveEach(initialState, handlers) {
//   return function resolve(state = initialState, action = {}) {
//     return handlers[action.type] ? handlers[action.type](state, action) : state
//   }
// }
