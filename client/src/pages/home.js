import React, {Component} from 'react';
import {Button, Container, Input, InputGroup, InputGroupAddon, Jumbotron} from "reactstrap";

import { withAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';

export default withAuth (class Home extends Component {
    // state for storing the value currently in the search box and bindings for submission and change handling
    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
            search: ""
        };
        this.checkAuthentication();
    }

    checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if(authenticated !== this.state.authenticated) {
            this.setState({authenticated});
        }
    };

    async componentDidMount() {
        this.checkAuthentication();
    }

    async componentDidUpdate() {
        this.checkAuthentication();
    }

    login = async () => {
        this.props.auth.login('/');
    };

    logout = async () => {
        this.props.auth.logout('/');
    };


    // changes to the search box are handled here
    handleChange = (event) => {
        this.setState({search: event.target.value});
    };

    // on submit just output the result for clarity; obviously remove this
    handleSubmit = (event) => {
        alert(this.state.search);
    };


    render() {
        if (this.state.authenticated === null) return null;

        const welcomeBackMessage = this.state.authenticated ? (
            <div>
                <p className="lead">Welcome back , NAME</p>
                <Button onClick={this.logout}>Log out</Button>
            </div>
        ) : (
            <div>
                <p className="lead">Looks like you aren't signed in</p>
                <Button onClick={this.login}>Log in or register!</Button>
            </div>
        );

        return (
            <div className="App">
                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            {welcomeBackMessage}
                            <h1 className="display-3">CarBay</h1>
                            <p className="lead">The <b>number 1</b> site for second hand cars</p>
                        </Container>
                        <div className="CarSearcher">
                            <form onSubmit={this.handleSubmit}>
                                <InputGroup>
                                    <Input value={this.state.search} onChange={this.handleChange}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" type="submit" value="Submit">Search!</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </form>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        );
    }
});

