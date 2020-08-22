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
    CustomInput,
    Form,
    Row,
} from 'reactstrap';
import './inventoryproduct.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/product.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { Editor } from '@tinymce/tinymce-react';
import { inventoryCreateRequest, inventoryUpdateRequest } from '../../../modelController/productInventoryModel';

class InventoryProduct extends React.Component<{ history: any }> {

    state = {
        productid: '',
        productiderror: '',
        stockqty: '',
        stockqtyerror: ''
    }

    constructor(props: any) {
        super(props);

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addInventoryProduct = this.addInventoryProduct.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }
    async componentDidMount() {
        document.title = constant.inventoryProduct + utils.getAppName();

        // const getProduct = await API.getProduct();
        // console.log("getProduct",getProduct);
    }

    onProductSelect(event:any) {
        this.setState({
            productid:this.state.productid = event.target.value
        })
    }

    validate() {
        let productiderror = "";
        let stockqtyerror = "";

        if (!this.state.productid) {
            productiderror = "please select product";
        }

        if (!this.state.stockqty) {
            stockqtyerror = "please enter qty";
        }

        if (productiderror || stockqtyerror) {
            this.setState({ productiderror, stockqtyerror });
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

    async addInventoryProduct() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                productiderror: '',
                stockqtyerror: ''

            })
            if (this.state.productid && this.state.stockqty) {

                const obj : inventoryCreateRequest = {
                    productid: this.state.productid,
                    stockqty: this.state.stockqty
                }

                const obj1 : inventoryUpdateRequest = {
                    id:'',
                    productid: this.state.productid,
                    stockqty: this.state.stockqty
                }

                // const addProductInventory = await API.addProductInventory(obj);
                // console.log("addProductInventory",addProductInventory);

                if (this.state.productid === obj.productid && this.state.stockqty === obj.stockqty) {
                    const msg = "Product Inventory Added Successfully";
                    utils.showSuccess(msg);
                    // this.props.history.push('/users');
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
                                                <h1>Add Product Inventory</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/list-product-inventory">
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
                                                    <Label htmlFor="Stock Qty">Stock Qty</Label>
                                                    <Input
                                                        type="number"
                                                        id="Stock Qty"
                                                        name="stockqty"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your stock qty"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.stockqtyerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>

                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mt-3 mr-2 custom-button"
                                            onClick={this.addInventoryProduct}
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

export default InventoryProduct;
