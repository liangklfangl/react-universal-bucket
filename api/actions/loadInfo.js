/**
 * 登陆进来后服务器返回的消息,含有message与time字段
 * @return {[type]} [description]
 */
export default function loadInfo() {
  return new Promise((resolve) => {
    resolve({
      message: 'This came from the api server',
      time: Date.now()
    });
  });
}
