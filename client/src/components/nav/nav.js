import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import './nav.css';
import {
    Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, Button,
    NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default withAuth(class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            username: "My account",
            logInOutButtonText: "Log in"
        };
    }

    tokenExists = (token) => {
        for(let key in token){
            if(token.hasOwnProperty(key)){
                return true;
            }
        }
        return false;
    };

    componentDidMount() {
        if(this.tokenExists(JSON.parse(localStorage.getItem('okta-token-storage')))) {
            let retrievedName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
            this.setState({ username: retrievedName, logInOutButtonText: "Log out"});
        }
    }

    logout = async () => {
        this.props.auth.logout('/login');
    };

    login = async () => {
        this.props.auth.login('/')
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };


    render() {
        let logInOutButton = null;
        if(this.state.logInOutButtonText === "Log in"){
            logInOutButton = <Button onClick={this.login}>{this.state.logInOutButtonText}</Button>
        }else{
            logInOutButton = <Button onClick={this.logout}>{this.state.logInOutButtonText}</Button>
        }
        return (
            <Navbar className="NavBar" light expand="md">
                <NavbarBrand>
                    <Link to="/">
                        <img width="150" src={'sign_in_logo.png'} alt=""/>
                    </Link>
                </NavbarBrand>
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
                                <a href="https://github.com/Reeceeboii" target="_blank" rel="noopener noreferrer">GitHub</a>
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {this.state.username}
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/user">Account</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    {logInOutButton}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
})