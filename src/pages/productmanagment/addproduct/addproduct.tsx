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
import './addproduct.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/merchant.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { Editor } from '@tinymce/tinymce-react';
import { productCreateRequest, productUpdateRequest } from '../../../modelController/productModel';


class AddProduct extends React.Component<{ history: any }> {

    state = {
        merchantid: '',
        merchantiderror: '',
        maincategoryid: '',
        maincategoryiderror: '',
        subcategoryid: '',
        subcategoryiderror: '',
        productname: '',
        productnameerror: '',
        productdescription: '',
        productdescriptionerror: '',
        price: '',
        priceerror: '',
        discountprice: '',
        discountpriceerror: '',
        isFeatured: false,
        metatitle: '',
        metatitleerror: '',
        metadiscription: '',
        metadiscriptionerror: '',
        metakeyword: '',
        metakeyworderror: '',
        sortorder: '',
        sortordererror: ''

    }

    constructor(props: any) {
        super(props);
        this.onMainCategorySelect = this.onMainCategorySelect.bind(this);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubCategorySelect = this.onSubCategorySelect.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.onMerchantSelect = this.onMerchantSelect.bind(this);
        this.handleMainChange = this.handleMainChange.bind(this);
        this.handleDescChange = this.handleDescChange.bind(this);
        this.handleKeywordChange = this.handleKeywordChange.bind(this);

    }


    handleChange(checked: boolean) {
        this.setState({ isFeatured: this.state.isFeatured = checked });
    }

    async componentDidMount() {
        document.title = constant.addProduct + utils.getAppName();

        // const getAllCategory = await CategoryAPI.getAllCategory();
        // console.log("getAllCategory",getAllCategory);
    }

    onMerchantSelect(event: any) {
        this.setState({
            merchantid: this.state.merchantid = event.target.value
        })
    }

    onMainCategorySelect(event: any) {
        this.setState({
            maincategoryid: this.state.maincategoryid = event.target.value
        })
    }

    onSubCategorySelect(event: any) {
        this.setState({
            subcategoryid: this.state.subcategoryid = event.target.value
        })
    }



    handleMainChange = (content: any, editor: any) => {
        console.log('handleEditorChange Content was updated:', content);
        this.setState({
            productdescription: this.state.productdescription = content
        })

    }

    handleDescChange = (content: any, editor: any) => {
        console.log('handleDescChange Content was updated:', content);
        this.setState({
            metadiscription: this.state.metadiscription = content
        })

    }

    handleKeywordChange = (content: any, editor: any) => {
        console.log('handleKeywordChange Content was updated:', content);
        this.setState({
            metakeyword: this.state.metakeyword = content
        })

    }


    validate() {
        let merchantiderror = "";
        let maincategoryiderror = "";
        let subcategoryiderror = "";
        let productnameerror = "";
        let productdescriptionerror = "";
        let priceerror = "";
        let discountpriceerror = "";
        let metatitleerror = "";
        let metadiscriptionerror = "";
        let metakeyworderror = "";
        let sortordererror = "";

        if (!this.state.merchantid) {
            merchantiderror = "please select merchant";
        }

        if (!this.state.maincategoryid) {
            maincategoryiderror = "please select main category";
        }

        if (!this.state.subcategoryid) {
            subcategoryiderror = "please select sub category";
        }

        if (!this.state.productname) {
            productnameerror = "please enter product name";
        }

        if (!this.state.productdescription) {
            productdescriptionerror = "please enter product description";
        }

        if (!this.state.price) {
            priceerror = "please enter price";
        }

        if (!this.state.discountprice) {
            discountpriceerror = "please enter discount price";
        }

        if (!this.state.metatitle) {
            metatitleerror = "please enter meta title";
        }

        if (!this.state.metadiscription) {
            metadiscriptionerror = "please enter meta description";
        }

        if (!this.state.metakeyword) {
            metakeyworderror = "please enter meta keyword";
        }

        if (!this.state.sortorder) {
            sortordererror = "please enter sort order";
        }

        if (merchantiderror || maincategoryiderror || subcategoryiderror || productnameerror || productdescriptionerror || priceerror || discountpriceerror || metatitleerror || metadiscriptionerror || metakeyworderror || sortordererror) {
            this.setState({ merchantiderror, maincategoryiderror, subcategoryiderror, productnameerror, productdescriptionerror, priceerror, discountpriceerror, metatitleerror, metadiscriptionerror, metakeyworderror, sortordererror });
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

    async addProduct() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                merchantiderror: '',
                maincategoryiderror: '',
                subcategoryiderror: '',
                productnameerror: '',
                productdescriptionerror: '',
                priceerror: '',
                discountpriceerror: '',
                metatitleerror: '',
                metadiscriptionerror: '',
                metakeyworderror: '',
                sortordererror: ''

            })
            if (this.state.merchantid && this.state.maincategoryid && this.state.subcategoryid && this.state.productdescription && this.state.price && this.state.discountprice && this.state.metadiscription && this.state.metatitle && this.state.metakeyword && this.state.sortorder) {

                const obj : productCreateRequest = {
                    merchantid: this.state.merchantid,
                    maincategoryid: this.state.maincategoryid,
                    subcategoryid: this.state.subcategoryid,
                    productname: this.state.productname,
                    productdescription: this.state.productdescription,
                    price: this.state.price,
                    discountprice: this.state.discountprice,
                    metadiscription: this.state.metadiscription,
                    metatitle: this.state.metatitle,
                    metakeyword: this.state.metakeyword,
                    sortorder: this.state.sortorder
                }

                const obj1 : productUpdateRequest = {
                    id:'',
                    merchantid: this.state.merchantid,
                    maincategoryid: this.state.maincategoryid,
                    subcategoryid: this.state.subcategoryid,
                    productname: this.state.productname,
                    productdescription: this.state.productdescription,
                    price: this.state.price,
                    discountprice: this.state.discountprice,
                    metadiscription: this.state.metadiscription,
                    metatitle: this.state.metatitle,
                    metakeyword: this.state.metakeyword,
                    sortorder: this.state.sortorder
                }


                // const addProduct = await API.addProduct(obj);
                // console.log("addProduct",addProduct);

                
                // const editProduct = await API.editProduct(obj);
                // console.log("editProduct",editProduct);

                if (this.state.merchantid === obj.merchantid && this.state.maincategoryid === obj.maincategoryid && this.state.subcategoryid === obj.subcategoryid && this.state.productname === obj.productname
                    && this.state.productdescription === obj.productdescription && this.state.price === obj.price && this.state.discountprice === obj.discountprice && this.state.metadiscription === obj.metadiscription
                    && this.state.metatitle === obj.metatitle && this.state.metakeyword === obj.metakeyword && this.state.sortorder === obj.sortorder) {
                    const msg = "Product Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/product');
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
                                                <h1>Add Product</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/list-product">
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
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select Merchant</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="merchantid"
                                                            onChange={this.onMerchantSelect}
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
                                                        <Label for="exampleCustomSelect">Select MainCategory</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="maincategoryid"
                                                            onChange={this.onMainCategorySelect}
                                                        >
                                                            <option value="">Select MainCategory</option>
                                                            <option value="MainCategory-1">MainCategory-1</option>
                                                            <option value="MainCategory-2">MainCategory-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.maincategoryiderror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <Form>
                                                    <FormGroup>
                                                        <Label for="exampleCustomSelect">Select SubCategory</Label>
                                                        <CustomInput
                                                            type="select"
                                                            id="exampleCustomSelect"
                                                            name="subcategoryid"
                                                            onChange={this.onSubCategorySelect}
                                                        >
                                                            <option value="">Select SubCategory</option>
                                                            <option value="SubCategory-1">SubCategory-1</option>
                                                            <option value="SubCategory-2">SubCategory-2</option>
                                                            {/* {
                                                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                                        ) : ''
                                                                    } */}
                                                        </CustomInput>
                                                        <div className="mb-4 text-danger">
                                                            {this.state.subcategoryiderror}
                                                        </div>
                                                    </FormGroup>
                                                </Form>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Product Name">Product Name</Label>
                                                    <Input
                                                        type="text"
                                                        id="Product Name"
                                                        name="productname"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your product name"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.productnameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Product Price">Product Price</Label>
                                                    <Input
                                                        type="number"
                                                        id="Product Price"
                                                        name="price"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your product price"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.priceerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="Product Discount">Product Discount Price</Label>
                                                    <Input
                                                        type="number"
                                                        id="Product Discount"
                                                        name="discountprice"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your product discount price"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.discountpriceerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="metatitle">Meta Title</Label>
                                                    <Input
                                                        type="text"
                                                        id="metatitle"
                                                        name="metatitle"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your meta title"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.metatitleerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <FormGroup>
                                                    <Label htmlFor="sortorder">Sort Order</Label>
                                                    <Input
                                                        type="number"
                                                        id="sortorder"
                                                        name="sortorder"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your sort order"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.sortordererror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <label>
                                                    <span>IsFeatured</span>
                                                    <br />
                                                    <div style={{ marginTop: '10px' }}>
                                                        <Switch
                                                            onChange={this.handleChange}
                                                            checked={this.state.isFeatured}
                                                        />
                                                    </div>
                                                </label>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                                <div>
                                                    <p style={{ fontSize: '16px' }}>Product Description</p>
                                                <input id="my-file" type="file" name="my-file" style={{display:'none'}}/>
                                                    <Editor
                                                        initialValue="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                            height: 200,
                                                            menubar: false,
                                                            images_upload_credentials: true,
                                                            plugins: [
                                                                'advlist autolink lists link image code imagetools charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic backcolor | image | code | media |\
                                                    alignleft aligncenter alignright alignjustify | \
                                                    bullist numlist outdent indent | removeformat | help',
                                                            images_upload_handler: function (blobInfo: any, success: any, failure: any) {
                                                                setTimeout(function (blobInfo) {
                                                                    /* no matter what you upload, we will turn it into TinyMCE logo :)*/
                                                                    success();
                                                                }, 2000);
                                                            },
                                                            file_picker_callback: function (callback:any, value:any, meta:any) {
                                                                if (meta.filetype == 'image') {
                                                                    var input:any = document.getElementById('my-file');
                                                                    input.click();
                                                                    input.onchange = function () {
                                                                        var file = input.files[0];
                                                                        var reader = new FileReader();
                                                                        reader.onload = function (e:any) {
                                                                            callback(e.target.result, {
                                                                                alt: file.name
                                                                            });
                                                                        };
                                                                        reader.readAsDataURL(file);
                                                                    };
                                                                }
                                                            }

                                                        }
                                                        }
                                                        onEditorChange={this.handleMainChange}
                                                    />
                                                </div>
                                                <div className="text-danger">
                                                    {this.state.productdescriptionerror}
                                                </div>
                                            </Col>
                                            <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                            <FormGroup>
                                                    <Label htmlFor="Meta Description">Meta Description</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="Meta Description"
                                                        rows={8}
                                                        name="metadiscription"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your meta discription"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.metadiscriptionerror}
                                                    </div>
                                                </FormGroup>
                                                </Col>
                                                <Col xs="12" sm="12" md="4" lg="4" xl="4">
                                            <FormGroup>
                                                    <Label htmlFor="Meta keyword">Meta keyword</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="Meta keyword"
                                                        rows={8}
                                                        name="metakeyword"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your meta keyword"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.metakeyworderror}
                                                    </div>
                                                </FormGroup>
                                                </Col>
                                        </Row>

                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mt-3 mr-2 custom-button"
                                            onClick={this.addProduct}
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

export default AddProduct;
