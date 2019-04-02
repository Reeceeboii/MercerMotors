import React, {Component} from 'react';
import { withAuth } from '@okta/okta-react';
import '../styles/user.css';
import { Link } from 'react-router-dom';
import {Jumbotron, Row, Col, Card, ListGroupItem, CardHeader, CardText } from 'reactstrap';
import ListGroup from "reactstrap/es/ListGroup";

export default withAuth(class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName: '',
            userEmail: '',
            listings: [], //array of listings that the user has on the site
            purchases: [] // array of purchases the user has made
        };
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            userName: idToken.idToken.claims.name,
            userEmail: idToken.idToken.claims.email
        }, this.prepareState);
    }

    // query the database for listings and purchases
    prepareState() {
        this.loadListings();
        this.loadPurchases();
    }

    // loads all the cars that the user has listed on the site
    loadListings() {
        fetch(`/cars/owned_by/${this.state.userName}`)
            .then(res => res.json())
            .then(listings => this.setState({listings}))
            .then(this.formatListings)
    };

    formatListings = () => {
        let currentCar;
        for(let car in this.state.listings){
            currentCar = this.state.listings[car];
            currentCar.price = currentCar.price.toLocaleString();
        }
        this.setState({car: currentCar});
    }

    formatPurchases = () => {
        let currentPurchase;
        for(let purchase in this.state.purchases){
            currentPurchase = this.state.purchases[purchase];
            currentPurchase.sale_total = currentPurchase.sale_total.toLocaleString();
        }
        this.setState({purchase: currentPurchase});
    }

    // loads all purchases from the 'sales' collection that match the user's username
    loadPurchases() {
        fetch(`/sales/${this.state.userName}`)
            .then(res => res.json())
            .then(purchases => this.setState({purchases}))
            .then(this.formatPurchases)
    };

    render() {
        let purchases;
        if(this.state.purchases.length === 0){
            purchases = <h3>You have not bought any cars yet</h3>
        }else{
            purchases = this.state.purchases.map(purchase =>
                <ListGroup>
                    <ListGroupItem className="InfoItem" tag={Link} to={`car/${purchase.car_id}`} action>
                        You purchased a car from {purchase.seller} for £{purchase.sale_total}
                    </ListGroupItem>
                </ListGroup>
            );
        }

        let listings;
        if(this.state.listings.length === 0){
            listings = <h3>You have not listed any cars yet</h3>
        }else{
            listings = this.state.listings.map(listing =>
                <ListGroup>
                    <ListGroupItem className="InfoItem" tag={Link} to={`car/${listing._id}`} action>
                        {listing.make} {listing.model} £{listing.price}
                    </ListGroupItem>
                </ListGroup>
            );
        }


        return (
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <h1 className="AccountTitle">Welcome to your account</h1>
                    <div className="Account">
                        <Row>
                            <Col xs="12" sm="12" xl="4">
                                <Card body className="AccountInfo">
                                    <CardHeader tag="h3">Account info</CardHeader>
                                    <CardText><b>Username</b></CardText>
                                    <CardText>{this.state.userName}</CardText>
                                    <CardText><b>Email</b></CardText>
                                    <CardText>{this.state.userEmail}</CardText>
                                </Card>
                            </Col>
                            <Col xs="12" sm="12" xl="4">
                                <Card body className="AccountInfo">
                                    <CardHeader tag="h3">Your car listings</CardHeader>
                                    {listings}
                                </Card>

                            </Col>
                            <Col xs="12" sm="12" xl="4">
                                <Card body className="AccountInfo">
                                    <CardHeader tag="h3">Your purchases</CardHeader>
                                    {purchases}
                                </Card>

                            </Col>
                        </Row>
                    </div>
                </Jumbotron>
            </div>
        );
    }
})
