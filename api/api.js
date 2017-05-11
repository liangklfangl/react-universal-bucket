import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
// import config from '../src/config';
import * as actions from './actions/index';
//这是我们所有的action，也就是真实的这个服务器能够处理的请求。包括登陆登出
//survey,widgets等
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
  //得到["hello", "world"]
  const {action, params} = mapUrl(actions, splittedUrlPath);
  //{action: prev.action[current], params: []}; 
  //返回的对象的action表示要调用的服务器的action即函数，params表示参数
  if (action) {
    action(req, params)
      .then((result) => {
        //我们的所有的处理请求的函数都是Promise
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      }, (reason) => {
        //如果有重定向，直接服务端重定向
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
    socket.emit('news', {msg: `'Hello World!' from server`});
    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });
    //接受到消息
    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
