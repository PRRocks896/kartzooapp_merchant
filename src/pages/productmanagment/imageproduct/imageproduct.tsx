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
import './imageproduct.css';

import API from '../../../service/product.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { Editor } from '@tinymce/tinymce-react';
import ImageUploading from "react-images-uploading";
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import { imageCreateRequest, imageUpdateRequest } from '../../../modelController/productImageModel';

class ImageProduct extends React.Component<{ history: any }> {

    state = {
        productid: '',
        productiderror: '',
        imagename: undefined,
        imagenameerror: '',
        altertag: '',
        altertagerror: '',
        sortorder: '',
        sortordererror: ''
    }

    constructor(props: any) {
        super(props);

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.removeIcon = this.removeIcon.bind(this);
        this.addImageProduct = this.addImageProduct.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
    }
    async componentDidMount() {
        document.title = constant.imageProduct + utils.getAppName();

        // const getProduct = await API.getProduct();
        // // console.log("getProduct",getProduct);
    }

    validate() {
        let productiderror = "";
        let imagenameerror = "";
        let altertagerror = "";
        let sortordererror = "";


        if (!this.state.productid) {
            productiderror = "please select product";
        }

        if (!this.state.imagename) {
            imagenameerror = "please select image";
        }

        if (!this.state.altertag) {
            altertagerror = "please enter alter tag";
        }

        if (!this.state.sortorder) {
            sortordererror = "please enter sort order";
        }

        if (productiderror || imagenameerror || altertagerror || sortordererror) {
            this.setState({ productiderror, imagenameerror, altertagerror, sortordererror });
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

    async addImageProduct() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                productiderror: '',
                imagenameerror: '',
                altertagerror: '',
                sortordererror: ''

            })
            if (this.state.productid && this.state.imagename && this.state.altertag && this.state.sortorder) {

                const obj: imageCreateRequest = {
                    productid: this.state.productid,
                    imagename: this.state.imagename,
                    altertag: this.state.altertag,
                    sortorder: this.state.sortorder
                }

                const obj1: imageUpdateRequest = {
                    id: '',
                    productid: this.state.productid,
                    imagename: this.state.imagename,
                    altertag: this.state.altertag,
                    sortorder: this.state.sortorder
                }

                // const addProductImage = await API.addProductImage(obj);
                // // console.log("addProductImage",addProductImage);

                // const editProductImage = await API.editProductImage(obj);
                // // console.log("editProductImage",editProductImage);

                if (this.state.productid === obj.productid && this.state.imagename === obj.imagename && this.state.altertag === obj.altertag && this.state.sortorder === obj.sortorder) {
                    const msg = "Product Image Added Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/list-product-image');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
    }

    onProductSelect(event: any) {
        this.setState({
            productid: this.state.productid = event.target.value
        })
    }

    onChangeHandler(event: any) {
        // let data = new FormData();
        // data.append('file_name', event.target.files[0]);
        // // console.log("event",event.target.files[0].name);
        this.setState({
            imagename: this.state.imagename = event.target.files[0].name
        })
    }

    removeIcon() {
        this.setState({
            imagename: this.state.imagename = undefined
        })
    }

    onChange = (imageList: any) => {
        // data for submit
        // console.log("imagelist", imageList);
    };

    render() {
        const maxNumber = 10;
        const maxMbFileSize = 5 * 1024 * 1024;
        return (
            <>
               
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Add Product Image</h1>

                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/list-product-image">
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
                                            {/* <ImageUploading
                                                onChange={this.onChange}
                                                maxNumber={maxNumber}
                                                multiple
                                                maxFileSize={maxMbFileSize}
                                                acceptType={["jpg", "gif", "png"]}
                                            >
                                                {({ imageList, onImageUpload, onImageRemoveAll }) => (
                                                    // write your building UI
                                                    <div>
                                                        <button onClick={onImageUpload}>Upload images</button>
                                                        <button onClick={onImageRemoveAll}>Remove all images</button>

                                                        {imageList.map((image) => (
                                                            <div key={image.key}>
                                                                <img src={image.dataURL} />
                                                                <button onClick={image.onUpdate}>Update</button>
                                                                <button onClick={image.onRemove}>Remove</button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                            </ImageUploading> */}
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
                                                    <Label htmlFor="Sort Order">Sort Order</Label>
                                                    <Input
                                                        type="number"
                                                        id="Sort Order"
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
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup className="img-upload">
                                                    {
                                                        this.state.imagename != null ? (
                                                            <div className="img-size">
                                                                {
                                                                    this.state.imagename ? (
                                                                        <div>
                                                                            <img className="picture" src={require('../../dashboard/assets/images/login-img.png')} />
                                                                            <i className="fa fa-times cursor" onClick={() => this.removeIcon()}></i>
                                                                        </div>
                                                                    ) : (null)
                                                                }
                                                            </div>
                                                        ) : (
                                                                <div className="">
                                                                    <p style={{ fontSize: '16px' }}>Product Image</p>
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
                                                        {this.state.imagenameerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                                <FormGroup>
                                                    <Label htmlFor="Alter Tag">Alter Tag</Label>
                                                    <Input
                                                        type="textarea"
                                                        id="Alter Tag"
                                                        name="altertag"
                                                        className="form-control"
                                                        // value={this.state.mobilenumber}
                                                        onChange={this.handleChangeEvent}
                                                        placeholder="Enter your alter tag"
                                                    />
                                                    <div className="mb-4 text-danger">
                                                        {this.state.altertagerror}
                                                    </div>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mt-3 mr-2 custom-button"
                                            onClick={this.addImageProduct}
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

export default ImageProduct;
