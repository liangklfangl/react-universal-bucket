/*其中client对象是下面这个函数的返回值，即一个对象，每一个函数接收一个path
,其中path表示superagent应该发送到的URL。同时接收一个对象包含{params,data}两个属性，返回的是一个promise
 const methods = ['get', 'post', 'put', 'patch', 'del'];
 methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (params) {
          request.query(params);
        }
        //如果传入了参数，那么通过query添加进去
        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }
        if (data) {
          request.send(data);
        }
        //request.end才会真正发送请求出去
        request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
      }));
  }
  */
export default function clientMiddleware(client) {
  
 //这里是middleware的方式
 //Detail: https://github.com/liangklfangl/redux-createstore
 //对于redux的middleware来说：第一级别传入dispath和getState,第二级别传入store.dispatch,第三级别传入action即可
  return ({dispatch, getState}) => {
    return next => action => {
      //支持action是一个函数,即发出异步请求https://github.com/liangklfang/redux-thunk/blob/master/src/index.js
      //http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      // console.log("actions---->",action);
      const { promise, types, ...rest } = action;
      //得到action中的promise, types等属性,如果promise为空，那么直接调用
      //下一个中间件middleware,只有当有promise的时候才调用这个middleware
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS, FAILURE] = types;
      //得到types中的REQUEST, SUCCESS, FAILURE
      next({...rest, type: REQUEST});
      //执行请求
      const actionPromise = promise(client);
      //执行我们的client,此时是一个ApiClient实例
      actionPromise.then(
        function(result){
          console.log("clientMiddleware服务端得到数据",result);
          next({...rest, result, type: SUCCESS})
        },
        function(error){
           console.log("clientMiddleware服务端得到数据error",error);
            next({...rest, error, type: FAILURE})
        }
      ).catch((error)=> {
        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });
      //actionPromise
      return actionPromise;
    };
  };
}
