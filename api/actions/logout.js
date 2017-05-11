/**
 * 销毁request中的session对象
 * @param  {[type]} req [description]
 * @return {[type]}     [description]
 */
export default function logout(req) {
  return new Promise((resolve) => {
    req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
  });
}
