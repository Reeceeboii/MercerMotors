import React, {Component} from 'react';
import './RecentlySoldCar.css';
import { Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from 'reactstrap';


class RecentlySoldCar extends Component {
    render() {
        return (
            <Card className="RecentlySoldCarCard">
                <CardHeader className="RecentlySoldCar" tag="h3">SOLD FOR £{this.props.price.toLocaleString()}</CardHeader>
                <CardBody className="RecentlySoldCar">
                    <CardTitle tag="h4">{this.props.make} {this.props.model}</CardTitle>
                    <CardText tag="h4">{this.props.type} | {this.props.gearbox}</CardText>
                </CardBody>
                <CardFooter className="RecentlySoldCar">Sold by {this.props.owner}</CardFooter>
            </Card>
        );
    }
}

export default RecentlySoldCar;
