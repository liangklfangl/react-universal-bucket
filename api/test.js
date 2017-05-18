function mapUrl(availableActions = {}, url = []) {
  const notFound = {action: null, params: []};
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }
  //保证非空
  const reducer = (prev, current) => {
     //这里是深度迭代进去得到一个元素的属性
    if (prev.action && prev.action[current]) {
      return {action: prev.action[current], params: []}; 
    } else {
      //如果应用导出的对象是一个函数，如export default function(){}
      //但是提供的URL为["ni",'hao']，此时直接调用这个函数，其他的作为参数
      if (typeof prev.action === 'function') {
        //这里的if肯定不会执行到，因为如果availableActions提供一个函数而不是一个对象
        //那么Object.keys(availableActions).length === 0成立，如果是一个对象这里肯定不会执行
        //所以这里的无效代码
        return {action: prev.action, params: prev.params.concat(current)}; 
      } else {
        return notFound;
      }
    }
  };
  //对我们的url的path进行迭代，reduce的第二个参数是prev，后续都是通过current对pre进行操作
  const actionAndParams = url.reduce(reducer, {action: availableActions, params: []});
  return (typeof actionAndParams.action === 'function') ? actionAndParams : notFound;
}

var url = ["hello", "world"];
var urlNested = ["widget","load"];
//这是提供的所有的action
const actions = {
	"hello":function(){},
	"world":function(){},
  "liangklfangl" : function(){},
  "widget":{
    "load":function(){

    },
    "hello":function(){}
  }
}
const actionsFunc = function(param1,param2){

}
//(1) console.log(mapUrl(actions,url));
//得到下面的结果，也就是我们找到了action为"hello"处理我们的这个请求，同时没有hello/world来处理请求
//所以，我们得到了下面的hello这个action来处理请求，后续的path部分全部作为参数
//{ action: [Function: hello], params: [ 'world' ] }
//(2) console.log(mapUrl(actions,urlNested));
//得到下面的内容:
//{ action: [Function: load], params: [] }
//这种情况的出现你可以参考我们的下面的导出方式:
//export * as widget from './widget/index';
// export * as survey from './survey/index';
// 而widget，survey导出的本来就是一个对象
//这也是为什么我们在load我们的widget的时候可以采用下面的方式来完成，因为我们可以处理wiget/load，所以param1,param2作为参数了
//export function load() {
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     promise: (client) => client.get('/widget/load/param1/param2') 
//     // params not used, just shown as demonstration
//   };
// }
console.log(mapUrl({actionsFunc},['ni','hao']))

