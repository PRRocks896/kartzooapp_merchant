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
    Form,
    CustomInput,
    Label,
    Row,
} from 'reactstrap';
import './order.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/order.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { orderCreateRequest, orderUpdateRequest } from '../../../modelController/orderModel';

class OrderManagement extends React.Component<{ history: any }> {

    state = {
        orderdate: '',
        orderdateerror: '',
        userid: '',
        useriderror: '',
        orderno: '',
        ordernoerror: '',
        paymentmethod: '',
        paymentmethoderror: '',
        paymentstatus: '',
        paymentstatuserror: '',
        orderstatus: '',
        orderstatuserror: '',
        totalqty: '',
        totalqtyerror: '',
        totalamount: '',
        totalamounterror: '',
        discountamount: '',
        discountamounterror: '',
        taxamount: '',
        taxamounterror: '',
        deliveryamount: '',
        deliveryamounterror: '',
        couponid: '',
        couponiderror: '',
        couponamount: '',
        couponamounterror: ''

    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onCouponSelect = this.onCouponSelect.bind(this);
        this.addOrder = this.addOrder.bind(this);

    }


    handleChange(checked: boolean) {
        this.setState({ checked });
    }

    async componentDidMount() {
        document.title = constant.addOrder + utils.getAppName();

        // const getUser = await API.getUser();
        // console.log("getUser",getUser);

        // const getCoupon = await API.getCoupon();
        // console.log("getCoupon",getCoupon);
    }

    onUserSelect(event: any) {
        this.setState({
            userid: this.state.userid = event.target.value
        })
    }

    onCouponSelect(event: any) {
        this.setState({
            couponid: this.state.couponid = event.target.value
        })
    }


    validate() {
        let orderdateerror = "";
        let useriderror = "";
        let ordernoerror = "";
        let paymentstatuserror = "";
        let totalqtyerror = "";
        let totalamounterror = "";
        let discountamounterror = "";
        let taxamounterror = "";
        let deliveryamounterror = "";
        let couponiderror = "";
        let couponamounterror = "";
        let orderstatuserror = "";
        let paymentmethoderror = "";


        if (!this.state.orderdate) {
            orderdateerror = "please select order date";
        }

        if (!this.state.userid) {
            useriderror = "please select user";
        }

        if (!this.state.orderstatus) {
            orderstatuserror = "please enter order status";
        }

        if (!this.state.paymentmethod) {
            paymentmethoderror = "please enter payment method";
        }

        if (!this.state.orderno) {
            ordernoerror = "please enter order number";
        }

        if (!this.state.paymentstatus) {
            paymentstatuserror = "please enter payment status";
        }

        if (!this.state.totalqty) {
            totalqtyerror = "please enter total qty";
        }

        if (!this.state.totalamount) {
            totalamounterror = "please enter total amount";
        }

        if (!this.state.discountamount) {
            discountamounterror = "please enter discount amount";
        }

        if (!this.state.taxamount) {
            taxamounterror = "please enter tax amount";
        }

        if (!this.state.deliveryamount) {
            deliveryamounterror = "please enter delivery amount";
        }

        if (!this.state.couponid) {
            couponiderror = "please select coupon";
        }

        if (!this.state.couponamount) {
            couponamounterror = "please enter coupon amount";
        }

        if (orderdateerror || useriderror || ordernoerror || orderstatuserror || paymentmethoderror || paymentstatuserror || totalqtyerror || totalamounterror || discountamounterror || taxamounterror || deliveryamounterror || couponiderror || couponamounterror) {
            this.setState({ orderdateerror, useriderror, ordernoerror, orderstatuserror, paymentmethoderror, paymentstatuserror, totalqtyerror, totalamounterror, discountamounterror, taxamounterror, deliveryamounterror, couponiderror, couponamounterror });
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

    async addOrder() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                orderdateerror: '',
                useriderror: '',
                ordernoerror: '',
                orderstatuserror: '',
                paymentmethoderror: '',
                paymentstatuserror: '',
                totalqtyerror: '',
                totalamounterror: '',
                discountamounterror: '',
                taxamounterror:'',
                deliveryamounterror:'',
                couponiderror:'',
                couponamounterror:''

            })
            if (this.state.orderdate && this.state.userid && this.state.orderno && this.state.paymentmethod && this.state.paymentstatus && this.state.orderstatus && this.state.totalqty && this.state.totalamount
                && this.state.discountamount && this.state.taxamount && this.state.deliveryamount && this.state.couponid && this.state.couponamount) {
                const obj : orderCreateRequest = {
                    orderdate: this.state.orderdate,
                    userid: this.state.userid,
                    orderno: this.state.orderno,
                    paymentmethod: this.state.paymentmethod,
                    paymentstatus: this.state.paymentstatus,
                    orderstatus: this.state.orderstatus,
                    totalqty: this.state.totalqty,
                    totalamount: this.state.totalamount,
                    discountamount: this.state.discountamount,
                    taxamount: this.state.taxamount,
                    deliveryamount: this.state.deliveryamount,
                    couponid: this.state.couponid,
                    couponamount: this.state.couponamount
                }

                const obj1 : orderUpdateRequest = {
                    id:'',
                    orderdate: this.state.orderdate,
                    userid: this.state.userid,
                    orderno: this.state.orderno,
                    paymentmethod: this.state.paymentmethod,
                    paymentstatus: this.state.paymentstatus,
                    orderstatus: this.state.orderstatus,
                    totalqty: this.state.totalqty,
                    totalamount: this.state.totalamount,
                    discountamount: this.state.discountamount,
                    taxamount: this.state.taxamount,
                    deliveryamount: this.state.deliveryamount,
                    couponid: this.state.couponid,
                    couponamount: this.state.couponamount
                }

                // const addOrder = await API.addOrder(obj);
                // console.log("addOrder",addOrder);

                 // const editOrder = await API.editOrder(obj);
                // console.log("editOrder",editOrder);

                if (this.state.orderdate === obj.orderdate && this.state.userid === obj.userid) {
                    const msg = "Order Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/list-order');
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
                                                <h1>Add Order</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/list-order">
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
                                                            {this.state.useriderror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select Coupon</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="user"
                                                            onChange={this.onCouponSelect}
                                                        >
                                                            <option value="">Select Coupon</option>
                                                            <option value="Coupon-1">Coupon-1</option>
                                                            <option value="Coupon-2">Coupon-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.couponiderror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="start_date">Order Date</Label>
                                                <Input
                                                    type="date"
                                                    id="start_date"
                                                    name="orderdate"
                                                    className="form-control"
                                                    onChange={e => this.setState({ orderdate: e.target.value })}
                                                    placeholder="Select your order date"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.orderdateerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Order">Order Number</Label>
                                                    <Input
                                                        type="number"
                                                        id="Order"
                                                        name="orderno"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your order number"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.ordernoerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Status">Order Status</Label>
                                                <Input
                                                    type="number"
                                                    id="Status"
                                                    name="orderstatus"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your order status"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.orderstatuserror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Payment">Payment Status</Label>
                                                <Input
                                                    type="number"
                                                    id="Payment"
                                                    name="paymentstatus"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your payment status"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.paymentstatuserror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Qty">Total Qty</Label>
                                                <Input
                                                    type="number"
                                                    id="Qty"
                                                    name="totalqty"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your total qty"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.totalqtyerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Amount">Total Amount</Label>
                                                <Input
                                                    type="number"
                                                    id="Amount"
                                                    name="totalamount"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your total amount"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.totalamounterror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Discount">Discount Amount</Label>
                                                <Input
                                                    type="number"
                                                    id="Discount"
                                                    name="discountamount"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your discount amount"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.discountamounterror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Tax">Tax Amount</Label>
                                                <Input
                                                    type="number"
                                                    id="Tax"
                                                    name="taxamount"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your tax amount"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.taxamounterror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Delivery">Delivery Amount</Label>
                                                <Input
                                                    type="number"
                                                    id="Delivery"
                                                    name="deliveryamount"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your delivery amount"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.deliveryamounterror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Coupon">Coupon Amount</Label>
                                                <Input
                                                    type="number"
                                                    id="Coupon"
                                                    name="couponamount"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your coupon amount"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.couponamounterror}
                                                </div>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Method">Payment Method</Label>
                                                <Input
                                                    type="number"
                                                    id="Method"
                                                    name="paymentmethod"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your payment method"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.paymentmethoderror}
                                                </div>
                                            </Col>
                                        </Row>

                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                        onClick={this.addOrder}
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

export default OrderManagement;
