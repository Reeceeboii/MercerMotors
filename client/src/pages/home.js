import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, Jumbotron } from "reactstrap";
import { withAuth } from '@okta/okta-react';
import Row from "reactstrap/es/Row";

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: null,
            recent_sales: []
        };
    }

    checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    };

    async componentDidMount () {
        this.checkAuthentication();
        fetch('/cars/all_cars/recently_sold')
            .then(res => res.json())
            .then(recent_sales => this.setState({recent_sales}, () => console.log(recent_sales)));

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
                    <Jumbotron fluid className="MainJumboTop">
                        <Container fluid>
                            <h1 className="display-3 main">Welcome</h1>
                            <p className="lead">The absolute number 1 place on the internet for buying and selling second
                            hand cars. Find your dream car today!</p>
                            <form>
                                <InputGroup>
                                    <Input value={this.state.search} onChange={this.handleChange}/>
                                    <InputGroupAddon addonType="append">
                                        <Button onClick={this.handleSubmit} color="primary" type="submit" value="Submit">Search!</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </form>
                        </Container>
                    </Jumbotron>
                </div>

                <div>
                    <Jumbotron fluid className="MainJumboNotTop">
                            <h1 className="display-3 main">Recent sales</h1>
                            <p className="lead">All of these cars have recently been sold, you can get similar deals to
                            these, just start searching!</p>
                            <Row>
                            {this.state.recent_sales.map(car =>
                                <Col xs="12" sm="6" xl="6">
                                <h1>{car.make} {car.model} {car._id} {car.price}</h1>
                                </Col>
                            )}
                            </Row>
                    </Jumbotron>
                </div>

                <div>
                    <Jumbotron fluid className="MainJumboNotTop">
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

