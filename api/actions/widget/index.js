export update from './update';
// 从request.body中获取到wiget来更新request.session中的wiget
export load from './load';
// 这是在页面中widget这个tab显示的信息。如果request.session中有widget
//那么显示request.session中的widget，否则显示我们的initialWidgets