import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Form,
    CustomInput,
    Input,
    Col,
    FormGroup,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/merchant.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import Merchant from '../merchant/merchant';
import { reviewCreateRequest, reviewUpdateRequest } from '../../../modelController/merchantReviewModel';

class MerchantReview extends React.Component<{ history: any }> {

    state = {
        merchantid: '',
        merchantiderror: '',
        user: '',
        usererror: '',
        reviewdetails: '',
        reviewdetailserror: '',
        rating: '',
        ratingerror: ''

    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addReviewMerchant = this.addReviewMerchant.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.merchantReviewManagement + utils.getAppName();
    }

    onUserSelect(event: any) {
        this.setState({
            user: this.state.user = event.target.value
        })
    }

    onItemSelect(event: any) {
        this.setState({
            merchantid: this.state.merchantid = event.target.value
        })
    }

    validate() {
        let merchantiderror = "";
        let usererror = "";
        let reviewdetailserror = "";
        let ratingerror = "";

        if (!this.state.merchantid) {
            merchantiderror = "please select merchant";
        }

        if (!this.state.user) {
            usererror = "please select user";
        }

        if (!this.state.reviewdetails) {
            reviewdetailserror = "please enter review detail";
        }

        if (!this.state.rating) {
            ratingerror = "please enter rating";
        }

        if (merchantiderror || usererror || reviewdetailserror || ratingerror) {
            this.setState({ merchantiderror, usererror, reviewdetailserror, ratingerror });
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

    async addReviewMerchant() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                merchantiderror : '',
                usererror: '',
                reviewdetailserror: '',
                ratingerror:''
            })
            if (this.state.merchantid && this.state.user && this.state.reviewdetails && this.state.rating) {
                const obj : reviewCreateRequest = {
                    merchantid: this.state.merchantid,
                    user: this.state.user,
                    reviewdetails: this.state.reviewdetails,
                    rating: this.state.rating
                }

                const obj1 : reviewUpdateRequest = {
                    id:'',
                    merchantid: this.state.merchantid,
                    user: this.state.user,
                    reviewdetails: this.state.reviewdetails,
                    rating: this.state.rating
                }


                // const addMerchantReview = await API.addMerchantReview(obj);
                // console.log("addMerchantReview",addMerchantReview);

                if (this.state.merchantid === obj.merchantid && this.state.user === obj.user && this.state.reviewdetails === obj.reviewdetails && this.state.rating === obj.rating) {
                    const msg = "Merchant Review Added Successfully";
                    utils.showSuccess(msg);
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
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Merchant Review Management</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/category">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                    </Button>
                                                </Link>
                                            </Col> */}
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select Merchant</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="merchantid"
                                                            onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select Merchant</option>
                                                            <option value="Merchant-1">Merchant-1</option>
                                                            <option value="Merchant-2">Merchant-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.merchantiderror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select User</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="user"
                                                            onChange={this.onUserSelect}
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
                                                            {this.state.usererror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Rating">Rating</Label>
                                                    <Input
                                                        type="number"
                                                        id="Rating"
                                                        name="rating"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your rating"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.ratingerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                                <FormGroup>
                                                    <Label htmlFor="Review Details">Review Details</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="Review Details"
                                                        name="reviewdetails"
                                                        className="form-control"
                                                        // value={this.state.categoryname}
                                                        onChange={this.handleChangeEvent}

                                                        placeholder="Enter your review details"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.reviewdetailserror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addReviewMerchant}
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

export default MerchantReview;
