import React from "react";
import CounterButton from "../../components/CounterButton";
/**
 * 在mapDispatchToProps和mapStateToProps第二个参数是ownProps,如果这个值发生变化
 * 也会导致组件重新渲染
 */
export default class Counter extends React.Component{
  render(){
  	 return (
         <div className="counter-list">
	          <CounterButton as="counter1"/>
	           {/*这里的每一个CounterButton都有一个ownProps*/}
		      <CounterButton as="counter2"/>
		      <CounterButton as="counter3"/>
		      <a href="https://github.com/liangklfangl/high-order-reducer" style={{marginTop:"30px",marginLeft:"180px"}}>这个页面可以学习高阶组件,如multireducer</a>
         </div>
  	 )
  }
}