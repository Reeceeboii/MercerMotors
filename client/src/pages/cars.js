import React, {Component} from 'react';
import sanitise from 'mongo-sanitize';
import CarCard from '../components/cars/carCard';
import {Col, Jumbotron} from "reactstrap";
import Row from "reactstrap/es/Row";

class Cars extends Component {
    constructor(props){
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        let query = sanitise(this.props.query);
        fetch(`/cars/search/${query}`)
            .then(res => res.json())
            .then(cars => this.setState({cars}));
    }

    render() {
        return (
            <div className="App">
                <Jumbotron fluid className="MainJumboTop">
                <h2>Search results for '{this.props.query}'</h2>
                    <Row>
                    {
                        this.state.cars.map((car) => (
                            <Col xs="12" sm="6" xl="6">
                            <CarCard
                                id={car._id}
                                make={car.make}
                                model={car.model}
                                release_date={car.release_date}
                                price={car.price}
                                owner={car.owner}
                            />
                            </Col>
                        ))
                    }
                    </Row>
                </Jumbotron>
            </div>
        );
    }
}

export default Cars;