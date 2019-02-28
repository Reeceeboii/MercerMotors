import React, {Component} from 'react';
import {Button, Container, Input, InputGroup, InputGroupAddon, Jumbotron, Alert} from "reactstrap";

import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { authenticated: null };
    }

    checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    };

    async componentDidMount () {
        this.checkAuthentication();
    };

    async componentDidUpdate ()  {
        this.checkAuthentication();
    };

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

    onDismiss = () => {
        this.setState({ visible: false });
    };


    render() {
        if (this.state.authenticated === null) return null;

        let welcomeBackMessage = null;
        if(!this.state.authenticated) {
            welcomeBackMessage = (
            <Alert style={{width: "75%", margin: "auto", textAlign: "center"}}
                   color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
                Looks like you aren't signed in. <Link to="/login">Click here to log in or sign up!</Link>
            </Alert>
            )}

        return (
            <div className="App">
                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            {welcomeBackMessage}
                            <br/>
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

