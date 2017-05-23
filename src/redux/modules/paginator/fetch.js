import api from './Api'
//ROOT就是上一层目录
import * as actionTypes from './actionTypes'
//接收一个pageInfo作为参数
export default function fetchRecipes(pageInfo) {
	console.log()
  return dispatch =>
    api.recipes.index(pageInfo.query).then(resp => {
    	 console.log("开始调用fetch");
         try{
    	      dispatch({ type: actionTypes.CONNECTED });

    	  }catch(e){
    	  	//报错信息state.set is not a function
    	  	console.log("fetch报错",e);
    	  }
         console.log("UI组件实例化后结果为",resp);
      return resp
    })
}