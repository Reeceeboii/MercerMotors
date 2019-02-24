import React, { Component } from 'react';

import './App.css';
import Navbar from './components/nav/nav.js';

import { Jumbotron, Container, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';

class App extends Component {
    // state for storing the value currently in the search box and bindings for submission and change handling
    constructor(props) {
        super(props);
        this.state = {
            search: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // changes to the search box are handled here
    handleChange(event) {
        this.setState({search: event.target.value});
    }

    // on submit just output the result for clarity; obviously remove this
    handleSubmit(event) {
        alert('A query was submitted: ' + this.state.search);
    }


    render() {
        return (
            <div className="App">
                <Navbar/>
                <div>
                    <Jumbotron fluid className="MainJumbo">
                        <Container fluid>
                            <h1 className="display-3">Welcome to CarBay</h1>
                            <p className="lead">The <b>number 1</b> site for second hand cars</p>
                        </Container>
                        <div className="CarSearcher">
                            <form onSubmit={this.handleSubmit}>
                                <InputGroup>
                                    <Input value={this.state.search} onChange={this.handleChange}/>
                                    <InputGroupAddon addonType="append">
                                        <Button color="primary" type="submit" value="Submit">Search</Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </form>
                        </div>
                    </Jumbotron>
                </div>
            </div>
        );
    }
}


export default App;
