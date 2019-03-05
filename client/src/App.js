import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './components/nav/nav';
import Footer from './components/footer/footer';
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
                                <Navbar/>
                                <Home />
                                <Footer/>
                            </div>
                        )}/>

                        <Route exact={true} path='/cars' render={() => (
                            <div className='App'>
                                <Navbar/>
                                <Cars />
                                <Footer/>
                            </div>
                        )}/>

                        <Route exact={true} path='/car' render={() => (
                            <div className='App'>
                                <Navbar/>
                                <Cars />
                                <Footer/>
                            </div>
                        )}/>


                        <SecureRoute exact={true} path='/user/:username' render={() => (
                            <div className='App'>
                                <Navbar/>
                                <User/>
                                <Footer/>
                            </div>
                        )}/>

                        <Route path='/login' render={() =>(
                            <div className='App'>
                                <Login baseUrl={OktaConfig.domain}/>
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