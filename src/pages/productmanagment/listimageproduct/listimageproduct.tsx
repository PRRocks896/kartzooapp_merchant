import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import utils from '../../../utils';
import { MDBDataTable } from 'mdbreact';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Table,
    Input,
    Col,
    FormGroup,
    CustomInput,
    Label,
    Row,
} from 'reactstrap';
// import './adduser.css';
import NavBar from '../../navbar/navbar';
import API from '../../../service/product.service';
import Switch from "react-switch";
import constant from '../../../constant/constant';
import { imageListRequest } from '../../../modelController/productImageModel';
const $ = require('jquery');
$.DataTable = require('datatables.net')

class ListProductImage extends React.Component<{ history: any }> {

    state = {
        selectedFile: null,
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
        count: 10,
        currentPage: 1,
        items_per_page: 2,
        perpage: 2,
        paginationdata: '',
        isFetch: false,
        data: '',
        allRecords: '',
        upperPageBound: 3,
        lowerPageBound: 0,
        pageBound: 3,
        isPrevBtnActive: 'disabled',
        isNextBtnActive: '',
        onClickPage: 1,
        activePage: 15
    }

    constructor(props: any) {
        super(props);
        this.deleteProductImage = this.deleteProductImage.bind(this);
        this.editProductImage = this.editProductImage.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.viewProductImage = this.viewProductImage.bind(this);
    }

    async componentDidMount() {
        document.title = constant.listImageProduct + utils.getAppName();
        $('#dtBasicExample').DataTable({
            "paging": false,
            "info": false
        });
        this.getUserCountData();
        this.getApplicationPageData();
    }

    async getUserCountData() {

        // var getuserCount = await API.getUserCount();
        // console.log("getUsercount",getuserCount);
      
    }

    async getApplicationPageData() {
        // const obj = {
        //     page_no: "1",
        //     items_per_page: this.state.items_per_page
        // }

        // var getUserDataPagination = await API.getUserDataPagination();
        // console.log("getUserDataPagination",getUserDataPagination);

        // var getUserDataPagination : imageListRequest = [];
      
    }

    btnIncrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound + this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound + this.state.pageBound });
        let listid = this.state.upperPageBound + 1;
        this.setState({ currentPage: listid });
    }

    btnDecrementClick() {
        this.setState({ upperPageBound: this.state.upperPageBound - this.state.pageBound });
        this.setState({ lowerPageBound: this.state.lowerPageBound - this.state.pageBound });
        let listid = this.state.upperPageBound - this.state.pageBound;
        this.setState({ currentPage: listid });
    }

    editProductImage() {
        this.props.history.push('/edit-product-image');
    }

    viewProductImage() {
        this.props.history.push('/view-product-image');
    }

    deleteProductImage() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You should be remove image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.value) {
                // var deleteImageProduct = await API.deleteImageProduct(id);
                const msg = "Your Image has been deleted";
                utils.showSuccess(msg);
                // this.componentDidMount();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                const msg1 = "Image is safe :";
                utils.showError(msg1);
            }
        })
    }

    render() {
        var pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.count / this.state.items_per_page); i++) {
            pageNumbers.push(i);
        }
        var renderPageNumbers = pageNumbers.map((number: any) => {
            if (number === 1 && this.state.currentPage === 1) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link">{number}</a>
                    </li>
                );
            }
            else if ((number < this.state.upperPageBound + 1) && number > this.state.lowerPageBound) {
                return (
                    <li
                        key={number}
                        id={number}
                        className={this.state.currentPage === number ? 'active' : 'page-item'}
                    >
                        <a className="page-link" id={number}>{number}</a>
                    </li>
                )
            }
        });

        let pageIncrementBtn = null;
        if (pageNumbers.length > this.state.upperPageBound) {
            pageIncrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnIncrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        let pageDecrementBtn = null;
        if (this.state.lowerPageBound >= 1) {
            pageDecrementBtn =
                <li
                    className='page-item'
                >
                    <a
                        className='page-link'
                        onClick={this.btnDecrementClick}
                    >
                        &hellip;
          </a>
                </li>
        }

        return (
            <>
                <NavBar>
                    <div className="ms-content-wrapper">
                        <div className="row">
                            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                                <Card className="main-card mb-12">
                                    <CardHeader>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <CardTitle
                                                    className="font"
                                                >
                                                    Product Image Management
                                        </CardTitle>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <div className="right">
                                                    <Link to="/product-image">
                                                        <Button
                                                            className="mb-2 mr-2 custom-button"
                                                            color="primary"
                                                        >
                                                            Add
                                                            </Button>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <div className="selectDiv">

                                            <CustomInput
                                                type="select"
                                                id="exampleCustomSelect"
                                                name="customSelect"
                                            // onChange={this.onItemSelect}
                                            >
                                                <option value="">Record per page</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                                <option value="25">25</option>
                                                {/* {
                            this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                <option key={data.id} value={data.id}>{data.name}</option>
                            ) : ''
                        } */}
                                            </CustomInput>
                                        </div>

                                        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>Product Name</th>
                                                    <th>Product Image</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Product-1</td>
                                                    <td>Image-1</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewProductImage}></i>
                                                            <i className="fas fa-edit" onClick={this.editProductImage}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteProductImage}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Product-2</td>
                                                    <td>Image-2</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewProductImage}></i>
                                                            <i className="fas fa-edit" onClick={this.editProductImage}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteProductImage}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>
                                        {/* <MDBDataTable
                                            striped
                                            hover
                                            data={data}
                                        /> */}
                                        {/* <div>
                                            <Row>
                                                <Col md="6">
                                                    <div>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            placeholder="Search"
                                                            aria-label="Search"
                                                        // onKeyUp={this.searchApplicationDataKeyUp}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col md="6">
                                                    <div className="right">
                                                        <Link to="/addcategory">
                                                            <Button
                                                                className="mb-2 mr-2 custom-button"
                                                                color="primary"
                                                            >
                                                                Add
                                                        </Button>
                                                        </Link>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <br /> */}
                                        {/* <Table hover className="mb-0 table_responsive" bordered>
                                            <thead>
                                                <tr>
                                                    <th>Category Name</th>
                                                    <th>Image</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>FOOD</td>
                                                    <td>FOOD Image</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editCategory}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteCategory}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Vegitarain</td>
                                                    <td>Vegitarain Image</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.editCategory}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteCategory}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table> */}
                                        <div>
                                            <ul className="pagination" id="page-numbers">
                                                {pageDecrementBtn}
                                                {renderPageNumbers}
                                                {pageIncrementBtn}
                                            </ul>
                                        </div>
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

export default ListProductImage;
