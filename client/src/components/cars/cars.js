import React, { Component } from 'react';
import './cars.css';
import placeholder from '../../assets/500x500-placeholder.jpg';

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
            <div className="CarComponent">
                <h2>Cars</h2>
                <ul className="CarResults">
                    {this.state.cars.map(car =>
                        <div className="CarList" key={car._id}>
                            <img className="CarImage" src={placeholder} alt=""/>
                            <li style={{backgroundColor: "#cccccc", fontWeight: "bold"}}>{car.make} {car.model}</li>
                            <li>£{car.price.$numberDecimal}</li>
                            <li>{car.year.substring(0, 4)}</li>
                            <li>{car.type}</li>
                            <li>{car.gearbox_type}</li>

                        </div>
                    )}
                </ul>
            </div>
        );
    }
}

export default Cars;
