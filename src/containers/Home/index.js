import React from "react";
export default class Home extends React.Component{
	render(){
     console.log("home instantiated");

		return (
             <div style={{fontSize:"20px"}}>
<h3>3.React全家桶文章总结</h3>
关于该项目中使用到的所有的react相关知识点我都进行了详细总结。但是很显然，如果你要学习react，必须对webpack和babel都进行一定的了解。因为在写这个项目之前，我只是一个react/webpack/babel的新手，因此也是在不断的学习中摸索前进的。遇到了问题就各种google,baidu。而且我对于自己有一个严格的要求，那就是要知其然而且要知其所以然，因此我会把遇到的问题都进行深入的分析。下面我把我在写这个项目过程遇到问题，并作出的总结文章贴出来，希望对您有帮助。我也希望您能够关注每一篇文章下面的参考文献，因为他们确实都是非常好的参考资料。

<h4>3.1 React+redux相关</h4>

<a href="https://github.com/liangklfangl/high-order-reducer">React高阶组件详解</a>
<br/>
<a href="https://github.com/liangklfangl/react-static-ajax">React同构你了解多少以及常用问题</a>
<br/>
<a href="https://github.com/liangklfangl/react-router-renderProps">renderProps签名与React服务端渲染</a>
<br/>
<a href="https://github.com/liangklfangl/material-ui-webpack-demo">React的material-ui学习实例</a>
<br/>
<a href="https://github.com/liangklfangl/react-context-demo">react的context困境与解决方法</a>
<br/>
<a href="https://github.com/liangklfangl/redux-form-demo">redux-form的使用实例</a>
<br/>
<a href="https://github.com/liangklfangl/redux-createstore">redux的原理浅析</a>
<br/>
<a href="https://github.com/liangklfangl/react-ref">使用react组件的ref回调函数</a>
<br/>
<a href="https://github.com/liangklfang/universal-react-demo">react-redux服务端渲染的一个完整例子</a>
<br/>
<a href="https://github.com/liangklfangl/react-animation-demo">React动画之react-transition-group使用</a>

<h4> 3.2 webpack相关</h4>

<a href="https://github.com/liangklfangl/webpack-dev-server">webpack-dev-server原理分析</a>
<br/>
<a href="https://github.com/liangklfangl/webpack-hmr">webpack热加载HMR深入学习</a>
<br/>
<a href="https://github.com/liangklfangl/wcf">集成webpack,webpack-dev-server的打包工具</a>
<br/>
<a href="https://github.com/liangklfangl/prepack-vs-webpack">prepack与webpack对比</a>
<br/>
<a href="https://github.com/liangklfangl/webpack-common-sense">webpack插件书写你需要了解的知识点</a>
<br/>
<a href="https://github.com/liangklfangl/commonchunkplugin-source-code">CommonsChunkPlugin深入分析</a>
<br/>
<a href="https://github.com/liangklfangl/commonsChunkPlugin_Config">CommonsChunkPlugin配置项深入分析</a>
<br/>
<a href="https://github.com/liangklfangl/webpackDll">webpack.DllPlugin提升打包性能</a>
<br/>
<a href="https://github.com/liangklfangl/webpack-code-splitting">webpack实现code splitting方式分析</a>
<br/>
<a href="https://github.com/liangklfangl/webpack-external-library">webpack中的externals vs libraryTarget vs library</a>
<br/>
<a href="https://github.com/liangklfangl/webpack-compiler-and-compilation">webpack的compiler与compilation对象</a>
<br/>
<a href="https://github.com/liangklfang/webpack-dev-middleware">webpack-dev-middleware原理分析</a>
<br/>
<a href="https://github.com/liangklfangl/atool-build-source">atool-build打包工具分析</a>


<h4> 3.3 Babel相关</h4>

<a href="https://github.com/liangklfangl/babel-compiler-extends">Babel编译class继承与源码打包结果分析</a>
<br/>
<a href="https://github.com/liangklfangl/astexample">使用babel操作AST来完成某种特效</a>
<br/>
<a href="https://github.com/liangklfangl/babylon">babylon你了解多少</a>

<h4> 3.4 其他内容</h4>

<a href="https://github.com/liangklfangl/bootstrap-loader-demo">bootstrap-loader自定义bootstrap样式</a>
<br/>
<a href="https://github.com/liangklfangl/shellGlobStar">前端工程师那些shell命令学习</a>
<br/>
<a href="https://github.com/liangklfangl/npm-command">npm环境变量与常见命令</a>
<br/>
<a href="https://github.com/liangklfangl/devPlusDependencies">[npm中script生命周期方法的深入探讨</a>
<br/>
<a href="https://github.com/liangklfangl/npm-dist-tag">[npm version与npm dist tag详解</a>
<br/>
<a href="https://github.com/liangklfangl/shellGlobStar/blob/master/src/others/link-hard-soft.md">[linux中软链接与硬链接的区别学习</a>
<br/>
<a href="http://blog.csdn.net/liangklfang/article/details/53694994">React路上遇到的那些问题以及解决方案</a>
<br/>
<a href="http://blog.csdn.net/liangklfang/article/details/53229237">[npm，webpack学习中遇到的各种问题</a>
             </div>
			)
	}
}