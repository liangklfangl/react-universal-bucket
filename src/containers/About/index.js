import React from "react";
const styles = require("./index.less");
export default class About extends React.Component{

   state = {
   	  showImage : false
   }
  /**
   * 显示图片
   */
   show=()=>{
     this.setState({showImage : !this.state.showImage});
   }
  render(){
  	const myImage = require("./me.png");
    //在webpack/webpack.dev.expand.config.js中我们设置了小于10kb才会变成data64
    //否则采用URL的方式加载图片
    const {showImage} = this.state;
    //我们加载图片的逻辑，其实只是在该组件的state，而与我们的redux没有任何关系
    //同时我们这里直接require了图片了，对于服务端通过webpack-isomorphic-tools来完成。
    //此时你可以通过在webpack-assets.json中查看该image的src最后打包后的内容
		return (
             <div className="about">
                <h3>关于这个项目</h3>
                <div>
                  该项目是在<a href="https://github.com/erikras/react-redux-universal-hot-example">react-redux-universal-hot-example</a>
                  的基础上开发的,但是本项目和react-redux-universal-hot-example存在一些不同点
                  <p>1.react-redux-universal-hot-example使用的很多库的版本都已经过时了，API等发生了较大的变化。在本项目中我都使用了这些库的最新API</p>
                  <p>2.对于项目中每一段代码都有详细的注释，注释的数量已超过代码的数量。力求初学者易于接受</p>
                  <p>3.对于文中重要的知识点都有详细的文章进行说明。提示您注意文末的参考文献</p>
                  <p>4.集成了webpackcc，对配置的loader,plugin都进行了去重，防止重复loader处理相同文件产生的问题</p>
                  <p>5.使用webpack 2而不是使用webpack 1</p>
                </div>
           
                <h3>关于开发者</h3>
                <div>
                   目前就职于阿里巴巴大文娱，前端工程师，热爱前端知识分享。IT技术社区贡献网名<a href="http://blog.csdn.net/liangklfang">高山上的鱼</a>。如果你觉得该项目不错
                   请记得<a href="https://github.com/liangklfangl/react-universal-bucket">star</a>哦。
                   {!showImage ? <div>
                   	  <div>点击下面的按钮你可以看到作者的图片哦:</div>
                      <button onClick={()=>{this.show()}}>显示照片</button>  
                   	</div>: null }

                   {showImage ? <div>
                      <img src={myImage}/>
                   	</div> : null}
                </div>
             </div>
			)
	}
}