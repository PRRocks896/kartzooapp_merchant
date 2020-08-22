import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import utils from '../../utils';
// import API from '../../service/delivery.service';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    CardTitle,
    Form,
    CustomInput,
    FormGroup,
    Label,
    // Table,
    Row,
} from 'reactstrap';
import './deliverymanagment.css';
import NavBar from '../navbar/navbar';
import { MDBDataTable } from 'mdbreact';
import constant from '../../constant/constant';
const $ = require('jquery');
$.DataTable = require('datatables.net')


class DeliveryManagement extends React.Component<{ history: any }> {

    state = {
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
        this.handleClick = this.handleClick.bind(this);
        this.btnIncrementClick = this.btnIncrementClick.bind(this);
        this.btnDecrementClick = this.btnDecrementClick.bind(this);
        this.editDelivery = this.editDelivery.bind(this);
        this.viewDelivery = this.viewDelivery.bind(this);

    }

    async componentDidMount() {
        document.title = constant.delivery + utils.getAppName();
        $('#dtBasicExample').DataTable({
            "paging": false,
            "info": false
        });
        // $('.dataTables_length').addClass('bs-select');
        this.getUserCountData();
        this.getApplicationPageData();
       
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

    editDelivery() {
        this.props.history.push("/editdelivery");
    }

    viewDelivery() {
        this.props.history.push("/viewdelivery");
    }

    deleteDelivery() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You should be remove delivery!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.value) {
                // var deleteCategory = await API.deleteCategory(id);
                const msg = "Delivery has been deleted";
                utils.showSuccess(msg);
                // this.componentDidMount();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                const msg1 = "Delivery is safe :";
                utils.showError(msg1);
            }
        })
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
      
    }

    handleClick(event:any) {
        const obj = {
            page_no: '' + event.target.id,
            items_per_page: this.state.items_per_page
        }
        // var getUserDataPagination = await API.getUserDataPagination();
        // console.log("getUserDataPagination",getUserDataPagination);
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
                        <a className="page-link" onClick={this.handleClick}>{number}</a>
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
                        <a className="page-link" id={number} onClick={this.handleClick}>{number}</a>
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
                                                    Delivery Management
                                            </CardTitle>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <div className="right">
                                                    <Link to="/add-delivery">
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

                                        <table id="dtBasicExample" className="table table-striped table-bordered table_responsive table-sm" width="100%">
                                            <thead>
                                                <tr>
                                                    <th>FirstName</th>
                                                    <th>LastName</th>
                                                    <th>Email</th>
                                                    <th>PhoneNumber</th>
                                                    <th>Photo</th>
                                                    <th style={{ textAlign: "center" }}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Users</td>
                                                    <td>User-1</td>
                                                    <td>user1@gmail.com</td>
                                                    <td>7878787878</td>
                                                    <td><i className="fa fa-user"></i>Image Photo</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewDelivery}></i>
                                                            <i className="fas fa-edit" onClick={this.editDelivery}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteDelivery}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Users</td>
                                                    <td>User-2</td>
                                                    <td>user2@gmail.com</td>
                                                    <td>7878787878</td>
                                                    <td><i className="fa fa-user"></i>Image Photo</td>
                                                    <td style={{ textAlign: "center" }}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye" onClick={this.viewDelivery}></i>
                                                            <i className="fas fa-edit" onClick={this.editDelivery}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteDelivery}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>

                                        {/* <TableComponent column={constant.userTableColumn}/> */}

                                        {/* <MDBDataTable
                                            // id="dtBasicExample"
                                            striped
                                            bordered
                                            hover
                                            paging={false}
                                            data={data}
                                        />  */}
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
                                                        <Link to="/adduser">
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
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>PhoneNumber</th>
                                                    <th>Address</th>
                                                    <th style={{textAlign:"center"}}>Status</th>
                                                    <th className="action">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>User-1</td>
                                                    <td>user1@gmail.com</td>
                                                    <td>7878787878</td>
                                                    <td>Digital Vichar Technology</td>
                                                    <td style={{textAlign:"center"}}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.edituser}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteuser}></i>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>User-2</td>
                                                    <td>user2@gmail.com</td>
                                                    <td>7878787878</td>
                                                    <td>Digital Vichar Technology</td>
                                                    <td style={{textAlign:"center"}}><i className="fa fa-check"></i></td>
                                                    <td className="action">
                                                        <span className="padding">
                                                            <i className="fa fa-eye"></i>
                                                            <i className="fas fa-edit" onClick={this.edituser}></i>
                                                            <i className="far fa-trash-alt" onClick={this.deleteuser}></i>
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

export default DeliveryManagement;
