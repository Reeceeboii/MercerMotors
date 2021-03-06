import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './carCard.css';

import { Card, CardText, CardBody, Button,
    CardTitle, ListGroup, ListGroupItem, CardHeader, CardFooter} from 'reactstrap';

class CarCard extends Component {
    render() {
        return (
            <div className='App'>
                <ListGroup className="CarListGroup">
                    <ListGroupItem className="CarList">
                        <Card className="CarCard">
                            <CardHeader tag="h2">
                                {this.props.make} {this.props.model}
                            </CardHeader>
                            <CardBody>
                                <CardTitle className="lead"><h3>£{this.props.price}</h3></CardTitle>
                                <CardText className="lead"><h3>{this.props.release_date}</h3></CardText>
                            </CardBody>
                            <CardFooter className="text-muted">
                                Uploaded by {this.props.owner}
                            </CardFooter>
                            <Button color="info" size="lg" tag={Link} to={`/car/${this.props.id}`} block>View this car</Button>
                        </Card>
                    </ListGroupItem>
                </ListGroup>
            </div>
        );
    }
}

export default CarCard;
