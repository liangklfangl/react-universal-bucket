### client vs server
server端是接收的APIHOST与APIPORT

### 启动反向代理
```js
"start-dev": {
      "command": "node ./bin/server.js",
      "env": {
        "NODE_PATH": "./src",
        "NODE_ENV": "development",
        "PORT": 3000,
        "APIPORT": 3030
      }
    }
```
也就是我们的反向代理是运行在3030的，也就是说我们代理的localhost:3030的请求。此时通过http://localhost:3030/loadInfo，可以直接访问服务器的请求了，获取到该action对应的消息。
### server.js
所有的/api/*请求都会被代理到一个API服务器，这个服务器在localhost:3030。
同时server.js也会针对favicon和静态资源进行处理，最后一个任务就是代理渲染react-router，在server.js最后我们监听3000请求同时实例化API服务器

在server.js中我们产生了一个HTML页面，内容是react-router返回的。首先我们实例化
了ApiClient，服务端和客户端的代码都会通过它和API服务器交流。ApiClient中传入了
request对象，所以它可以将session cookie传递给服务端进而维持session状态。
我们将API client传递给redux的中间件，所以action creator能够访问它

然后我们开始服务端数据获取，等待数据加载完成，然后使用从redux中获取的完整数据来
渲染页面

我们的server.js也会包含那些从webpack-assets.json得到那些hash的script和css
这个webpack-assets.json不需要手动处理。

我们将redux中的state封装到了window._data变量中。然后客户端的redux可以通过window访问到它

服务端数据获取:redux-async-connect这个包暴露了一些API用于在router渲染之前去完成
一些promise请求。它暴露了<ReduxAsyncConnect/>容器，这个容器会将我们的需要渲染
的组件树包裹到服务端和客户端

客户端：
客户端的入口文件为client.js，它的作用是加载routes，实例化react-router。并处理服务端通过window.__data传递过来的redux state。并进一步渲染服务端发送的页面。这样react能够启动所有的事件监听，而不需要重新渲染DOM

Redux Middleware：
让action creator能够访问客户端的API

