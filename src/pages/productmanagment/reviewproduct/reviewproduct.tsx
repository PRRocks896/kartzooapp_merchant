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

import API from '../../../service/product.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class ProductReview extends React.Component<{ history: any }> {

    state = {
        productid: '',
        productiderror: '',
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
        this.addReviewProduct = this.addReviewProduct.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
    }

    async componentDidMount() {
        document.title = constant.reviewProduct + utils.getAppName();

          // const getProduct = await API.getProduct();
        // // console.log("getProduct",getProduct);
    }

    onUserSelect(event: any) {
        this.setState({
            user: this.state.user = event.target.value
        })
    }

    onItemSelect(event: any) {
        this.setState({
            productid: this.state.productid = event.target.value
        })
    }

    validate() {
        let productiderror = "";
        let usererror = "";
        let reviewdetailserror = "";
        let ratingerror = "";

        if (!this.state.productid) {
            productiderror = "please select product";
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

        if (productiderror || usererror || reviewdetailserror || ratingerror) {
            this.setState({ productiderror, usererror, reviewdetailserror, ratingerror });
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

    async addReviewProduct() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                productiderror : '',
                usererror: '',
                reviewdetailserror: '',
                ratingerror:''
            })
            if (this.state.productid && this.state.user && this.state.reviewdetails && this.state.rating) {
                const obj = {
                    productid: this.state.productid,
                    user: this.state.user,
                    reviewdetails: this.state.reviewdetails,
                    rating: this.state.rating
                }

                // const addProductReview = await API.addProductReview(obj);
                // // console.log("addProductReview",addProductReview);

                if (this.state.productid === obj.productid && this.state.user === obj.user && this.state.reviewdetails === obj.reviewdetails && this.state.rating === obj.rating) {
                    const msg = "Product Review Added Successfully";
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
               
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Product Review Management</h1>
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
                                                        <Label for="exampleCustomSelect">Select Product</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="productid"
                                                            onChange={this.onItemSelect}
                                                        >
                                                            <option value="">Select Product</option>
                                                            <option value="Product-1">Product-1</option>
                                                            <option value="Product-2">Product-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.productiderror}
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
                                            onClick={this.addReviewProduct}
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

export default ProductReview;
