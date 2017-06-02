import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import {LinkContainer} from "react-router-bootstrap";
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
//react-bootstrap与react-router-bootstrap一起完成
const styles = require("./index.less");
export default class Header extends React.Component{
	render(){
     console.log("home instantiated");
      const user = this.props.user;
		return (
            <div className="header">
			   <Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">React全家桶实例</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
					<NavItem eventKey={1} href="#">聊天</NavItem>
				      {/*这个NavItem会react-router-bootstrap的LinkContainer包裹
                        从而发生URL跳转
				      */}
					<LinkContainer to="/widget">
			          <NavItem eventKey={1} href="#">Widget</NavItem>
			        </LinkContainer>
			        <NavItem eventKey={2} href="#">Survey</NavItem>
			        <NavItem eventKey={2} href="#">关于我们</NavItem>
			        {
			        	!user&&<LinkContainer to="/login">
			        	 <NavItem eventKey={2} href="#">登录</NavItem>
			        	</LinkContainer>
			        }
			        <LinkContainer to="/pagination">
			        	 <NavItem eventKey={2} href="#">分页</NavItem>
			        	</LinkContainer>
			        <NavDropdown eventKey={3} title="更多" id="basic-nav-dropdown">
			          <MenuItem key="MenuItem1" eventKey={3.1}>Action</MenuItem>
			          <MenuItem key="MenuItem2" eventKey={3.2}>Another action</MenuItem>
			          <MenuItem key="MenuItem3" eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem key="MenuItem4" divider />
			          <MenuItem key="MenuItem5" eventKey={3.3}>Separated link</MenuItem>
			        </NavDropdown>
			      </Nav>
			      <Nav pullRight>
			        <NavItem eventKey={1} href="#">Link Right</NavItem>
			        <NavItem eventKey={2} href="#">Link Right</NavItem>
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>
            </div>
			)
	}
}