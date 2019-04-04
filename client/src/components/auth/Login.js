import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { Button, Jumbotron } from 'reactstrap';
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Login extends Component {
    constructor(props) {
        super(props);
        this.onSuccess = this.onSuccess.bind(this);
        this.state = {
            authenticated: null
        };
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            this.setState({ authenticated });
        }
    }

    componentDidUpdate() {
        this.checkAuthentication();
    }

    onSuccess(res) {
        if (res.status === 'SUCCESS') {
            return this.props.auth.redirect({
                sessionToken: res.session.token
            });
        }
    }

    render() {
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ?
            <Redirect to={{ pathname: '/' }}/> :
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <SignInWidget
                        baseUrl={this.props.baseUrl}
                        onSuccess={this.onSuccess}/>
                    <Button className="ReturnButton" color="info" tag={Link} to={"/"}>Return home</Button>{' '}
                </Jumbotron>
            </div>
    }
});
