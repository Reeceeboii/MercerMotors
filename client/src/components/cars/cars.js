import React, { Component } from 'react';
import './cars.css';

import { Button } from 'reactstrap';

class Cars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: []
        };
    }

    componentDidMount() {
        fetch('/api/cars')
            .then(res => res.json())
            .then(cars => this.setState({cars}, () => console.log('Cars fetched...', cars)));
    }

    render() {
        return (
            <div>
                <h2>Cars received from database</h2>
                <Button color="danger">Danger!</Button>
                <ul>
                    {this.state.cars.map(car =>
                        <li key={car._id}>{car.make} {car.model}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Cars;
