import React from "react";
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
//渲染页面之前得到数据,isLoaded判断如下:return globalState.info && globalState.info.loaded;
//下面是load的内容:
// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/loadInfo')
//   };
// }
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from '../../redux/modules/auth';
// export function isLoaded(globalState) {
//   return globalState.auth && globalState.auth.loaded;
// }
// 下面是loadAuth方法
// export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/loadAuth')
//   };
// }
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Header from "../../components/Header/index";
import Footer from "../../components/Footer/index";
const styles = require("./App.less");
 //(1)延缓容器的渲染直到异步的请求完成
 //(2)保存数据到store中，同时将加载的数据connect到你的容器中~
 //也就是说，在加载这个页面之前我们要获取到所有的/loadInfo等以及用户是否登录等信息
 //获取到之后才会真正渲染页面~~~
@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
  //里面无法直接访问store，否则报错，里面调用getState得到的值参见
  //getState.js
  const promises = [];
  const state = getState();
  //获取整个应用的state
  if(!isInfoLoaded(state)){
  	//如果应用的信息没有加载完成，那么我们直接添加到promise中准备加载
    //服务器端的logInfo如下:
    //export default function loadInfo() {
  //   return new Promise((resolve) => {
  //     resolve({
  //       message: 'This came from the api server',
  //       time: Date.now()
  //     });
  //   });
  // }
  	promises.push(dispatch(loadInfo()));
  }
  if(!isAuthLoaded(state)){
    //服务器端的loadAuth
    //export default function loadAuth(req) {
    //   return Promise.resolve(req.session.user || null);
    // }
  	promises.push(dispatch(loadAuth()));
  }
   return Promise.all(promises);
  }
}])

//在redux中我们自己的组件也要connect过才能获取到Provider上面的数据，Provider在server.js
//中进行了设计。而react-redux为我们的组件提供了这个方法：
//https://github.com/reactjs/react-redux
//http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
//必须开启babel-plugin-transform-decorators-legacy
//http://stackoverflow.com/questions/43023175/react-redux-connect-does-not-work-but-connect-does
//http://stackoverflow.com/questions/32646920/whats-the-at-symbol-in-the-redux-connect-decorator
//第一个connect方法为mapStateToProps，传入的参数为state与ownProps
@connect(
   state =>({
     user:state.auth.user
     //UI组件可以通过this.props.auth.user获取到
   }),
   //注意：这里的mapDispatchToProps是一个对象而不是函数，看清楚
   {
    	logout,
 //   	export function logout() {
	//   return {
	//     types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
	//     promise: (client) => client.get('/logout')
	//   };
	// }
	// this.props.logout()
	// 之所以能够登出是因为我们有middleware/clientMiddleware.js这个中间件
    	pushState:push
   	//其中push来自于react-router-redux，用于history与store同步问题
   	//必须深入学习一下这里的内容:https://segmentfault.com/a/1190000006671759
   	//好处在于:做的好处是component与redux的解耦，component根本不知道redux的存在
   	//所以我们在组件中打印this.props.logout其实是下面的函数:
    // component.props.checkout = function () {
    //     return dispatch(actionCreator.apply(undefined, arguments));
    //   }
    //   其中这里的actionCreator其实就是我们在mapStateToProps中配置的对象的函数key
    //   注意下面的函数名称就是actionCreator
    //     mapDispatchToProps = {
    //     checkout: function actionCreator(productId){
    //         return {
    //                 type: types.ADD_TO_CART,
    //                 productId
    //           }    
    //     }
    // }
    // 所以上面就相当于执行dispatch(logout.apply(undefined,arguments))
   }
 )
export default class App extends React.Component{
	static propTypes = {
		children : PropTypes.object.isRequired,
		logout : PropTypes.func.isRequired,
		user: PropTypes.object
	}

    handleLogout= ()=>{
      this.props.logout();
    }

	render(){
	//总结一下，state对象的结构由传入的多个reducer的key决定，可以根据
	//模块拆分的细粒度，考虑是否需要嵌套使用combineReducers
     // console.log("App传入的logout内容:",this.props.logout.toString());
		 // <div  onClick={this.handleLogout}>登出</div>
    return (
             <div className="container">
               <Header/>
                 {
                	this.props.children
                }
                 {/*首先你必须知道以下几个事实：
                 	(1)我们通过this.props.logout获取到的其实是如下的类型
                        const mapDispatchToProps = (dispatch, ownProps) => {
						  return {
						    increase: (...args) => dispatch(actions.increase(...args)),
						    decrease: (...args) => dispatch(actions.decrease(...args))
						  }
						}
					但是我们整个应用中并没有actionCreator,所以在dispatch的时候是没有action这个plain对象的
					原因在于：我们在mapDispatchToProps中采用了对象而不是函数的情况，所以此时相当于直接执行这个
					函数，同时将函数的返回值直接dispatch出去。可以将component和redux解耦。
					注意：我们这里发出去的action会被clientMiddleware处理转化为真正的action
                 */}
              <Footer/>
             </div>
			)
	}
}