import React, { Component } from 'react';
import './cars.css';

import { Col, Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, ListGroup, ListGroupItem, CardHeader, CardFooter,
    Button} from 'reactstrap';

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        fetch('/cars')
            .then(res => res.json())
            .then(cars => this.setState({cars}, () => console.log('Cars fetched...', cars)));
    }

    search() {

    }

    render() {
        return (
            <ListGroup className="CarList">
                {this.state.cars.map(car =>
                    <ListGroupItem>
                        <Card>
                            <CardHeader tag="h3">{car.make} {car.model}</CardHeader>
                            <CardBody>
                                <CardTitle style={{fontWeight: "bold"}}>£{car.price}</CardTitle>
                                <CardText>{car.release_date.substring(0, 4)} | {car.type} | {car.gearbox}</CardText>
                                <Button>View</Button>
                            </CardBody>
                            <CardFooter className="text-muted">Uploaded by {car.owner_id}</CardFooter>
                        </Card>
                    </ListGroupItem>
                )}
            </ListGroup>
        );
    }
}

export default Cars;
