// export loadInfo from './loadInfo';
// export loadAuth from './loadAuth';
// export login from './login';
// export logout from './logout';
// export * as widget from './widget/index';
// export * as survey from './survey/index';
//上面是我这个服务器导出的所有的action，url为访问的地址的path部分["hello", "world"]
//其实这里的availableActions={logout:logout,widget:widget}
  // prev = {action: availableActions, params: []}
  // 其中current就是我们的URL中的path部分，也就是发起了某一个请求，如果没有找到这个path
  // 直接返回undefinedexport function mapUrl(availableActions = {}, url = []) {
  // const notFound = {action: null, params: []};
  // test for empty input
  function mapUrl(availableActions = {}, url = []) {
   const notFound = {action: null, params: []};
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      return {action: prev.action[current], params: []}; 
      // go deeper
      // 如果hello这个action已经存在，那么直接返回，保存原样
      // 如URL为http://localhost:3030/logout那么可以直接获取到这个action的值
    } else {
      if (typeof prev.action === 'function') {
        //如果当前这个url有对应的action是一个函数，而不是一个对象，那么直接action即调用这个函数
        //这当export default function的时候有用
        return {action: prev.action, params: prev.params.concat(current)}; 
        // params are found
      } else {
        return notFound;
      }
    }
  };
  //遍历数组["hello", "world"]
  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});
  // console.log("action集合为",util.inspect(availableActions,{showHidden:true,depth:3}));
  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}

module.exports = {
  mapUrl
}