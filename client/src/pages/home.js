import React, { Component } from 'react';
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";
import { withAuth } from '@okta/okta-react';
import Row from "reactstrap/es/Row";

import Engineer from '../images/engineer.png';
import Finance from '../images/piggy-bank.png';
import CustomerService from '../images/customer-service.png';

import RecentlySoldCar from '../components/cars/RecentlySoldCar';

export default withAuth(class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
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

    // changes to the search box are handled here
    handleChange = (event) => {
        this.setState({search: event.target.value});
    };

    async componentDidMount () {
        this.checkAuthentication();
        fetch('/cars/recently_sold')
            .then(res => res.json())
            .then(recent_sales => this.setState({recent_sales}, () => console.log(recent_sales)));

    };

    async componentDidUpdate ()  {
        this.checkAuthentication();
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
                            <form className="HomeSearch">
                                <InputGroup>
                                    <Input value={this.state.search} onChange={this.handleChange}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary"
                                                tag={Link} to={`/cars/${this.state.search}`}>Search!</Button>
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
                                <RecentlySoldCar make={car.make} model={car.model}
                                                 owner={car.owner} price={car.price} type={car.type} gearbox={car.gearbox}/>
                                </Col>
                            )}
                            </Row>
                    </Jumbotron>
                </div>

                <div>
                    <Jumbotron fluid className="MainJumboNotTop">
                        <Container fluid>
                            <h1 className="display-3 main">Other details about our services</h1>
                            <Row>
                                <Col xs="12" sm="4" xl="4">
                                    <img className="OfferImage" src={Engineer} alt=""/>
                                    <h3>Full mechanical checks</h3>
                                    <p>All of the vehicles sold and listed on Mercer Motors are guaranteed to be of
                                    top quality. Fully trained mechanics give all vehicles are full check over before
                                    any handover takes place to make sure you get nothing but the best.</p>
                                </Col>
                                <Col xs="12" sm="4" xl="4">
                                    <img className="OfferImage" src={Finance} alt=""/>
                                    <h3>Value for money</h3>
                                    <p>With some of the lowest prices around, you can always trust on our marketplace
                                    members to deliver a good deal. Whether you're buying a hatchback or a people carrier,
                                    prices are always fair.</p>
                                </Col>
                                <Col xs="12" sm="4" xl="4">
                                    <img className="OfferImage" src={CustomerService} alt=""/>
                                    <h3>24/7 sales support</h3>
                                    <p>Finance questions? Help with your account? Or just want a friendly chat?
                                    Our friendly support team are on the line 24/7 ready to support you through any
                                    queries you may have.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </div>
        </div>
        );
    }
});

