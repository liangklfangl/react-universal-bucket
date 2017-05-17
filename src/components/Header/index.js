import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import {LinkContainer} from "react-router-bootstrap";
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
//bootstrap的组件实例
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
			        <NavItem eventKey={1} href="#">Widget</NavItem>
			        <NavItem eventKey={2} href="#">Survey</NavItem>
			        <NavItem eventKey={2} href="#">关于我们</NavItem>
			        {
			        	!user&&<LinkContainer to="/login">
			        	 <NavItem eventKey={2} href="#">登录</NavItem>
			        	</LinkContainer>
			        }
			        <NavDropdown eventKey={3} title="更多" id="basic-nav-dropdown">
			          <MenuItem eventKey={3.1}>Action</MenuItem>
			          <MenuItem eventKey={3.2}>Another action</MenuItem>
			          <MenuItem eventKey={3.3}>Something else here</MenuItem>
			          <MenuItem divider />
			          <MenuItem eventKey={3.3}>Separated link</MenuItem>
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