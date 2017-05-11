export loadInfo from './loadInfo';
//你登陆进来后服务器返回的消息
//resolve({
    //   message: 'This came from the api server',
    //   time: Date.now()
    // });
export loadAuth from './loadAuth';
//授权request.session.user
export login from './login';
//登陆的信息
//const user = {
  //   name: req.body.name
  // };
  // req.session.user = user;
  // 向session里面传递信息
export logout from './logout';
//  req.session.destroy
export * as widget from './widget/index';
export * as survey from './survey/index';
