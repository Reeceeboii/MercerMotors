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
            logInOutButtonText: "Log in",
            search: ""
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

    // changes to the search box are handled here
    handleChange = (event) => {
        this.setState({search: event.target.value});
    };

    // on submit just output the result for clarity; obviously remove this
    handleSubmit = (event) => {
        alert(this.state.search);

        fetch('/cars/' + this.state.search)
          .then(res => res.json())
          .then(cars => this.setState({cars}, () => console.log('Cars fetched...', cars)));
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
                      <img width="150" src={'nav_logo.png'} alt=""/>
                  </Link>
              </NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                      <NavItem>
                          <NavLink activeClassName="selected" tag={Link} to="/">
                              Home
                          </NavLink>
                      </NavItem>
                      <NavItem>
                          <NavLink className="NavigationLink" tag={Link} to="/">
                              GitHub
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