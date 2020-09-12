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
import './addonmanagment.css';

import API from '../../../service/product.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { Editor } from '@tinymce/tinymce-react';
import { addOnCreateRequest } from '../../../modelController/productAddOnModel';

class AddOnProduct extends React.Component<{ history: any }> {

    state = {
        productid: '',
        productiderror: '',
        addondetail: '',
        addondetailerror: ''
    }

    constructor(props: any) {
        super(props);

        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.addOnProduct = this.addOnProduct.bind(this);
        this.onProductSelect = this.onProductSelect.bind(this);
        this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
    }
    async componentDidMount() {
        document.title = constant.addonProduct + utils.getAppName();

        // const getProduct = await API.getProduct();
        // console.log("getProduct",getProduct);
    }

    onProductSelect(event: any) {
        this.setState({
            productid: this.state.productid = event.target.value
        })
    }

    validate() {
        let productiderror = "";
        let addondetailerror = "";

        if (!this.state.productid) {
            productiderror = "please select product";
        }

        if (!this.state.addondetail) {
            addondetailerror = "please enter details";
        }

        if (productiderror || addondetailerror) {
            this.setState({ productiderror, addondetailerror });
            return false;
        }
        return true;
    };

    handleEditorMainChange = (content: any, editor: any) => {
        console.log('handleEditorMainChange Content was updated:', content);
        this.setState({
            addondetail: this.state.addondetail = content
        })
    }

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    async addOnProduct() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                productiderror: '',
                addondetailerror: ''

            })
            if (this.state.productid && this.state.addondetail) {

                const obj : addOnCreateRequest = {
                    productid: this.state.productid,
                    addondetail: this.state.addondetail
                }

                // const addOnProduct = await API.addOnProduct(obj);
                // console.log("addOnProduct",addOnProduct);

                if (this.state.productid === obj.productid && this.state.addondetail === obj.addondetail) {
                    const msg = "Product details Added Successfully";
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
               
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card>
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                                <h1>Product Details Management</h1>
                                            </Col>
                                            {/* <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{textAlign:"right"}}>
                                                <Link to="/users">
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
                                                <div>
                                                    <p style={{ fontSize: '16px' }}>Add On Details</p>
                                                    <input id="my-file4" type="file" name="my-file4" style={{display:'none'}}/>
                                                    <Editor
                                                        initialValue="<p>This is the initial content of the editor</p>"
                                                        init={{
                                                            height: 200,
                                                            menubar: false,
                                                           
                                                            plugins: [
                                                                'advlist autolink lists link image imagetools charmap print preview anchor',
                                                                'searchreplace visualblocks code fullscreen',
                                                                'insertdatetime media table paste code help wordcount'
                                                            ],
                                                            toolbar:
                                                                'undo redo | formatselect | bold italic backcolor | image |\
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
                                                                    var input:any = document.getElementById('my-file4');
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
                                                        onEditorChange={this.handleEditorMainChange}
                                                    />
                                                </div>
                                                <div className="text-danger">
                                                    {this.state.addondetailerror}
                                                </div>
                                            </Col>
                                        </Row>

                                        <Button
                                            type="button"
                                            size="sm"
                                            color="primary"
                                            className="mb-2 mt-3 mr-2 custom-button"
                                            onClick={this.addOnProduct}
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

export default AddOnProduct;
