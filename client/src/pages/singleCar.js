import React, {Component} from 'react';
import { Jumbotron, Card, CardHeader, CardBody, CardTitle, CardText, Button, CardFooter } from "reactstrap";
const sanitise = require('mongo-sanitize');

class SingleCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            car: {}
        }
    };


    componentDidMount() {
        let cleansedID = sanitise(this.props.carID);
        fetch(`/cars/id/${cleansedID}`)
            .then(res => res.json())
            .then(car => this.setState({car}))
    };


    render() {
        return (
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <h2>{this.props.carID}</h2>

                    <Card className="MainCar">
                        <CardHeader tag="h3">{this.state.car.make} {this.state.car.model}</CardHeader>
                        <CardBody>
                            <CardTitle>Special Title Treatment</CardTitle>
                            <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                            <Button>Go somewhere</Button>
                        </CardBody>
                        <CardFooter className="text-muted">Footer</CardFooter>
                    </Card>


                </Jumbotron>
            </div>
        );
    }
}

export default SingleCar;