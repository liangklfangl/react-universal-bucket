import superagent from 'superagent';
//渐进式的客户端HTTP请求库
//https://github.com/liangklfang/superagent
// import config from '../config';
const methods = ['get', 'post', 'put', 'patch', 'del'];
//支持那些请求方法
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  //在path前面添加'/'
  if (__SERVER__) {
    // 在path前面添加HOST与PORT
    return 'http://' + process.env.APIHOST + ':' + process.env.APIPORT + adjustedPath;
  }
  // 如果不是__SERVER__，那么添加/api即可
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
     //返回的对象有上面的五个方法，接收第一个参数为path，第二个参数有params,data属性
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
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
