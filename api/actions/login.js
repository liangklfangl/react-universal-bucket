/**
 * 已经通过body-parser的处理了，所有的信息全部在request.body中
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
export default function login(req) {
 //获取用户名，然后我们将它放在session中
  const user = {
    name: req.body.name
  };
  req.session.user = user;
  console.log("服务器端login中的user为",user);
  return Promise.resolve(user);
}
