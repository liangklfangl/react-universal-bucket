export default function survey(req) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const errors = {};
      let valid = true;
      //如果request.body中没有email那么表示错误
      if (~['bobby@gmail.com', 'timmy@microsoft.com'].indexOf(req.body.email)) {
        errors.email = 'Email address already used';
        valid = false;
      }
      if (valid) {
        resolve();
      } else {
        reject(errors);
      }
    }, 1000);
  });
}
