import React, {Component} from 'react';
import { Card, CardHeader, CardFooter, Col, Row, Jumbotron, Form, FormGroup, Label, Input,
InputGroup, InputGroupAddon } from "reactstrap";

import '../styles/car-listing.css';
import CardBody from "reactstrap/es/CardBody";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            make: "",
            model: "",
            date: "",
            price: 0,
            type: "",
            gearbox: "",
            sold: false
        };
        this.handleChange = this.handleChange.bind(this);
    }



    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        // types of car that can be mapped into the dropdown for the user to select
        const types = [
            "Hatchback",
            "Liftback",
            "Sedan",
            "MPV",
            "SUV",
            "Crossover",
            "Coupe",
            "Convertible"
        ];

        return (
          <div className='App'>
              <Jumbotron fluid className="MainJumboTop">
                  <h2 className="Splash">List your car with Mercer Motors!</h2>

                  <div className="CarListingForm">
                      <Card className="EntryCard">
                          <CardHeader tag="h4">Please fill out the following details</CardHeader>
                          <CardBody>
                              <Form>
                                  <Row>
                                      <Col xs="12" sm="6" xl="6">
                                          <FormGroup>
                                              <Label className="EntryLabel" for="carMake">Make</Label>
                                              <Input name="make"
                                                     id="carMake"
                                                     placeholder="'Volkswagen, Mercedes...'"
                                                     value={this.state.make}
                                                     onChange={this.handleChange} />
                                          </FormGroup>
                                      </Col>
                                      <Col xs="12" sm="6" xl="6">
                                          <FormGroup>
                                              <Label className="EntryLabel" for="carModel">Model</Label>
                                              <Input name="model"
                                                     id="carModel"
                                                     placeholder="'Golf, AMG S 63...'"
                                                     value={this.state.model}
                                                     onChange={this.handleChange} />
                                          </FormGroup>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col xs="12" sm="6" xl="6">
                                          <FormGroup>
                                              <Label className="EntryLabel" for="exampleDate">Release date</Label>
                                              <Input
                                                type="date"
                                                name="date"
                                                id="exampleDate"
                                                placeholder="date placeholder"
                                                value={this.state.date}
                                                onChange={this.handleChange} />
                                          </FormGroup>
                                      </Col>
                                      <Col xs="12" sm="6" xl="6">
                                          <Label className="EntryLabel" for="VehiclePrice">Price</Label>
                                          <InputGroup>
                                              <InputGroupAddon addonType="prepend">£</InputGroupAddon>
                                              <Input name="price"
                                                     placeholder="Amount"
                                                     type="number"
                                                     step="1"
                                                     value={this.state.price}
                                                     onChange={this.handleChange} />
                                          </InputGroup>
                                      </Col>
                                  </Row>
                                      <Col xs="12" sm="6" xl="6">
                                          <Label className="EntryLabel" for="VehicleType">Type</Label>
                                          <Input name="type"
                                                 type="select"
                                                 value={this.state.type}
                                                 onChange={this.handleChange}>
                                              {
                                                  types.map((type) => (
                                                      <option>{type}</option>
                                                  ))
                                              }
                                          </Input>
                                      </Col>
                                  <Row>
                                  </Row>
                              </Form>
                          </CardBody>
                          <CardFooter className="h4">Footer</CardFooter>
                      </Card>
                  </div>
              </Jumbotron>
          </div>
        );
    }
}

export default List;