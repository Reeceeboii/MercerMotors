import React, { Component } from 'react';
import './cars.css';

import { Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, ListGroup, ListGroupItem } from 'reactstrap';

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        fetch('/api/cars/')
            .then(res => res.json())
            .then(cars => this.setState({cars}, () => console.log('Cars fetched...', cars)));
    }

    render() {
        return (
            <ListGroup className="CarList">
                {this.state.cars.map(car =>
                    <ListGroupItem>
                        <Card>
                            <CardBody className="CardHeader">
                                <CardTitle>{car.make} {car.model}</CardTitle>
                            </CardBody>
                            <img className="CarCardImage" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
                            <CardBody>
                                <CardText><b>Information</b></CardText>
                                <CardLink href="#">Card Link</CardLink>
                                <CardLink href="#">Another Link</CardLink>
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}

export default Cars;
