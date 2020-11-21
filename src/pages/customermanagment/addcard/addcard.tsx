import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Col,
    Form,
    CustomInput,
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
import './addcard.css';

import API from '../../../service/customer.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import {cardCreateRequest,cardUpdateRequest} from '../../../modelController/cardModel';

class AddCard extends React.Component<{ history: any }> {

    state = {
       userid:'',
       useriderror:'',
      cardnumber:'',
      cardnumbererror:'',
      expirymonth:'',
      expirymontherror:'',
      expiryyear:'',
      expiryyearerror:'',
      cardname:'',
      cardnameerror:'',
      cardtype:'',
      cardtypeerror:''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addCard = this.addCard.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addCard + utils.getAppName();
    }

    onItemSelect(event:any) {
        this.setState({
            userid:this.state.userid = event.target.value
        })
    }

    validate() {
        let useriderror = "";
        let cardnumbererror = "";
        let expirymontherror = "";
        let expiryyearerror = "";
        let cardnameerror = "";
        let cardtypeerror = "";

        if (!this.state.userid) {
            useriderror = "please select user";
        }

        if (!this.state.cardnumber) {
            cardnumbererror = "please enter card number";
        }

        if (!this.state.expirymonth) {
            expirymontherror = "please enter expiry month";
        }

        if (!this.state.expiryyear) {
            expiryyearerror = "please enter expiry year";
        }

        if (!this.state.cardname) {
            cardnameerror = "please enter card name";
        }

        if (!this.state.cardtype) {
            cardtypeerror = "please enter card type";
        }

        if (useriderror || cardnumbererror || expirymontherror || expiryyearerror || cardnameerror || cardtypeerror) {
            this.setState({ useriderror, cardnumbererror, expirymontherror, expiryyearerror, cardnameerror, cardtypeerror});
            return false;
        }
        return true;
    };

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async addCard() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                useriderror: '',
                cardnumbererror: '',
                expirymontherror: '',
                expiryyearerror: '',
                cardnameerror: '',
                cardtypeerror: ''

            })
            if (this.state.userid && this.state.cardtype && this.state.cardname && this.state.cardnumber && this.state.expirymonth && this.state.expiryyear) {
                const obj:cardCreateRequest = {
                    userid: this.state.userid,
                    cardtype: this.state.cardtype,
                    cardname: this.state.cardname,
                    cardnumber: this.state.cardnumber,
                    expirymonth: this.state.expirymonth,
                    expiryyear: this.state.expiryyear
                }

                const obj1:cardUpdateRequest = {
                    userid: this.state.userid,
                    cardtype: this.state.cardtype,
                    cardname: this.state.cardname,
                    cardnumber: this.state.cardnumber,
                    expirymonth: this.state.expirymonth,
                    expiryyear: this.state.expiryyear
                }

                // const addCard = await API.addCard(obj);
                // // console.log("addCard",addCard);

                  // const editCard = await API.editCard(obj);
                // // console.log("editCard",editCard);

                if (this.state.userid === obj.userid && this.state.cardtype === obj.cardtype && this.state.cardname === obj.cardname && this.state.cardnumber === obj.cardnumber && this.state.expiryyear === obj.expiryyear) {
                    const msg = "Card Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/list-card');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }


    render() {

        return (
            <>
               
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add Card</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/list-card">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                        </Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Number">Card Number</Label>
                                                    <Input
                                                        type="text"
                                                        id="Number"
                                                        name="cardnumber"
                                                        className="form-control"
                                                        // value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your card number"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.cardnumbererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Type">Card Type</Label>
                                                    <Input
                                                        type="text"
                                                        id="Type"
                                                        name="cardtype"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your card type"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.cardtypeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Name">Card Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="Name"
                                                        name="cardname"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your card name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.cardnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Month">Expiry Month</Label>
                                                    <Input
                                                        type="number"
                                                        id="Month"
                                                        name="expirymonth"
                                                        className="form-control"
                                                        // value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your expiry month"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.expirymontherror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Country">Expiry Year</Label>
                                                    <Input
                                                        type="number"
                                                        id="Year"
                                                        name="expiryyear"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your expiry year"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.expiryyearerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select User</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="userid"
                                                        onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select User</option>
                                                            <option value="User-1">User-1</option>
                                                            <option value="User-2">User-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                        {this.state.useriderror}
                                                    </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addCard}
                                        >
                                            Save
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
               
            </>
        );
    }
}

export default AddCard;
