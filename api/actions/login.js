/**
 * 已经通过body-parser的处理了，所有的信息全部在request.body中
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
export default function login(req) {
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  return Promise.resolve(user);
}
