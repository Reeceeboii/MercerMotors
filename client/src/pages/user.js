import React, {Component} from 'react';
import { withAuth } from '@okta/okta-react';
import { Jumbotron, Nav, NavItem, NavLink, TabContent, TabPane, Row, Col} from 'reactstrap';
import classnames from 'classnames';

export default withAuth(class User extends Component {
    state = {
        activeTab: '1',
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

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    };

    render() {
        return (
            <div style={{width: "75vw", margin: "auto"}}>
                <Jumbotron fluid>
                    <h2>Welcome to your account</h2>

                    <Nav tabs style={{margin: "auto"}}>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                            >
                                Account Information
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                            >
                                Your starred cars
                            </NavLink>
                        </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <br/>
                                    <h4>Your username: {this.state.userName}</h4>
                                    <h4>Your email: {this.state.userEmail}</h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <h2>Put stars here dummy</h2>
                        </TabPane>
                    </TabContent>
                </Jumbotron>
            </div>
        );
    }
})