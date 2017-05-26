import React from "react";
import { reduxForm , Field} from "redux-form";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {editStop,save as saveWidget} from "../../redux/modules/widgets";
import {validate , warn} from "./validate";
const renderField = ({ input, type, meta: { touched, error } }) => (
  <div>
    <div>
      <input {...input} type={type}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
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
      所以这里没有采用redux-form@6.x来完成。而redux-form@3.0.12会产生多个redux-form，每一个实例
      针对一个initialValue
 */
@reduxForm({
   form: 'widget',
   validate,
   warn
   // enableReinitialize: true
   // 那么后面的state会完全覆盖前面的
})
export default class WidgetForm extends React.Component{

  /**
   * 保存到服务器端
   * @return {[type]} [description]
   */
  save = ()=>{
      
  }

  render(){
    const {submitting, handleSubmit, pristine, invalid, saveWidget, editStop} = this.props;
    /*(1)submitting表示表单是否在提交，只有当你传入了一个onSubmit函数同时该函数返回一个promise的时候有用
    在这个promise处于reject/resolve之前，submitting一直为true
    (2)handleSubmit是一个函数，默认会传入到props中。用于下面两种情况
      <form onSubmit={handleSubmit}> 或者<button onClick={handleSubmit}>
      该函数会执行验证工作，包括异步的和同步的，如果这个表单是有效的，那么它会调用下面方法
      this.props.onSubmit(data)，其中data就是form表单中的数据。
      有时候，你也可以给handleSubmit传入你的onSubmit函数，此时你的onSubmit函数会取代onSubmit
      例如下面的例子:
      <form onSubmit={handleSubmit(this.save.bind(this))}>    
      如果你的onSubmit函数返回一个promise,那么submitting就会被设置为true。如果该promise
      被reject,那么会得到一个对象如new SubmissionError({ field1: 'error', field2: 'error' })
      此时每一个Field的错误信息都会被显示到相应的Field中(保存到error这个prop中),就像异步验证一样。
      如果有一个错误信息没有指定给任何一个Field，但是对整个Form适用，此时会保存到_error对象上
      同时作为error这个prop传递。
      Detail:http://redux-form.com/6.7.0/docs/api/Props.md/
    (3)实例化组件的时候没有传入onSubmit，那么要作为handleSubmit的参数传入
    (4)此处调用我们的saveWidget后得到的是一个promise,我们将该函数的返回值dispatch出去
       而在clietMiddleware中调用promise方法，返回了actionPromise是一个promise对象
    (5)我们调用handleSubmit中传入的函数其实是onSubmit,redux-form会将当前的值values全部
       传入到这个函数中
    */
  	return (
           <tr>
                 <td>
                  <Field name="id" component={renderField} type="text"/>
                 </td>
                 <td>
                  <Field name="color" component={renderField} type="text"/>
                 </td>
                 <td>
                  <Field name="sprocketCount" component={renderField} type="text"/>
                 </td>
                 <td>
                  <Field name="owner" component={renderField} type="text"/>
                 </td>
                  <td>
                    <button className="btn btn-default"
                            disabled={submitting} >
                      <i className="fa fa-ban"/> 取消
                    </button>
                    <button onClick={handleSubmit((values)=>{saveWidget(values).then(result=>{
                      if(result && typeof result.error ==="object"){
                        //这里是调用了superagent的方法返回的结果，上面handleSubmit中传入的
                        //onSubmit函数的第一个形参就是我们的redux-form当前的值
                        return Promise.reject(result.error);
                      }
                    })})} className="btn btn-success" disabled={pristine || invalid || submitting}>
                      <i className={'fa ' + (submitting ? 'fa-cog fa-spin' : 'fa-cloud')}/> 保存
                    </button>
                </td>
            </tr>
  		)
  }
}
