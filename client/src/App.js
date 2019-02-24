import React, { Component } from 'react';

import './App.css';
import Navbar from './components/nav/nav.js';

import { Jumbotron, Container } from 'reactstrap';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar/>

                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            <h1 className="display-3">Welcome to CarBay</h1>
                            <p className="lead">
                                The <b>number 1</b> site for second hand cars
                            </p>
                        </Container>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}

export default App;
