import React from "react";
const styles = require("./index.less");
export default class Footer extends React.Component{
	render(){
     console.log("home instantiated");

		return (
             <div className="footer">
               开发者:<a href="https://github.com/liangklfangl">高山上的鱼</a>
             </div>
			)
	}
}