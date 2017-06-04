import React from "react";
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import InfoBar from "../../components/InfoBar/index.js";
import * as authActions from "../../redux/modules/auth";
const styles= require("./index.less");
//我们的组件必须connect过，才能从store中获取到我们关注的信息，我们整个应用的数据都是通过store
//来存储的，而且只有一个store，这是我们必须要认清楚的。所以那些user等信息都是存储在store里面的
//可以通过devTool来查看
@connect((state)=>({
	user:state.auth.user
}),authActions)
//这个user是我们从store中保存的state里面获取的，然后这个mapStateToProps会将state保存到被connect
//过的Login组件中
export default class Login extends React.Component{

 static PropTypes = {
 	user : PropTypes.object,
 	login: PropTypes.func,
 	logout: PropTypes.func
 }
  // handleSub=(event)=>{
  //   console.log("handleSub被阻止");
  //   event.preventDefault()
  // }
  
  handleSubmit= (event) => {
  	//阻止表单提交，自己发送ajax请求来完成
    event.preventDefault();
    const input = this.refs.username;
    // //得到用户名，准备发送ajax请求
    // console.log("Login组件得到login方法",this.props.login);
    this.props.login(input.value);
    //获取到mapDispatchToProps构建好的一个请求，调用login相当于直接dispatch它
    //dispatch是下面的这个对象。这是因为我们在connect中的mapDispatchToProps是一个对象
    //   {
	  //   types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
	  //   promise: (client) => client.post('/login', {
	  //     data: {
	  //       name: name//这里的name就是我们这里的username
	  //     }
	  //   })
	  // };
    // input.value="";
    //清空，登录后我们不会像以前写后端一样直接跳转到另外一个页面，而这里是因为我们的
    //这个组件的props发生改变了，所以组件重新渲染了。而完成这个过程的方式是通过在最顶层的
    //组件App中定义了componentWillReceiveProps属性

  }

  render(){
  	const {user,logout,login} = this.props;
  	//其中authActions中导出的方法全部会被封装到this.props中，看过tuicool的博客都知道
  	 return (
            <div className="login-form-container">
              <Helmet title="登录"/>
               {/*管理html文档的head部分内容，可以设置document.title*/}
              <h2>请输入以下信息登录</h2>
              {
                 !user && <div className="form-content">
                  <form onSubmit={this.handleSubmit}>
                   <input ref="username" placeholder="请输入用户名"/>
                   <button className="submit" onClick={this.handleSubmit} value="登陆">登录</button>
                 </form>
                   <div>你使用了这个用户名将会通过服务器放在session里面</div>
                 </div>
              }
              <InfoBar/>
              <h3>这个页面你可以学习:</h3>
              <div>react-helmet</div>
              <div>react-redux</div>
              <div>express-session</div>
              <div>express</div>
              <div>body-parser</div>
              <div>socket.io</div>
              <div>.......</div>
              {/*如果用户已经登录，来到登录模块，我们直接显示用户名*/}
              {
              	user && <div>
                  <div>你目前登录的账号为{user.name}</div>
                  <button className="logout"  onClick={logout}>登出</button>
              	</div>
              }
            </div>
  	 	 )
  }
}

