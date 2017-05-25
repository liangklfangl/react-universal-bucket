import PropTypes from "prop-types";
import React from "react";
import {load as loadWidgets,save, editStart} from "../../redux/modules/widgets";
//该组件要访问服务器端widget来获取数据显示
import { asyncConnect } from 'redux-async-connect';
import { isLoaded } from "../../redux/modules/widgets";
import Helmet from 'react-helmet';
import {connect} from "react-redux";
import WidgetForm from "../../components/WidgetForm";
const styles = require("./index.less");
//(3)当你进入该页面的时候，我们会保证所有的数据都加载完成才渲染这个页面。但是我们有时候为了
//页面跳转在前，而加载数据在跳转行为之后发生，我们可以提供一个defer参数。App.js组件中是先加载数据
//再跳转。detail:http://blog.csdn.net/xsl_bj/article/details/51353134
//如果promise提供的是一个函数，那么这个函数会被异步执行
@asyncConnect([{
  deferred: true,
  promise:({store:{dispatch,getState}}) =>{
   //判断我们的state中是否有widget,同时loaded属性是否是true，如果为true表示加载过一次数据
   //否则我们手动加载数据。但是是在页面发生跳转之后才加载数据
    if(!isLoaded(getState())){
      return dispatch(loadWidgets());
      //注意这里必须要返回return，因为这是对dispatch进行增强的逻辑，所以必须有return才可以
    }
  }
}])
/**
 * (4)上面asyncConnect已经保证数据都加载完成了，所以在render我们组件的时候可以直接
 * 使用。同时asyncConnect会自动将异步加载的数据传入到我们的UI组件中进行显示
 * (5)使用revert可以查看到刷新页面之前我们的state状态。而且此时控制台也是变化的。
 *    刷新页面是LOCATION_CHANGE,当你按了revert,你会发现是如下的顺序调用的.
 *    LOAD=>BEGIN_GLOBAL_LOAD,END_GLOBAL_LOAD,LOAD_SUCCESS(BEGIN_GLOBAL_LOAD和END_GLOBAL_LOAD来自于redux-async-connect)。
 *    其中INIT表示state初始状态
 *    LOAD=>BEGIN_GLOBAL_LOAD,END_GLOBAL_LOAD,LOAD_SUCCESS表示刷新之前经历的步骤
 *    LOCATION_CHANGE仅仅表示刷新页面后的state状态
 * (6)asyncConnect和connect一起使用的目的在于前者发送请求出去导致store的状态发生变化
 *    然后connect将改变后的状态的传递给UI组件
 */
//(1)这里第一个mapStateToProps返回的是一个对象，所以要用()括起来
//(2)这里的mapDispatchToProps返回的是一个对象，所以对象中每一个函数的返回值会单独dispatch一个action出去

@connect(
  state => {
    console.log("connect中的state为:",state);
    //上面@asyncConnect发送请求出去没有将state传递到这里来
    return {
       widgets: state.widgets.data,
       editing: state.widgets.editing,
       error: state.widgets.error,
       loading: state.widgets.loading
    }
  },
  {save, load :loadWidgets,editStart })
/**
 * 首先从服务器获取数据，然后connect,最后显示所有的Widget
 */
export default class Widget extends React.Component{

 /**
  *(1) 每一个tr显示的是一个Widget，这里就是对该Widget进行编辑，当你编辑的时候很显然
  * 是dispatch一个action到服务器端，然后修改了state状态。此时我们的editStart其实
  * 就是向state中添加了一个id而已
  *    case EDIT_START:
        return {
        ...state,
        editing: {
          ...state.editing,
          [action.id]: true
        }
      };
  *(2)我们点击edit之后，我们整个应用的state都变化了，所以组件会重新渲染。然后render方法会
  *再次执行，所以reduxForm会真实出现，从而可以对单个记录进行修改。所以我们点击了编辑按钮
  *仅仅是导致了store中的state变化而已，如果你要发送数据要通过redux-form。
  *onclick =>handleEdit导致state变化=>重新render(有了editing属性)=>redux-form发送数据到服务端
  */
  handleEdit = (widget)=>{
   const { editStart } = this.props;
    return ()=>{
       editStart(widget.id);
    } 
  }

  render(){
   const {widgets, error, editing, loading} = this.props;
   //获取到store中当前的wigets信息
   const { load, save } = this.props;
   //同时为用户提供两个action，这两个action可以发送请求到服务端
    return (
         <div>
           <Helmet title="Widgets"/>
            {
              error && <div className="error-message">
                {error}
              </div>
            }
            {
             widgets && widgets.length && <table className="table table-striped">
              <thead>
              <tr>
                <th>ID</th>
                <th>颜色</th>
                <th>Sprockets</th>
                <th>所有者</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
                {/*箭头函数如果返回一个对象必须要小括号包裹，否则不需要*/}
                {
                   widgets.map((widget)=>
                    editing[widget.id] ? <WidgetForm formKey={String(widget.id)} key={String(widget.id)} initialValues={widget}/> :
                       <tr key={widget.id}>
                         <td>{widget.id}</td>
                         <td>{widget.color}</td>
                         <td>{widget.sprocketCount}</td>
                         <td>{widget.owner}</td>
                         <td>
                          <button className="btn btn-primary" onClick={this.handleEdit(widget)}>
                            <i className="fa fa-pencil"/> 编辑
                          </button>
                         </td>
                      </tr>
                  )
                }
              </tbody>
             </table>
            }
           <button onClick={load}>加载widget</button>
         </div>
      )
  }
}

Widget.PropTypes = { 
  widgets:PropTypes.array,
  load:PropTypes.func,
  save:PropTypes.func,
  error :PropTypes.object
}

