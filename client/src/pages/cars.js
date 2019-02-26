import React, {Component} from 'react';
import Navbar from "../components/nav/nav";
import CarCard from '../components/cars/carCard';

class Cars extends Component {
    render() {
        return (
            <div className="App">
                <CarCard/>
            </div>
        );
    }
}

export default Cars;