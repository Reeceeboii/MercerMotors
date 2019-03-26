import React, {Component} from 'react';
import { Jumbotron, Card, CardHeader, CardBody, Badge,  CardFooter, Row, Col,
    Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption,
    Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";

import '../styles/single-car.css';

const sanitise = require('mongo-sanitize');

const items = [
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa1d%20text%20%7B%20fill%3A%23555%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa1d%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22285.921875%22%20y%3D%22218.3%22%3EFirst%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 1',
        caption: 'Slide 1'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa20%20text%20%7B%20fill%3A%23444%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa20%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23666%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22247.3203125%22%20y%3D%22218.3%22%3ESecond%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 2',
        caption: 'Slide 2'
    },
    {
        src: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22800%22%20height%3D%22400%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20800%20400%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_15ba800aa21%20text%20%7B%20fill%3A%23333%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A40pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_15ba800aa21%22%3E%3Crect%20width%3D%22800%22%20height%3D%22400%22%20fill%3D%22%23555%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22277%22%20y%3D%22218.3%22%3EThird%20slide%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        altText: 'Slide 3',
        caption: 'Slide 3'
    }
];


class SingleCar extends Component {
    constructor(props){
        super(props);
        this.state = {
            accountName: "",
            car: [],
            activeIndex: 0,
            modal: false
        };

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
        this.toggle = this.toggle.bind(this);
    };

    componentDidMount() {
        let cleansedID = sanitise(this.props.carID);
        fetch(`/cars/id/${cleansedID}`)
            .then(res => res.json())
            .then(car => this.setState({car},
                () => this.formatState()));

        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({accountName: idToken.idToken.claims.name});
    };

    // toggle state tracking of the modal being toggled or not
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    formatState() {
        let car = {...this.state.car};
        car.release_date = car.release_date.split("T")[0];
        car.price = car.price.toLocaleString();
        this.setState({car});
    }

    onExiting() {
        this.animating = true;
    }

    onExited() {
        this.animating = false;
    }

    next() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({ activeIndex: nextIndex });
    }

    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
        this.setState({ activeIndex: nextIndex });
    }

    goToIndex(newIndex) {
        if (this.animating) return;
        this.setState({ activeIndex: newIndex });
    }


    render() {
        const { activeIndex } = this.state;

        let sold;
        if(this.state.car.sold === false && this.state.car.owner !== this.state.accountName){
            sold = <div>
                <Button color="primary" size="lg" block onClick={this.toggle}>Purchase this car</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        Are you sure you wish to purchase this {this.state.car.make} {this.state.car.model}?
                    </ModalHeader>
                    <ModalBody>
                        Once purchased, this car will be visible under your account's 'My purchases' tab.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>Confirm purchase (£{this.state.car.price})</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        }else{
            if(this.state.car.owner !== this.state.accountName) {
                sold = <div>
                    <Button color="primary" size="lg" block disabled onClick={this.toggle}>Purchase this car</Button>
                    <aside>This car has already been purchased</aside>
                    </div>

            }else{
                sold = <div>
                    <Button color="primary" size="lg" block disabled onClick={this.toggle}>Purchase this car</Button>
                    <aside>You cannot purchase a car that you have listed</aside>
                </div>
            }
        }


        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={this.onExiting}
                    onExited={this.onExited}
                    key={item.src}
                >
                    <img src={item.src} alt={item.altText} />
                    <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
                </CarouselItem>
            );
        });

        return (
            <div className='App'>
                <Jumbotron fluid className="MainJumboTop">
                    <Card className="MainCar">
                        <CardHeader className="CarTitle">{this.state.car.make} {this.state.car.model}</CardHeader>
                        <CardBody>
                            <Row>
                                <Col xs="12" sm="6" xl="6">
                                    <Carousel
                                        activeIndex={activeIndex}
                                        next={this.next}
                                        previous={this.previous}
                                    >
                                        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                                        {slides}
                                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                                    </Carousel>
                                </Col>

                                <Col xs="12" sm="6" xl="6">
                                    <h1 className="Price">£{this.state.car.price}</h1>

                                    <h2 className="Info">Release date <Badge color="secondary">{this.state.car.release_date}</Badge></h2>
                                    <h2 className="Info">Vehicle type <Badge color="secondary">{this.state.car.type}</Badge></h2>
                                    <h2 className="Info">Gearbox <Badge color="secondary">{this.state.car.gearbox}</Badge></h2>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>{sold}</CardFooter>
                    </Card>


                </Jumbotron>
            </div>
        );
    }
}

export default SingleCar;