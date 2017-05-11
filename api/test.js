function mapUrl(availableActions = {}, url = []) {
  const notFound = {action: null, params: []};
  // test for empty input
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  // prev = {action: availableActions, params: []}
  // 其中current就是我们的URL中的path部分，也就是发起了某一个请求，如果没有找到这个path
  // 直接返回undefined
  const reducer = (prev, current) => {
    if (prev.action && prev.action[current]) {
      return {action: prev.action[current], params: []}; 
      // go deeper
      // 如果hello这个action已经存在，那么直接返回，保存原样
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
  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});
  // console.log("action集合为",util.inspect(availableActions,{showHidden:true,depth:3}));
  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}

var url = ["abc", "def", 123, 456];
const actions = {
	"get":function(){},
	"post":function(){}
}
console.log(mapUrl(actions,url));

