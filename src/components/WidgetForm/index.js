import React from "react";
import { reduxForm, Field } from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {editStop,save as saveWidget} from "../../redux/modules/widgets";

const renderInput = field =>  
  <div>
    <input {...field.input} type={field.type}/> 
    {field.meta.touched &&
     field.meta.error &&
     <span className="error">{field.meta.error}</span>}
  </div>

/**
 * (1)如果有了editing，那么我们WidgetForm其实也是一个tr而已
   (2)我们的redux-form也添加到combineReducer中了，这里的form指定我们的form名称，以及我们
 form的状态被装载到redux-form的那个reducer中。详见output/redux-form
 */
/**
 * (3)接收两个action，一个用于表示保存我们的widget,另一个用于表示结束编辑
 */
@connect((state)=>{
	return {
			saveError : state.widgets.saveError
	}
},(dispatch)=>{
	return bindActionCreators({saveWidget,editStop},dispatch);
})

/**
 * (1)组件实例化方式<WidgetForm  formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> 
     其中initialValues指定了该组件渲染的时候采用的默认数据，但是这个默认数据竟然都是一样的
   (2)我觉得，我们这里应该不是同一个redux-form来管理数据的，而必须是多个实例，因为我这里就是
      针对的多个form实例，而不是一个form，不然所有的行的数据都共享同一个form，这是不可能的
 */
@reduxForm({
  form:"widget",
  fields: ['id', 'color', 'sprocketCount', 'owner']
})

export default class WidgetForm extends React.Component{
  render(){

  const { editStop, fields: {id, color, sprocketCount, owner}, formKey, handleSubmit, invalid,
      pristine, save, submitting, saveError: { [formKey]: saveError }, values } = this.props;
    console.log("WidgetForm中获取到的内容为:",this.props.initialValues);
  	return (
          <tr>
              <td>
               {id.value}
              </td>
          </tr>
  		)
  }
}
