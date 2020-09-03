import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
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
} from "reactstrap";
import NavBar from "../../navbar/navbar";
import {StatusAPI, MerchantAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ListBussinessHours extends React.Component<{ history: any }> {
  merchantBusinessHoursState = constant.merchantBussinessPage.state;
  state = {
    count: this.merchantBusinessHoursState.count,
    currentPage: this.merchantBusinessHoursState.currentPage,
    items_per_page: this.merchantBusinessHoursState.items_per_page,
    upperPageBound: this.merchantBusinessHoursState.upperPageBound,
    lowerPageBound: this.merchantBusinessHoursState.lowerPageBound,
    pageBound: this.merchantBusinessHoursState.pageBound,
    onItemSelect: this.merchantBusinessHoursState.onItemSelect,
    businessdata: this.merchantBusinessHoursState.businessdata,
    switchSort: this.merchantBusinessHoursState.switchSort,
    isStatus: this.merchantBusinessHoursState.isStatus
  };

  constructor(props: any) {
    super(props);
    this.editBusinessHours = this.editBusinessHours.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewBusinessHours = this.viewBusinessHours.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.compareByDesc = this.compareByDesc.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.merchantBussinessPage.title.merchantHoursTitle + utils.getAppName();
      utils.dataTable();
    this.getBusinessHoursData();
  }

  async getBusinessHoursData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getBusinessHoursData = await MerchantAPI.getBusinessHoursData(obj);
    console.log("getBusinessHoursData", getBusinessHoursData);

    if (getBusinessHoursData) {
      if (getBusinessHoursData.status === 200) {
        this.setState({
          businessdata: this.state.businessdata = getBusinessHoursData.resultObject.data,
          count: this.state.count = getBusinessHoursData.resultObject.totalcount,
        });
      } else {
        const msg1 = getBusinessHoursData.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
    });
    let listid = this.state.upperPageBound + 1;
    this.setState({ currentPage: listid });
  }

  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
    });
    let listid = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listid });
  }

  editBusinessHours(id: any) {
    this.props.history.push("/edit-merchant-business/" + id);
  }

  viewBusinessHours(id: any) {
    this.props.history.push("/view-merchant-business/" + id);
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getBusinessHoursData('',parseInt(this.state.currentPage),parseInt(this.state.items_per_page));
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

    this.getBusinessHoursData(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getBusinessHoursData(obj.searchText, obj.page, obj.size);
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.businessdata];
    copyTableData.sort(this.compareByDesc(key));
    this.setState({
      businessdata: this.state.businessdata = copyTableData,
    });
  }

  compareByDesc(key: any) {
    if (this.state.switchSort) {
      return function (a: any, b: any) {
        if (a[key] < b[key]) return -1; // check for value if the second value is bigger then first return -1
        if (a[key] > b[key]) return 1; //check for value if the second value is bigger then first return 1
        return 0;
      };
    } else {
      return function (a: any, b: any) {
        if (a[key] > b[key]) return -1;
        if (a[key] < b[key]) return 1;
        return 0;
      };
    }
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj = {
        moduleName: "Coupon",
        id: data.couponId,
        isActive: data.isActive === true ? false : true
       }
       var getStatusChange = await StatusAPI.getStatusChange(obj);
       console.log("getStatusChange", getStatusChange);
       if (getStatusChange.status === 200) {
        const msg = getStatusChange.message;
        utils.showSuccess(msg);
        this.getBusinessHoursData();
      } else {
        const msg1 = getStatusChange.message;
        utils.showError(msg1);
      }
    }
  }

  pagination(pageNumbers: any) {
    var res = pageNumbers.map((number: any) => {
      if (number === 1 && parseInt(this.state.currentPage) === 1) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      } else if (
        number < this.state.upperPageBound + 1 &&
        number > this.state.lowerPageBound
      ) {
        return (
          <li
            key={number}
            id={number}
            className={
              parseInt(this.state.currentPage) === number
                ? "active"
                : "page-item"
            }
          >
            <a className="page-link" id={number} onClick={this.handleClick}>
              {number}
            </a>
          </li>
        );
      }
    });
    return res;
  }

  getTable(merchantdata: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("days")}>
            <th>{constant.merchantBussinessPage.merchantHoursTableColumn.days}</th>
            <th>{constant.merchantBussinessPage.merchantHoursTableColumn.hours}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.businessdata.length > 0 ? (
            <>
              {this.state.businessdata.map((data: any, index: any) => (
                <tr key={index}>
                  <td>{data.days}</td>
                  <td>{data.hours}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isOpen === true ? (
                      <button
                        className="status_active_color"
                        // onClick={() =>
                        //   this.statusChange(
                        //     data,
                        //     "You should be inActive business hours",
                        //     "Yes, inActive it"
                        //   )
                        // }
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="status_inactive_color"
                        // onClick={() =>
                        //   this.statusChange(
                        //     data,
                        //     "You should be Active business hours",
                        //     "Yes, Active it"
                        //   )
                        // }
                      >
                        InActive
                      </button>
                    )}
                  </td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewBusinessHours(data.merchantBusinessHoursId)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editBusinessHours(data.merchantBusinessHoursId)}
                      ></i>
                      {/* <i
                        className="far fa-trash-alt"
                        onClick={() =>
                          this.deleteCategory(data.categoryId)
                        }
                      ></i> */}
                    </span>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
    );
  }

  getPageData(
    pageDecrementBtn: any,
    renderPageNumbers: any,
    pageIncrementBtn: any
  ) {
    return (
      <div className="filter">
        <CustomInput
          type="select"
          id="item"
          className="custom_text_width"
          name="customSelect"
          onChange={this.onItemSelect}
        >
          <option value="10">{constant.recordPerPage.recordperPage}</option>
          <option value={constant.recordPerPage.fifteen}>
            {constant.recordPerPage.fifteen}
          </option>
          <option value={constant.recordPerPage.twenty}>
            {constant.recordPerPage.twenty}
          </option>
          <option value={constant.recordPerPage.thirty}>
            {constant.recordPerPage.thirty}
          </option>
          <option value={constant.recordPerPage.fifty}>
            {constant.recordPerPage.fifty}
          </option>
        </CustomInput>
        <div>
          <ul className="pagination" id="page-numbers">
            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}
          </ul>
        </div>
      </div>
    );
  }

  render() {
    var pageNumbers = [];
    for (let i = 1; i <= Math.ceil(parseInt(this.state.count) / parseInt(this.state.items_per_page)); i++) {
      pageNumbers.push(i);
    }
    var renderPageNumbers = this.pagination(pageNumbers);

    let pageIncrementBtn = null;
    if (pageNumbers.length > this.state.upperPageBound) {
      pageIncrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnIncrementClick}>
            &hellip;
          </a>
        </li>
      );
    }

    let pageDecrementBtn = null;
    if (this.state.lowerPageBound >= 1) {
      pageDecrementBtn = (
        <li className="page-item">
          <a className="page-link" onClick={this.btnDecrementClick}>
            &hellip;
          </a>
        </li>
      );
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
                        <CardTitle className="font">
                          {constant.merchantBussinessPage.title.merchantHoursTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/merchant-business">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                            >
                              {constant.button.add}
                            </Button>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <div className="search_right">
                      <input
                        className="form-control custom_text_width search"
                        type="text"
                        placeholder="Search"
                        aria-label="Search"
                        onKeyUp={this.searchApplicationDataKeyUp}
                      />
                    </div>

                    {this.state.businessdata.length > 0 ? (
                      <>{this.getTable(this.state.businessdata)}</>
                    ) : (
                      <h1 className="text-center mt-5">No Data Found</h1>
                    )}
                    {this.state.businessdata.length > 0
                      ? this.getPageData(
                          pageIncrementBtn,
                          renderPageNumbers,
                          pageDecrementBtn
                        )
                      : ""}
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

export default ListBussinessHours;
