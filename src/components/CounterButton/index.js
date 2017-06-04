import React from "react";
import { connect } from 'react-redux';
import {bindActionCreators} from "multireducer";
//此时你需要使用multireducer的bindActionCreators，而不是react-redux的。你需要弄清楚
//在state中哪一部分的数据对应于你的reducer，然后使用指定的reducerKey去访问这部分数据
//我们建议使用as作为reducerKey的属性名。同时，你也需要告诉bindActionCreators你的reducerKey
import {increment} from "../../redux/modules/counter";
//添加mapStateToProps与mapDispatchToProps从store中获取数据
//(1)第二个参数是ownProps，代表容器组件的props，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
//Detail : http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html
@connect((state,{as})=>({
  counter:state.multireducer[as]
  //该组件会有自己的as属性作为ownProp，我们根据as来从store中获取到我们需要的数据
}),(dispatch,{as})=>{
	return bindActionCreators({increment},dispatch,as)
  //这里是告诉我们的bindActionCreators的reducerKey
})

export default class Counter extends React.Component{
  render(){
   const {counter, increment} =  this.props;
   return (
      <div className="counter">
           <button onClick={()=>{increment()}}>当前点击的次数为{counter.count}:</button>
      </div>
   	)

  }
}
