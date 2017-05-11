/**
 * 获取request.session中的user，如果为空就是null。then方法的函数里面获取的就是
 * 我们的信息request.session.user
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
export default function loadAuth(req) {
  return Promise.resolve(req.session.user || null);
}
