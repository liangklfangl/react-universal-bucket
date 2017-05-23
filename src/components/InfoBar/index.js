import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {load} from "../../redux/modules/info";
import {bindActionCreators} from "redux";
const format = require('date-fns/format')
const styles = require("./index.less");
//(1)从服务器拿到时间显示在这个组件,其中实例化这个组件的时候会将store中保存的应用的
//store状态全部传递过来，然后你从这个store里面获取到你需要的数据。首次加载App的时候
//此时数据都是全局state中保存的数据，是@@INIT的数据，即store的原始数据
//(2)当你调用load方法的时候,其实是发送一个action去操作我们的store，当store发生变化的时候
//会从App开始都渲染一遍，这一点一定要注意。因为整个应用只有一个store，store变化那么所有组件
//都要更新，可以使用immutable
//(3)下面这种@connect第二个参数是一个Object，这个Object有一个load方法，调用它就会直接发送
//将返回结果dispatch出去，这是我们理解的关键，但是我们采用第二个参数是函数的方法来完成同样的功能
//这是因为，如果第二个参数是函数，那么我们的clientMiddleware考虑到了，同时redux-thunk也能实现
//第二种方式我们可以使用bindActionCreators
// @connect((state)=>({
// 	info: state.info.data
// }),{
//   load
// })

@connect((state)=>({
  info: state.info.data
}),(dispatch)=> {
 //bindActionCreators第一个参数对象中的key在被connect过的组件中都是通过this.props来获取到的
 //然后直接调用
  return bindActionCreators({load},dispatch)
})
/**
 * 该组件由Login组件调用，而Login组件的上一级组件是App
 */
export default class InfoBar extends React.Component{

  static PropTypes={
  	info :PropTypes.object,
  	load : PropTypes.func
  }
  render(){
   const {info,load} = this.props;
   //得到info这个state属性,这个属性就是我们服务器传递过来的信息，而load这个方法表示
   //从服务器直接加载数据
  	return (
          <div className="inforBar-container">
            {
            	info&&<div>
                  {info.message}{format(info.time,"YYYY-MM-D HH:mm:s")}
            	</div>
            }
            <button className="loader-info-from-server" onClick={load}>重新获取服务器时间数据</button>
          </div>
  		)
  }
}