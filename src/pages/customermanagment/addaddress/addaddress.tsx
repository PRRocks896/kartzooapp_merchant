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
import './addaddress.css';

import API from '../../../service/customer.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { addressCreateRequest,addressUpdateRequest } from '../../../modelController';
import { number } from 'prop-types';

class AddAddress extends React.Component<{ history: any }> {

    state = {
       userid:'',
       useriderror:'',
       address:'',
       addresserror:'',
       landmark:'',
       landmarkerror:'',
       city:'',
       cityerror:'',
       state:'',
       stateerror:'',
       country:'',
       countryerror:'',
       pincode:'',
       pincodeerror:''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addAddress = this.addAddress.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.addAddress + utils.getAppName();
    }

    onItemSelect(event:any) {
        this.setState({
            userid:this.state.userid = event.target.value
        })
    }

    validate() {
        let useriderror = "";
        let addresserror = "";
        let cityerror = "";
        let stateerror = "";
        let countryerror = "";
        let landmarkerror = "";
        let pincodeerror = "";

        if (!this.state.userid) {
            useriderror = "please select user";
        }

        if (!this.state.address) {
            addresserror = "please enter address";
        }

        if (!this.state.city) {
            cityerror = "please enter city";
        }

        if (!this.state.state) {
            stateerror = "please enter state";
        }

        if (!this.state.country) {
            countryerror = "please enter country";
        }

        if (!this.state.landmark) {
            landmarkerror = "please enter landmark";
        }

        if (!this.state.pincode) {
            pincodeerror = "please enter pincode";
        }

        if (useriderror || addresserror || cityerror || stateerror || countryerror || landmarkerror || pincodeerror) {
            this.setState({ useriderror, addresserror, cityerror, stateerror, countryerror, landmarkerror,pincodeerror });
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

    async addAddress() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                useriderror: '',
                addresserror: '',
                cityerror: '',
                stateerror: '',
                countryerror: '',
                landmarkerror: '',
                pincodeerror: '',

            })
            if (this.state.userid && this.state.address && this.state.city && this.state.state && this.state.country && this.state.landmark && this.state.pincode) {
                const obj : addressCreateRequest = {
                    userid: this.state.userid,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country,
                    landmark: this.state.landmark,
                    pincode:this.state.pincode
                }

                const obj1 : addressUpdateRequest = {
                    id:'',
                    userid: this.state.userid,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    country: this.state.country,
                    landmark: this.state.landmark,
                    pincode:this.state.pincode
                }

                // const addAddress = await API.addAddress(obj);
                // // console.log("addAddress",addAddress);

                  // const editAddress = await API.editAddress(obj);
                // // console.log("editAddress",editAddress);

                if (this.state.userid === obj.userid && this.state.address === obj.address && this.state.city === obj.city && this.state.state === obj.state && this.state.country === obj.country) {
                    const msg = "Address Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/list-address');
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
                                                <h1>Add Address</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/list-address">
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
                                                    <Label htmlFor="Address">Address</Label>
                                                    <Input
                                                        type="text"
                                                        id="Address"
                                                        name="address"
                                                        className="form-control"
                                                        // value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your address"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.addresserror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Landmark">Landmark</Label>
                                                    <Input
                                                        type="text"
                                                        id="Landmark"
                                                        name="lastname"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your landmark"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.landmarkerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="City">City</Label>
                                                    <Input
                                                        type="text"
                                                        id="City"
                                                        name="city"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your city"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.cityerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="State">State</Label>
                                                    <Input
                                                        type="text"
                                                        id="State"
                                                        name="state"
                                                        className="form-control"
                                                        // value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your state"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.stateerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Country">Country</Label>
                                                    <Input
                                                        type="text"
                                                        id="Country"
                                                        name="country"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your country"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.countryerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Pin-Code">Pin-Code</Label>
                                                    <Input
                                                        type="text"
                                                        id="Pin-Code"
                                                        name="pincode"
                                                        className="form-control"
                                                        // value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your pin code"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.pincodeerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
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
                                            onClick={this.addAddress}
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

export default AddAddress;
