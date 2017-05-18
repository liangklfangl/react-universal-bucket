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
  // 直接返回undefined。
  // 第一个参数是服务器接收的所有的action请求
  // 第二个参数是我们请求的url的path数组
  function mapUrl(availableActions = {}, url = []) {
   const notFound = {action: null, params: []};
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      return {action: prev.action[current], params: []}; 
      //如果返回的这个对象
    } else {
      if (typeof prev.action === 'function') {
        return {action: prev.action, params: prev.params.concat(current)}; 
        // params are found
      } else {
        return notFound;
      }
    }
  };
  //遍历数组["hello", "world"]
  //注意这里是reduce而不是reduceRight，所以我们关注于current，而不是prev。默认参数是prev
  //每次迭代出来的元素都是current
  //详细的分析参考api/test.js
  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});
  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}

module.exports = {
  mapUrl
}