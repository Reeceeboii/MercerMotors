import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import Home from './pages/home';
import './App.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact={true} path='/' render={() => (
                        <div className="App">
                            <Home />
                        </div>
                    )}/>
                </div>
            </BrowserRouter>
        );
    }
}


export default App;