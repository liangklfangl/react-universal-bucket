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
			   <Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="/">React全家桶实例</a>
			      </Navbar.Brand>
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav pullLeft>
			       <LinkContainer to="/">
			          <NavItem eventKey={1} href="#">首页</NavItem>
			        </LinkContainer>
					 {/*<NavItem eventKey={1} href="#">聊天</NavItem>*/}
				      {/*这个NavItem会react-router-bootstrap的LinkContainer包裹
                        从而发生URL跳转
				      */}
					<LinkContainer to="/widget">
			          <NavItem eventKey={1} href="#">Widget</NavItem>
			        </LinkContainer>
			        <LinkContainer to="/counter">
			          <NavItem eventKey={2} href="#">计数器</NavItem>
			        </LinkContainer>
			        {/*
                          <NavItem eventKey={2} href="#">Survey</NavItem>
			        */}
	
			  
			        <LinkContainer to="/pagination">
			        	 <NavItem eventKey={2} href="#">分页</NavItem>
			        </LinkContainer>
			        <NavDropdown eventKey={3} title="更多" id="basic-nav-dropdown">
			          <MenuItem key="MenuItem1" href="/about" eventKey={3.1} >关于我</MenuItem>
			        </NavDropdown>
			      </Nav>
			      {/*
                     这里的Navbar.Collapse下面会有两个同级的Nav元素，一个pullLeft一个pullRight
			      */}
			      <Nav pullRight>
			        <Choose>
					  <When condition={ !user }>
					   <LinkContainer to="/login">
			        	 <NavItem eventKey={2} href="#">登录</NavItem>
			        	</LinkContainer>
					  </When>
					  <Otherwise>
					    <NavItem eventKey={2} href="#" style={{color:"#fff"}}>
					   你目前登录的账号为{user.name}
					   </NavItem>
					  </Otherwise>
					</Choose>

                   		
			      </Nav>
			    </Navbar.Collapse>
			  </Navbar>
			)
	}
}