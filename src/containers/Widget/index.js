import PropTypes from "prop-types";
import React from "react";
import {load,save} from "../../redux/modules/widgets";
//该组件要访问服务器端widget来获取数据显示
import {connect} from "react-redux";
//这里第一个mapStateToProps返回的是一个对象，所以要用()括起来
@connect((state)=>({
  widgets : state.widgets
}),{
   load,
   save
})
export default class Widget extends React.Component{
  render(){
   const {widgets} = this.props;
   //获取到store中当前的wigets信息
   const {load,save} = this.props;
   //同时为用户提供两个action，这两个action可以发送请求到服务端
    return (
         <div>
           <button onClick={load}>加载widget</button>
         </div>
      )
  }
}