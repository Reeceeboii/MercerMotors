import React, {Component} from 'react';
import { withAuth } from '@okta/okta-react';
import '../styles/user.css';
import {Jumbotron, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

export default withAuth(class User extends Component {
    state = {
        userName: '',
        userEmail: '',
        purchases: [] // array of purchases the user has made
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            userName: idToken.idToken.claims.name,
            userEmail: idToken.idToken.claims.email
        }, this.loadPurchases);
    }


    // loads all purchases from the 'sales' collection that match the user's username from okta token
    loadPurchases() {
        fetch(`/sales/${this.state.userName}`)
            .then(res => res.json())
            .then(purchases => this.setState({purchases}, () =>
                console.log('Purchases fetched...', purchases)));
    };


    render() {
        const purchases = this.state.purchases.length === 0 ?
            "You haven't purchased anything yet, go to the marketplace and start looking!" :
            this.state.purchases.map(purchase =>
                <ListGroupItem className="PurchaseItem" key={purchase._id}>
                    You bought [car._id] from {purchase.seller} for £{purchase.sale_total}
                </ListGroupItem>
            );


        return (
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <h2 className="Splash">Welcome to your account, {this.state.userName}</h2>
                        <Row className="AccountInfoRow">
                            <Col className="AccountInfo" xs="12" sm="6" xl="6">
                                <h3>Account information</h3>
                                <p>Username: {this.state.userName}</p>
                                <p>Email: {this.state.userEmail}</p>
                            </Col>
                            <ListGroup>
                            <Col className="PurchaseList" xs="12" sm="6" xl="6">
                                <h3>Your purchases</h3>
                                {purchases}
                            </Col>
                            </ListGroup>
                        </Row>
                </Jumbotron>
            </div>
        );
    }
})