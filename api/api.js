import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
// import config from '../src/config';
import * as actions from './actions/index';
//这是我们所有的action，也就是真实的这个服务器能够处理的请求。包括登陆登出
//survey,widgets等。这样我们通过req.url来映射到具体的action来处理用户请求
import {mapUrl} from './utils/url.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
const pretty = new PrettyError();
const app = express();
// const util = require("util");
// console.log("看看exports导出的是什么:",util.inspect(actions,{showHidden:true,depth:4}));
const server = new http.Server(app);
//创建一个服务器
const io = new SocketIo(server);
//https://github.com/liangklfang/socket.io
//Socket.IO允许即时的基于事件的双向通信，包括一个nodejs服务器也就是这个库
//还有一个JS的客户端库(基于浏览器的)
io.path('/ws');
//静态资源请求时候的路径
//https://socket.io/docs/server-api/
app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());
//数据会在req.body中
app.use((req, res) => {
  //如果访问的url为:http://localhost:8888/hello/world?name=sex
  //那么req.url为/hello/world?name=sex
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  //得到["hello", "world"],也就是请求的URL的path的数组
  const {action, params} = mapUrl(actions, splittedUrlPath);
   //根据我们的请求路径来选择具体的action，而且我们每一个action返回的都是一个promise
   //所以直接调用then
  if (action) {
  //如果Action存在，那么我们获取到具体的action与param参数
    action(req, params)
      .then((result) => {
        //支持我们返回的对象是函数和plainObject的情况，如果是函数直接将
        //我们的res传入到这个函数里面，交给我们的API编写者自己处理~~~
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        //如果promise已经reject了
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          //直接pretty.render把错误信息发送给反向代理服务器
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      });
  } else {
    res.status(404).end('NOT FOUND');
  }
});

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;
//设置了API监听的端口号
if (process.env.APIPORT) {
  const runnable = app.listen(process.env.APIPORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
    console.info('==> 💻  Send requests to http://%s:%s', process.env.APIHOST || "localhost", process.env.APIPORT);
  });
  //服务器socket.io监听有客户端有连接,首先向客户端问好
  //发送历史消息
  //接收到客户端的消息时候，首先给消息一个id值并把消磁保存起来
  io.on('connection', (socket) => {
    //发送一个news消息到客户端，并携带数据
    socket.emit('news', {msg: `'Hello World!' from server`});
    //如果服务器端接收到history，那么从历史中拿出消息
    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });
    //接受到客户端消息，首先将它保存起来，同时将消息原样发送到客户端去
    //即io.emit('msg', data);
    socket.on('msg', (data) => {
      console.log("服务端msg事件接收到客户端数据",data);
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  //调用socketIO的listen方法
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
