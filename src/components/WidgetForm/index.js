import React from "react";
import { reduxForm } from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {editStop,save as saveWidget} from "../../redux/modules/widgets";
/**
 * (1)如果有了editing，那么我们WidgetForm其实也是一个tr而已
 */
@reduxForm({
  form:"widget"
 //(2)我们的redux-form也添加到combineReducer中了，这里的form指定我们的form名称，以及我们
 //form的状态被装载到redux-form的那个reducer中。详见output/redux-form
})

/**
 * (3)接收两个action，一个用于表示保存我们的widget,另一个用于表示结束编辑
 * @param  {[type]} (state)   [description]
 * @param  {[type]} (dispatch [description]
 * @return {[type]}           [description]
 * @connect((state)=>({
  info: state.info.data
}),(dispatch)=> {

  return bindActionCreators({load},dispatch)
})
 */
@connect((state)=>{
	return {
			saveError : state.widgets.saveError
	}

},(dispatch)=>{
	return bindActionCreators({saveWidget,editStop},dispatch);
})
 export default class WidgetForm extends React.Component{
  render(){
    console.log("WidgetForm中获取到的内容为:",this.props);
  	return (
          <tr>
              <td>1</td>
              <td>蓝色</td>
              <td>
                <input type="text" className="form-control"/>
              </td>
              <td>
                 <input type="text" className="form-control" />
              </td>
              <td></td>
          </tr>
  		)
  }
}
