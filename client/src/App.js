import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/nav/nav';
import Footer from './components/footer/footer';
import Home from './pages/home';
import Car from './pages/singleCar';
import Cars from './pages/cars';
import User from './pages/user';
import List from './pages/list';
import Login from './components/auth/Login';

import './App.css';

// I only want to import local .env files when not in production
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// okta configuration information
// this is linked to my application on Okta.com
const OktaConfig = {
    domain: process.env.REACT_APP_OKTA_DOMAIN,
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    redirect_uri: window.location.origin + process.env.REACT_APP_OKTA_REDIRECT_URI,
    client_id: process.env.REACT_APP_OKTA_CLIENT_ID
};

// pushes users to the login page if their authentication is required
function onAuthRequired({history}) {
    history.push('/login')
}

// main app component, used for most Okta auth stuff and routing
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <Security issuer={OktaConfig.issuer}
                              client_id={OktaConfig.client_id}
                              redirect_uri={OktaConfig.redirect_uri}
                              onAuthRequired={onAuthRequired}>

                        <Route exact={true} path='/' render={() => (
                            <div className='App'>
                                <h1 className="Title">Mercer Motors</h1>
                                <Navbar />
                                <Home />
                                <Footer />
                            </div>
                        )}/>

                        <Route exact={true} path='/cars/:searchQuery' render={( { match } ) => (
                            <div className='App'>
                                <Navbar />
                                <Cars query={match.params.searchQuery}/>
                                <Footer />
                            </div>
                        )}/>

                        <SecureRoute exact={true} path='/user' render={() => (
                            <div className='App'>
                                <Navbar />
                                <User />
                                <Footer />
                            </div>
                        )}/>

                        <Route path='/login' render={() =>(
                            <div className='App'>
                                <Navbar />
                                <Login baseUrl={OktaConfig.domain}/>
                            </div>
                        )}/>

                        <SecureRoute  exact={true} path='/car/:id' render={( { match } ) =>(
                            <div className='App'>
                                <Navbar />
                                <Car carID={match.params.id} />
                                <Footer />
                            </div>
                        )}/>

                        <SecureRoute exact={true} path='/list' render={() => (
                            <div className='App'>
                                <Navbar />
                                <List />
                                <Footer />
                            </div>
                        )}/>

                        <Route path='/implicit/callback' component={ImplicitCallback}/>

                    </Security>
                </div>
            </Router>
        );
    }
}


export default App;
