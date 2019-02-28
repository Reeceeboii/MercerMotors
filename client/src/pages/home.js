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



    onDismiss = () => {
        this.setState({ visible: false });
    };


    render() {
        if (this.state.authenticated === null) return null;

        return (
            <div className="App">
                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            <h1 className="display-3 main">Welcome</h1>
                            <p className="lead">The absolute number 1 place on the internet for buying and selling second
                            hand cars. Find your dream car today!</p>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            <h1 className="display-3 main">Our services</h1>
                            <p className="lead">3 columns here with stuff we offer</p>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            <h1 className="display-3 main">Other offers</h1>
                            <p className="lead">blah blah blah</p>
                        </Container>
                    </Jumbotron>
                </div>
        </div>
        );
    }
});

