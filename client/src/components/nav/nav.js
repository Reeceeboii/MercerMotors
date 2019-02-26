import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem,
    NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            //TODO link this name with OKTA
            name: "Reece"
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
            <Navbar className="NavBar" light expand="md">
                <NavbarBrand><Link to="/">CarBay</Link></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink>
                                <Link to="/">Home</Link>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>
                                <Link to="/">GitHub</Link>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {this.state.name}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/user">My account</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/">My stars</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to="/">Log out</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default NavBar;