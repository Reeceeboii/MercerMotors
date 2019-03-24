import React, {Component} from 'react';
import './footer.css';
import { Row, Col } from 'reactstrap';

class Footer extends Component {
    render() {
        return (
            <div className="App">
                <footer className="SiteFooter">
                    <Row>
                        <Col xs="12" sm="6" xl="6">
                            <dl>
                                <dt>Contact details</dt>
                                <dd>Email: <a className="FooterLink" href="">Email us here!</a></dd>
                            </dl>
                        </Col>
                        <Col xs="12" sm="6" xl="6">
                            <dl>
                                <dt>Other details</dt>
                                <dd>Personal: <a className="FooterLink" href="https://github.com/Reeceeboii"
                                target="_blank" rel="noopener noreferrer">My GitHub</a></dd>
                                <dd>Project: <a className="FooterLink" href="https://github.com/Reeceeboii/MercerMotors"
                                                 target="_blank" rel="noopener noreferrer">View this site's repo</a></dd>
                            </dl>
                        </Col>
                        <Col className="Copy" xs="12" >
                            <dd>&copy; <a className="FooterLink" href="https://reecemercer.dev" target="_blank" rel="noopener noreferrer">
                                Reece Mercer 2019</a></dd>
                        </Col>
                    </Row>
                </footer>
            </div>
        );
    }
}

export default Footer;