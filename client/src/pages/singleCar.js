import React, {Component} from 'react';
import { Link } from "react-router-dom";
import { Jumbotron, Card, CardHeader, CardBody, Badge,  CardFooter, Row, Col,
    Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from "reactstrap";

import '../styles/single-car.css';

const sanitise = require('mongo-sanitize');


class SingleCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountName: "",
            car: [],
            modal: false
        };
    };

    componentDidMount() {
        let cleansedID = sanitise(this.props.carID);
        fetch(`/cars/id/${cleansedID}`)
            .then(res => res.json())
            .then(car => this.setState({car},
                () => this.formatState()));

        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({accountName: idToken.idToken.claims.name});
    };

    // PUT request, setting the sold status of the car to true
    purchaseCar = () => {
        fetch(`/cars/mark-as-sold/${this.state.car._id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "buyer":this.state.accountName
            })
        })
    };


    formatState() {
        let car = {...this.state.car};
        car.release_date = car.release_date.split("T")[0];
        car.price = car.price.toLocaleString();
        this.setState({car});
    }


    render() {
        let sold;

        // if the car has been sold as is being viewed by its owner
        if(this.state.car.sold === true && this.state.car.owner === this.state.accountName){
            sold = <div>
                <Alert color="success">
                    <h4 className="alert-heading">Congratulations!</h4>
                    <p>
                        Well done, this car has been sold. It was purchased for £{this.state.car.price}
                    </p>
                    <hr />
                    <p className="mb-0">
                        This page is no longer being indexed on the site's search pages
                    </p>
                </Alert>
            </div>
        // if the car hasn't been sold and is being viewed by its owner
        }else if(this.state.car.sold === false && this.state.car.owner === this.state.accountName){
            sold = <Alert color="info">Your car has not been sold yet</Alert>
        }

        // if the car has been sold and is being viewed by someone that isn't the owner
        if(this.state.car.sold === true && this.state.car.owner !== this.state.accountName){
            sold = <div>
                <Button color="primary" size="lg" block disabled onClick={this.toggle}>Purchase this car</Button>
                <aside>This car has already been purchased</aside>
            </div>
        // if the car hasn't been sold and is being viewed by someone that isn't the owner (can purchase)
        }else if(this.state.car.sold === false && this.state.car.owner !== this.state.accountName){
            sold = <div>
                <Button color="primary" size="lg" block onClick={this.toggle}>Purchase this car</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Are you sure you wish to purchase this {this.state.car.make} {this.state.car.model}?
                    </ModalHeader>
                    <ModalBody>
                        After a few seconds, this car will be visible under your account's 'My purchases' tab. If you don't see it,
                        give the page a refresh.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" tag={Link} to ="/user" onClick={this.purchaseCar}>Confirm purchase
                            (£{this.state.car.price})</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        }

        return (
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <Card className="MainCar">
                        <CardHeader className="CarTitle">{this.state.car.make} {this.state.car.model}</CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12" sm="12" xl="12">
                                    <h1 className="Price">£{this.state.car.price}</h1>
                                    <h2 className="Info">Release date <Badge color="secondary">{this.state.car.release_date}</Badge></h2>
                                    <h2 className="Info">Vehicle type <Badge color="secondary">{this.state.car.type}</Badge></h2>
                                    <h2 className="Info">Gearbox <Badge color="secondary">{this.state.car.gearbox}</Badge></h2>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>{sold}</CardFooter>
                    </Card>
                </Jumbotron>
            </div>
        );
    }
}

export default SingleCar;
