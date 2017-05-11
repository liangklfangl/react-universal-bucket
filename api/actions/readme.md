### 1.request.body
这里所有的请求都是通过request.body来获取到信息然后更新的，这来自于body-parser
```js
 const user = {
    name: req.body.name
  };
```
### 2.request.session
request.session中保存了user信息。
```js
const user = {
    name: req.body.name
  };
  req.session.user = user;
//(1)或者下面的信息
req.session.destroy(() => {
      req.session = null;
      return resolve(null);
    });
//(2)保存widget
req.session.widgets = widgets;
//(3)更新widget
load(req).then(data => {
          const widgets = data;
          const widget = req.body;
          //如果request.body中的color是Green，那么模仿服务器端错误
          if (widget.color === 'Green') {
            reject({
              color: 'We do not accept green widgets' 
              // example server-side validation error
            });
          }
          if (widget.id) {
            widgets[widget.id - 1] = widget;  
            //从request.body中获取到wiget来更新request.session中的wiget
            // id is 1-based. please don't code like this in production! :-)
            req.session.widgets = widgets;
          }
          resolve(widget);
    })
```
### 3.export login from "./login"
我们看看这种导出最后通过import * as action from "./index";得到的结果:
```js
{ [__esModule]: true,
  //__esModule为true
   loadInfo:
    { [Function: loadInfo]
      [length]: 0,
      [name]: 'loadInfo',
      [prototype]: loadInfo { [constructor]: [Circular] } },
   loadAuth:
    { [Function: loadAuth]
      [length]: 1,
      [name]: 'loadAuth',
      [prototype]: loadAuth { [constructor]: [Circular] } },
   login:
    { [Function: login]
      [length]: 1,
      [name]: 'login',
      [prototype]: login { [constructor]: [Circular] } },
   logout:
    { [Function: logout]
      [length]: 1,
      [name]: 'logout',
      [prototype]: logout { [constructor]: [Circular] } },
   widget:
    { [__esModule]: true,
      update:
       { [Function: update]
         [length]: 1,
         [name]: 'update',
         [prototype]: update { [constructor]: [Circular] } },
      load:
       { [Function: load]
         [length]: 1,
         [name]: 'load',
         [prototype]: load { [constructor]: [Circular] } } },
   survey:
    { [__esModule]: true,
      isValid:
       { [Function: survey]
         [length]: 1,
         [name]: 'survey',
         [prototype]: survey { [constructor]: [Circular] } } } }

```
