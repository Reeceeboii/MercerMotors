import React, {Component} from 'react';
import { Card, CardHeader, CardFooter, Col, Row, Jumbotron, Form, FormGroup, Label, Input,
InputGroup, InputGroupAddon, Button, CardBody, UncontrolledAlert} from "reactstrap";

import '../styles/car-listing.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValidationErrors: [],

            owner: "",
            make: "",
            model: "",
            release_date: "",
            price: "",
            type: "Hatchback",
            gearbox: "Manual",
            sold: false,
            file: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            owner: idToken.idToken.claims.name,
        });
    }

    store(data) {
        fetch('/cars/create_new', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            // TODO - redirect user (need a way to get newly created ID)
            .then(alert("new car has been created!"));
    };

    handleFileUpload = uploadEvent => {
        // reset currently uploaded file to null, and replace with file from argument event

        // extract file details
        const fileDetails = uploadEvent.target.files[0];

        this.setState( { file: null }, () =>
            this.setState({ file: fileDetails }, () =>
                console.log(this.state.file)
            )
        )
    };

    handleInit() {
        console.log('FilePond instance has initialised', this.pond);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    validateInputs() {
        let make = this.state.make;
        make = make.trim();
        make = make.charAt(0).toUpperCase() + make.slice(1);

        let model = this.state.model;
        model = model.trim();
        model = model.charAt(0).toUpperCase() + model.slice(1);

        const validatedState = {
            owner: this.state.owner,
            make: make,
            model: model,
            release_date: this.state.release_date,
            price: this.state.price,
            type: this.state.type,
            gearbox: this.state.gearbox,
            sold: false,
            file: this.state.file
        };

        let validationAlerts = [];

        if(validatedState.make.length === 0){
            validationAlerts.push({alert:"Car make cannot be left empty"});
        }
        if(validatedState.model.length === 0){
            validationAlerts.push({alert:"Car model cannot be left empty"});
        }
        if(validatedState.release_date === ""){
            validationAlerts.push({alert:"Please enter a date"});
        }
        if(validatedState.price.length === 0 || validatedState.price === 0){
            validationAlerts.push({alert:"Price must be filled out and be more than 0"})
        }
        if(validatedState.file === null || validatedState.file.type !== "image/jpg" || validatedState.file.type !== "image/png"){
            validationAlerts.push({alert:"You must upload at least one image of type .jpg or .png"})
        }


        if(validationAlerts.length > 0){
            this.setState({formValidationErrors:validationAlerts});
                return false;
        }else{
            return validatedState;
        }
    }

    handleSubmit(){
        let result = this.validateInputs();
        if(result !== false){
            this.store(result);
        }else{
            console.log(this.state.formValidationErrors)
        }
    }

    render() {
        // types of car that can be mapped into the dropdown for the user to select
        const types = [
            "Hatchback", "Liftback", "Sedan",
            "MPV", "SUV", "Crossover", "Coupe", "Convertible"
        ];

        // types of gearboxes that are also mapped into dropdown boxes
        const gearboxes = ["Manual", "Automatic"];

        return (
          <div className='App'>
              <Jumbotron fluid className="MainJumboTop">
                  <h2 className="Splash">List your car with Mercer Motors!</h2>

                  <div className="CarListingForm">
                      <Card className="EntryCard">
                          <CardHeader tag="h4">Please fill out the following details</CardHeader>
                          <CardBody>
                              <Form onSubmit={this.handleSubmit}>
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
                                                name="release_date"
                                                id="exampleDate"
                                                placeholder="date placeholder"
                                                value={this.state.release_date}
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
                                  <Row>
                                      <Col xs="12" sm="6" xl="6">
                                          <Label className="EntryLabel" for="VehicleType">Type</Label>
                                          <Input name="type"
                                                 type="select"
                                                 value={this.state.type}
                                                 onChange={this.handleChange}>
                                              {
                                                  types.map((type) => (
                                                      <option key={type}>{type}</option>
                                                  ))
                                              }
                                          </Input>
                                      </Col>
                                      <Col xs="12" sm="6" xl="6">
                                          <Label className="EntryLabel" for="GearboxType">Gearbox type</Label>
                                          <Input name="gearbox"
                                                 type="select"
                                                 value={this.state.gearbox}
                                                 onChange={this.handleChange}
                                                 oninit={() => this.handleInit()}>

                                              {
                                                  gearboxes.map((gearbox) => (
                                                      <option key={gearbox}>{gearbox}</option>
                                                  ))
                                              }
                                          </Input>
                                      </Col>
                                  </Row>
                                  <Row>
                                      <Col className="FileUpload" xs="12" sm="12" xl="12">
                                          <Label className="EntryLabel" for="FileUpload">
                                              And finally, upload a picture of your car (.png and .jpg files only)
                                          </Label>
                                      </Col>
                                      <Col className="FileUpload" xs="12" sm="12" xl="12">
                                      <input type="file" onChange={this.handleFileUpload}/>
                                      </Col>
                                  </Row>
                              </Form>
                              {
                                  this.state.formValidationErrors.map((error) => (
                                      <UncontrolledAlert  color="danger">{error.alert}</UncontrolledAlert >
                                  ))
                              }
                          </CardBody>
                          <CardFooter className="h4">
                              <Button color="success" size="lg"
                                      onClick={this.handleSubmit}>List your car!</Button>
                          </CardFooter>
                      </Card>
                  </div>
              </Jumbotron>
          </div>
        );
    }
}

export default List;