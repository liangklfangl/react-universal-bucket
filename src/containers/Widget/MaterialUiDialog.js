import React from "react";
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500,red900} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// 用于处理click事件的300ms延迟，这个依赖最终会被移除，目前，你需要在你的代码开始的地方使用它
injectTapEventPlugin();
/**
 * Detail:https://github.com/liangklfangl/material-ui-webpack-demo
 * Detail:http://www.material-ui.com/#/get-started/server-rendering
 */
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  },
  userAgent: "all"
  //我们的userAgent客户端和服务端必须一致，因为我们要使用autoPrefixer来处理css前缀。虽然我们的server.js中设置了global.navigator，但是此处无法设置为
  //global.navigator,因为如果是客户端的时候global为undefined。哪是否说明了一点：我们这个组件
  //的代码会同时在客户端与服务端都渲染一次
});
export default class MaterialUiDialog extends React.Component{
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  render(){
  	 const actions = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <RaisedButton
        label="Submit"
        primary={true}
        disabled={true}
        onTouchTap={this.handleClose}
      />
    ];

  	 return (
  	  <MuiThemeProvider muiTheme={muiTheme}>
           <div>
              <RaisedButton label="Modal Dialog" onTouchTap={this.handleOpen} />
              <Dialog
                title="删除"
                actions={actions}
                modal={true}
                open={this.state.open}
              >
               只有通过action来关闭弹窗
              </Dialog>
          </div>
      </MuiThemeProvider>
  	 	)
  }
}