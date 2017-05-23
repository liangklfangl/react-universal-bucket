import React, {Component, PropTypes} from 'react';
import {renderToString} from 'react-dom/server';
import serialize from 'serialize-javascript';
// https://github.com/liangklfang/serialize-javascript
import Helmet from 'react-helmet';
// https://github.com/liangklfang/react-helmet
/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 * <Html assets={webpackIsomorphicTools.assets()} store={store}/>
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };
// <Html assets={webpackIsomorphicTools.assets()} store={store}/>
  render() {
    const {assets, component, store} = this.props;
    const content = component ? renderToString(component) : '';
    //如果有组件component传递过来，那么我们直接调用renderToString
    const head = Helmet.rewind();
    // To use on the server, call rewind() after React.renderToString to 
    // get all the head changes to use in your prerender.
    //在服务端使用的时候，在React.renderToString后调用rewind方法得到所有的head部分的改变，进而用于预渲染
    //https://libraries.io/github/necolas/react-helmet
    return (
      <html lang="en-us">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}
          <link rel="shortcut icon" href="/favicon.ico" />
         <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:400,500"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/violet/0.0.1/violet.min.css"/>

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin)
             styles属性只有在生产模式下才会存在，此时通过link来添加。便于缓存
           */}
          {Object.keys(assets.styles).map((style, key) =>
            <link href={assets.styles[style]} key={key} media="screen, projection"
                  rel="stylesheet" type="text/css" charSet="UTF-8"/>
          )}
         {/*
            assets.styles如果开发模式下，那么肯定是空，那么我们直接采用内联的方式来插入即可
        */}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
           {/*将组件renderToString后放在id为content的div内部*/}
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8"/>
          {/*将store.getState序列化后放在window.__data上，让客户端代码可以拿到*/}
          <script src={assets.javascript.main} charSet="UTF-8"/>
          {/*将我们的main.js，来自于客户端打包并放在特定文件夹下的资源放在页面中，
               这就成了客户端自己的js资源了
          */}
        </body>
      </html>
    );
  }
}
