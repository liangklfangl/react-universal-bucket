### what?
这个api.js也启动了一个Express服务器，并集成了socket.io，body-parser,express-session等。我们server.js中进行了代理，代理的最终的服务器就是我们这个服务器。这个服务器的最终功能包括：登陆,登出,survey,widgets等

### How to start this server?
```js
 "start-dev-api": {
      "command": "node ./bin/api.js",
      "env": {
        "NODE_PATH": "./api",
        "NODE_ENV": "development",
        "APIPORT": 3030
      }
    }
```
可以看到我们设置了NODE_ENV和我们的服务器的APIPORT，用于监听来自于*代理服务器*的请求。
### How?
我们这里的res.json等都是将服务器端的信息发送给反向代理服务器了!同时我们的服务器
也引入了socket.io。Socket.IO允许即时的基于事件的双向通信，包括一个nodejs服务器也就也就是这个库，还有一个JS的客户端库(基于浏览器的)。其监听方式如下:
```js
 const runnable = app.listen(process.env.APIPORT, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', process.env.APIPORT);
    console.info('==> 💻  Send requests to http://%s:%s', process.env.APIHOST || "localhost", process.env.APIPORT);
  });
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
  //调用socket.io的listen方法开始监听
  io.listen(runnable);
```
