import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  CustomInput,
  Row,
} from "reactstrap";
import {
  StatusAPI,
  ProductAPI
} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { getAllTableDataListRequest, statusChangeRequest,productStateRequest } from "../../../modelController";

class ListProduct extends React.Component<{ history: any }> {

  /** Product State */
  productState:productStateRequest = constant.productPage.state;
  state = {
    count: this.productState.count,
    currentPage: this.productState.currentPage,
    items_per_page: this.productState.items_per_page,
    upperPageBound: this.productState.upperPageBound,
    lowerPageBound: this.productState.lowerPageBound,
    pageBound: this.productState.pageBound,
    onItemSelect: this.productState.onItemSelect,
    productdata: this.productState.productdata,
    switchSort: this.productState.switchSort,
    isStatus: this.productState.isStatus,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.editProduct = this.editProduct.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.viewProduct = this.viewProduct.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleSort = this.handleSort.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
  }

  /** Page Render call */
  async componentDidMount() {
    document.title =
      constant.productPage.title.productTitle + utils.getAppName();
    utils.dataTable();
    this.getProductData();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : page number
   * @param size : per page value
   */
  async getProductData(
    searchText: string = "",
    page: number = 1,
    size: number = 10
  ) {
    const obj:getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };

    var getProductData = await ProductAPI.getProductData(obj);
    // console.log("getProductData", getProductData);

    if (getProductData) {
      if(getProductData.status === 200) {
      this.setState({
        productdata: this.state.productdata =
          getProductData.resultObject.data,
        count: this.state.count = getProductData.resultObject.totalcount,
      });
    } else {
      const msg1 = getProductData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Button next */
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

  /** Button Previous */
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

  /** Edit Product */
  editProduct(id: any) {
    this.props.history.push("/edit-product/" + id);
  }

  /** Redirect in product view page */
  viewProduct(id: any) {
    this.props.history.push("/view-product/" + id);
  }

  /**
   * 
   * @param event : Record per page value
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });

    this.getProductData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  /**
   * 
   * @param event : next page value
   */
  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj:getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };

   
    this.getProductData(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search product listing data
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj:getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };

    this.getProductData(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param key : sorting value
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.productdata];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      productdata: this.state.productdata = copyTableData,
    });
  }

  /**
   * 
   * @param data : status data change
   * @param text : message 
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj:statusChangeRequest = {
        moduleName: "Product",
        id: data.productId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if (getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getProductData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
      } else {
        const msg1 = getStatusChange.message;
        utils.showError(msg1);
      }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  /**
   * 
   * @param pageNumbers : page numbers
   */
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

  /** Get Table Listing */
  getTable(coupondata: any) {
    return (
      <div className="userClass">
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("productName")}>
            <th>{constant.productPage.productTableColumn.prodctname}</th>
            <th>{constant.productPage.productTableColumn.price}</th>
            <th>{constant.productPage.productTableColumn.discountPrice}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.productdata.length > 0 ? (
            <>
              {this.state.productdata.map((data: any, index: any) => (
                <tr key={index}>
                  <td>{data.productName}</td>
                  <td>{data.price}</td>
                  <td>{data.discountPrice}</td>
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Inactive product",
                            "Yes, Inactive it"
                          )
                        }
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="status_Inactive_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Active product",
                            "Yes, Active it"
                          )
                        }
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  <td className="action text-center">
                   
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewProduct(data.productId)}
                      ></i>
                      {/* <i
                        className="fas fa-edit"
                        onClick={() => this.editProduct(data.productId)}
                      ></i> */}
                      {/* <i
                        className="far fa-trash-alt"
                        onClick={() =>
                          this.deleteCategory(data.categoryId)
                        }
                      ></i> */}
                 
                  </td>
                </tr>
              ))}
            </>
          ) : (
            ""
          )}
        </tbody>
      </table>
      </div>
    );
  }

  /**
   * 
   * @param pageDecrementBtn : page decrement
   * @param renderPageNumbers : page render
   * @param pageIncrementBtn : page increment
   */
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
          className="r-per-page"
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

  /** Render DOM */
  render() {
    var pageNumbers = utils.pageNumber(
      this.state.count,
      this.state.items_per_page
    );
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
       
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.productPage.title.productTitle}
                        </CardTitle>
                      </Col>
                      {/* <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/product">
                            <Button
                              className="mb-2 mr-2 custom-button"
                              color="primary"
                            >
                              {constant.button.add}
                            </Button>
                          </Link>
                        </div>
                      </Col> */}
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

                    {this.state.productdata.length > 0 ? (
                      <>{this.getTable(this.state.productdata)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                    {this.state.productdata.length > 0
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
       
      </>
    );
  }
}

export default ListProduct;
