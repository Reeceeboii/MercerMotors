import React, {Component} from 'react';
import { Jumbotron, Container } from 'reactstrap';

class User extends Component {
    state = {
        userName: '',
        userEmail: ''
    };

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            userName: idToken.idToken.claims.name,
            userEmail: idToken.idToken.claims.email
        });
    }

    render() {
        return (
            <div style={{ width: "60%", margin: "auto"}}>
                <Jumbotron fluid>
                    <Container fluid>
                        <h1 className="display-3">{this.state.userName}</h1>
                        <p className="lead">{this.state.userEmail}</p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}

export default User;