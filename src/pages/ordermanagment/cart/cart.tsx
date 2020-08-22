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
import './cart.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/order.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class OrderCartManagement extends React.Component<{ history: any }> {

    state = {
    userid:'',
    useriderror:'',
    productid:'',
    productiderror:'',
    quantity:'',
    quantityerror:'',
    sellingprice:'',
    sellingpriceerror:'',
    discountapplied:'',
    discountappliederror:''

    }

    constructor(props: any) {
        super(props);
        // this.Profile = this.Profile.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addOrderCart = this.addOrderCart.bind(this);
        this.onUserSelect = this.onUserSelect.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
       
    }

    onUserSelect(event: any) {
        this.setState({
            userid: this.state.userid = event.target.value
        })
    }

    onProductSelect(event: any) {
        this.setState({
            productid: this.state.productid = event.target.value
        })
    }


    async componentDidMount() {
        document.title = constant.addCartOrder + utils.getAppName();

        // const getUser = await API.getUser();
        // console.log("getUser",getUser);

         // const getProduct = await API.getProduct();
        // console.log("getProduct",getProduct);
    }

   
    validate() {
        let useriderror = "";
        let productiderror = "";
        let quantityerror = "";
        let sellingpriceerror = "";
        let discountappliederror = "";

        if (!this.state.userid) {
            useriderror = "please select user";
        }

        if (!this.state.productid) {
            productiderror = "please select product";
        }


        if (!this.state.quantity) {
            quantityerror = "please enter quantity";
        }

        if (!this.state.sellingprice) {
            sellingpriceerror = "please enter selling price";
        }

        if (!this.state.discountapplied) {
            discountappliederror = "please enter discount applied";
        }

        if (useriderror || productiderror || quantityerror || sellingpriceerror || discountappliederror) {
            this.setState({ useriderror, productiderror, quantityerror, sellingpriceerror, discountappliederror});
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

    async addOrderCart() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                useriderror: '',
                productiderror: '',
                quantityerror: '',
                sellingpriceerror: '',
                discountappliederror: ''
            })
            if (this.state.userid && this.state.productid && this.state.quantity && this.state.sellingprice && this.state.discountapplied) {
                const obj = {
                    userid: this.state.userid,
                    productid: this.state.productid,
                    quantity: this.state.quantity,
                    sellingprice: this.state.sellingprice,
                    discountapplied: this.state.discountapplied
                }

                // const addOrderCart = await API.addOrderCart(obj);
                // console.log("addOrderCart",addOrderCart);

                if (this.state.userid === obj.userid && this.state.productid === obj.productid && this.state.quantity === obj.quantity && this.state.sellingprice === obj.sellingprice && this.state.discountapplied === obj.discountapplied) {
                    const msg = "Cart Order Added Successfully";
                    utils.showSuccess(msg);
                    // this.props.history.push('/delivery');
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
                                                <h1>Add Order Cart</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
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
                                            </Col> */}
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
                                                            name="userid"
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
                                                        <Label for="exampleCustomSelect">Select Product</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="productid"
                                                            onChange={this.onProductSelect}
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
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="Quantity">Quantity</Label>
                                                    <Input
                                                        type="number"
                                                        id="Quantity"
                                                        name="quantity"
                                                        className="form-control"
                                                        // value={this.state.email}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your quantity"
                                                        required
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.quantityerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="mobile_no">Selling Price</Label>
                                                    <Input
                                                        type="number"
                                                        id="Selling"
                                                        name="sellingprice"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your selling price"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.sellingpriceerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <Label htmlFor="Discount">Discount Applied</Label>
                                                <Input
                                                    type="number"
                                                    id="Discount"
                                                    name="discountapplied"
                                                    className="form-control"
                                                    // value={this.state.password}
                                                    onChange={this.handleChangeEvent}
                                                    placeholder="Enter your discount applied"
                                                />
                                                <div className="mb-4 text-danger">
                                                    {this.state.discountappliederror}
                                                </div>
                                            </Col>
                                           
                                      </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mr-2 custom-button"
                                            onClick={this.addOrderCart}
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

export default OrderCartManagement;
