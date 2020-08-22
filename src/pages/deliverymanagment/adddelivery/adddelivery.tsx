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
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
import './adddelivery.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { deliveryCreateRequest, deliveryUpdateRequest } from '../../../modelController/deliveryModel';

class AddDelivery extends React.Component<{ history: any }> {

    state = {
        selectedFile: undefined,
        firstname: '',
        firstnameerror: '',
        lastname: '',
        lastnameerror: '',
        email: '',
        emailerror: '',
        mobilenumber: '',
        mobilenumbererror: '',
        password: '',
        passworderror: '',
        checked: false,
        selectedFileerror: '',
        deliveryidproof: undefined,
        deliveryidprooferror: '',
        deliveryaddressproof: undefined,
        deliveryaddressprooferror: ''
    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.removeIdProofIcon = this.removeIdProofIcon.bind(this);
        this.removeAddressProffIcon = this.removeAddressProffIcon.bind(this);
        this.addUser = this.addUser.bind(this);
        this.onChangeProofHandler = this.onChangeProofHandler.bind(this);
        this.onChangeAddressProofHandler = this.onChangeAddressProofHandler.bind(this);
    }


    handleChange(checked: boolean) {
        this.setState({ checked });
    }

    async componentDidMount() {
        document.title = constant.addDelivery + utils.getAppName();

        // const getProfile = await API.getProfile();
        // console.log("getprofile",getProfile);
    }

    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            selectedFile: this.state.selectedFile = event.target.files[0].name
        })
    }


    onChangeProofHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            deliveryidproof: this.state.deliveryidproof = event.target.files[0].name
        })
    }


    onChangeAddressProofHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // console.log("event",event.target.files[0].name);
        this.setState({
            deliveryaddressproof: this.state.deliveryaddressproof = event.target.files[0].name
        })
    }

    validate() {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let mobilenumbererror = "";
        let passworderror = "";
        let selectedFileerror = "";
        let deliveryaddressprooferror = "";
        let deliveryidprooferror = "";


        if (!this.state.firstname) {
            firstnameerror = "please enter firstname";
        }

        if (!this.state.lastname) {
            lastnameerror = "please enter lastname";
        }

        const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (!this.state.email) {
            emailerror = "please enter email";
        } else if (!reg.test(this.state.email)) {
            emailerror = "please enter valid email";
        }

        if (!this.state.mobilenumber) {
            mobilenumbererror = "please enter mobile number";
        }

        if (!this.state.password) {
            passworderror = "please enter password";
        }

        if (!this.state.selectedFile) {
            selectedFileerror = "please select file";
        }

        if (!this.state.deliveryaddressproof) {
            deliveryaddressprooferror = "please select address proof file";
        }

        if (!this.state.deliveryidproof) {
            deliveryidprooferror = "please select id proof file";
        }

        if (firstnameerror || lastnameerror || emailerror || mobilenumbererror || passworderror || selectedFileerror || deliveryaddressprooferror || deliveryidprooferror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, mobilenumbererror, passworderror, selectedFileerror, deliveryaddressprooferror, deliveryidprooferror });
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

    async addUser() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                firstnameerror: '',
                lastnameerror: '',
                emailerror: '',
                mobilenumbererror: '',
                passworderror: '',
                selectedFileerror: '',
                deliveryaddressprooferror: '',
                deliveryidprooferror: ''
            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.mobilenumber && this.state.password && this.state.selectedFile && this.state.deliveryidproof && this.state.deliveryaddressproof) {
                const obj : deliveryCreateRequest = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    password: this.state.password,
                    selectedFile: this.state.selectedFile,
                    deliveryidproof: this.state.deliveryidproof,
                    deliveryaddressproof: this.state.deliveryaddressproof,
                }

                const obj1 : deliveryUpdateRequest = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    mobilenumber: this.state.mobilenumber,
                    password: this.state.password,
                    selectedFile: this.state.selectedFile,
                    deliveryidproof: this.state.deliveryidproof,
                    deliveryaddressproof: this.state.deliveryaddressproof,
                }

                // const addDelivery = await API.addDelivery(obj);
                // console.log("addDelivery",addDelivery);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.mobilenumber === obj.mobilenumber && this.state.password === obj.password && this.state.selectedFile === obj.selectedFile) {
                    const msg = "Delivery Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/delivery');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }

    removeIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            selectedFile: this.state.selectedFile = undefined
        })
    }

    removeIdProofIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            deliveryidproof: this.state.deliveryidproof = undefined
        })
    }

    removeAddressProffIcon() {
        // const obj = {
        //     id: this.props.auth.auth_data.id,
        //     image_path: data
        // }
        this.setState({
            deliveryaddressproof: this.state.deliveryaddressproof = undefined
        })
    }

    render() {

        return (
            <>
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add Delivery</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/delivery">
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
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name">First Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="first_name"
                                                        name="firstname"
                                                        className="form-control"
                                                        value={this.state.firstname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your first name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.firstnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name">Last Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="last_name"
                                                        name="lastname"
                                                        className="form-control"
                                                        value={this.state.lastname}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your last name"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.lastnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="email">E-Mail</Label>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className="form-control"
                                                        value={this.state.email}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your email"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.emailerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Mobile Number</Label>
                                                    <Input
                                                        type="text"
                                                        id="mobile_no"
                                                        name="mobilenumber"
                                                        className="form-control"
                                                        value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your mobile number"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.mobilenumbererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    className="form-control"
                                                    value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your password"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.passworderror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>User Image</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeHandler.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.selectedFileerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.deliveryidproof != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.deliveryidproof ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIdProofIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Id Proof Image</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeProofHandler.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.deliveryidprooferror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.selectedFile != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.selectedFile ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeAddressProffIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Address Proof Icon</p>
                                                                    <Label className="imag" for="file-input"><i className="fa fa-upload fa-lg" style={{ color: '#20a8d8' }}></i></Label>
                                                                    <Input
                                                                        id="file-input"
                                                                        type="file"
                                                                        className="form-control"
                                                                        name="file"
                                                                        onChange={this.onChangeAddressProofHandler.bind(this)}
                                                                    />

                                                                </div>
                                                            )
                                                    }
                                                    <div className="text-danger">
                                                        {this.state.deliveryaddressprooferror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addUser}
                                        >
                                            Save
                                        </Button>
                                    </CardBody>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </NavBar>
            </>
        );
    }
}

export default AddDelivery;
