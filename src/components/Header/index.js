import React from "react";
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
//bootstrap的组件实例
const styles = require("./index.less");
export default class Header extends React.Component{
	render(){
     console.log("home instantiated");
		return (
            <div className="header">
			  <Navbar inverse collapseOnSelect>
			    <Navbar.Header>
			      <Navbar.Brand>
			        <a href="#">React全家桶实例</a>
			      </Navbar.Brand>
			        {/*To have a mobile friendly Navbar, Add a Navbar.
			        Toggle to your Header and wrap your Navs in a Navbar.
			         Collapse component. The Navbar will automatically wire the toggle and collapse together!*/}
			      <Navbar.Toggle />
			    </Navbar.Header>
			    <Navbar.Collapse>
			      <Nav>
			        <NavItem eventKey={1} href="#">Link</NavItem>
			        <NavItem eventKey={2} href="#">Link</NavItem>
			        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
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