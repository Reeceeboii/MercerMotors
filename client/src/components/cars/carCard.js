import React, { Component } from 'react';
import './cars.css';

import { Card, CardText, CardBody, Button,
    CardTitle, ListGroup, ListGroupItem, CardHeader, CardFooter} from 'reactstrap';

class CarCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            cSelected: []
        };
    }


    componentDidMount() {
        fetch('/cars')
            .then(res => res.json())
            .then(cars => this.setState({cars}, () => console.log('Cars fetched...', cars)));
    }


    render() {
        return (
            <ListGroup className="CarList">
                {this.state.cars.map(car =>
                    <ListGroupItem key={car._id}>
                        <Card style={{textAlign: "center"}} body outline color="primary">
                            <CardHeader tag="h2">
                                {car.make} {car.model}
                            </CardHeader>
                            <CardBody>
                                <CardTitle style={{fontWeight: "bold"}}>£{car.price}</CardTitle>
                                <CardText>{car.release_date.substring(0, 4)} | {car.type} | {car.gearbox}</CardText>
                            </CardBody>
                            <CardFooter className="text-muted">
                                Uploaded by {car.owner_id}
                            </CardFooter>
                            <Button color="info" size="lg" block>View</Button>
                        </Card>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}

export default CarCard;
