import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/nav/nav';
import Home from './pages/home';
import Cars from './pages/cars';
import User from './pages/user';
import Login from './components/auth/Login';

import './App.css';

// okta configuration information
// this is linked to my CarBay application on Okta.com
const OktaConfig = {
    domain: 'https://dev-324612.okta.com',
    issuer: 'https://dev-324612.okta.com/oauth2/default',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oabhldxoT4HTCShn356'
};

// pushes users to the login page if their authentication is required
function onAuthRequired({history}) {
    history.push('/login')
}

// main app component, used for most Okta auth stuff and routing
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Security issuer={OktaConfig.issuer}
                              client_id={OktaConfig.client_id}
                              redirect_uri={OktaConfig.redirect_uri}
                              onAuthRequired={onAuthRequired}>

                        <Navbar/>

                        <Route exact={true} path='/' render={() => (
                            <div className='App'>
                                <Home />
                            </div>
                        )}/>

                        <Route exact={true} path='/cars' render={() => (
                            <div className='App'>
                                <Cars />
                            </div>
                        )}/>

                        <SecureRoute exact={true} path='/user' render={() => (
                            <div className='App'>
                                <User/>
                            </div>
                        )}/>

                        <Route path='/login' render={() =>(
                            <Login baseUrl={OktaConfig.domain}/>
                        )}/>

                        <Route path='/implicit/callback' component={ImplicitCallback}/>

                    </Security>
                </div>
            </Router>
        );
    }
}


export default App;