import api from './Api';
//ROOT就是上一层目录
import * as actionTypes from './actionTypes';
import { Map } from 'immutable'
//接收一个pageInfo作为参数
import { composables } from 'violet-paginator';
const pageActions = composables({ listId: 'recipeGrid' });
//composables常用于更新某个Item
export default function fetchRecipes(pageInfo) {
  return dispatch =>
    api.recipes.index(pageInfo.query).then(resp => {
         try{
    	      dispatch({ type: actionTypes.CONNECTED });
    	  }catch(e){
          console.log("fetchRecipes===",e);
    	  	//报错信息state.set is not a function
    	  }
       console.log("fetchRecipes,resp",resp);
      return resp
    })
}

/**
 * 这里会作为props传入到我们的UI组件用于调用,这个返回的函数会在clientMiddleware中传入getState
 * 和dispatch从而被执行
 * @param  {[type]} recipe [description]
 * @return {[type]}        [description]
 */
export function toggleActive(recipeGrid) {
  const data = Map({ active: !recipeGrid.active });
  // recipeGrid = (recipeGrid)
  const update = new Promise((resolve) => {
    setTimeout(resolve, 1500)
  })
   return (dispatch) =>{
    // debugger;
    return dispatch(pageActions.updateAsync(recipeGrid.id, data, update))
  } 
}
