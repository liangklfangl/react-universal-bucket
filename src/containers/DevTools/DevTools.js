import React from 'react';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
//将redux devTools设置为树形结构，显示state信息，actions信息同时允许你改变history
//https://github.com/liangklfang/redux-devtools-log-monitor
import DockMonitor from 'redux-devtools-dock-monitor';
//将其他的Redux DevTools monitor包裹到DockMonitor将会使得其他的monitor
//能够被拖动到屏幕任何位置
//https://github.com/liangklfang/redux-devtools
export default createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-H"
               changePositionKey="ctrl-Q">
    <LogMonitor />
  </DockMonitor>
);
