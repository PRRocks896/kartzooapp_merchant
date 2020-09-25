import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardTitle,
  CustomInput,
  Row,
} from "reactstrap";
import "./listmenu.css";
import utils from "../../../utils";
import constant from "../../../constant/constant";
import {
  deleteAllDataRequest,
  menuStateRequest,
  allStateRequest,
  getAllTableDataListRequest,statusChangeRequest
} from "../../../modelController/index";
import { StatusAPI, DeleteAPI, MenuAPI } from "../../../service/index.service";

class ListMenu extends React.Component<{ history: any }> {
  menuState: menuStateRequest = constant.menuPage.state;
  userState: allStateRequest = constant.userPage.state;
  state = {
    count: this.menuState.count,
    currentPage: this.menuState.currentPage,
    items_per_page: this.menuState.items_per_page,
    upperPageBound: this.menuState.upperPageBound,
    lowerPageBound: this.menuState.lowerPageBound,
    pageBound: this.menuState.pageBound,
    onItemSelect: this.menuState.onItemSelect,
    menudata: this.menuState.menudata,
    switchSort: this.menuState.switchSort,
    isStatus: this.menuState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  constructor(props: any) {
    super(props);
    this.editMenu = this.editMenu.bind(this);
    // this.deleteRole = this.deleteRole.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.viewMenu = this.viewMenu.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.searchApplicationDataKeyUp = this.searchApplicationDataKeyUp.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.statusChange = this.statusChange.bind(this);
    this.pagination = this.pagination.bind(this);
    this.getTable = this.getTable.bind(this);
    this.getPageData = this.getPageData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMainChange = this.handleMainChange.bind(this);
    this.deleteDataById = this.deleteDataById.bind(this);
  }

  componentDidMount() {
    document.title =
      constant.menuPage.title.menuTitle + utils.getAppName();
    utils.dataTable();
    this.getMenuData();
  }

  async getMenuData(searchText: string = "", page: number = 1, size: number = 10) {
    const obj: getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };
    var getMenuData = await MenuAPI.getMenuItemData(obj);
    console.log("getMenuData", getMenuData);

    if (getMenuData) {
      if(getMenuData.status === 200) {
        this.setState({
          menudata: this.state.menudata = getMenuData.resultObject.data,
          count: this.state.count = getMenuData.resultObject.totalcount,
        });
      } else {
        const msg1 = getMenuData.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  handlePageChange(pageNumber: number) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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

  editMenu(data: any) {
    this.props.history.push("/edit-menu/" + data.menuItemId);
  }

  viewMenu(data: any) {
    this.props.history.push("/view-menu/" + data.menuItemId);
  }

  // async deleteRole(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.roleId,
  //     };
  //     var deleteUser = await RoleAPI.deleteRole(obj);
  //     if (deleteUser) {
  //       this.getMenuData(
  //         "",
  //         parseInt(this.state.currentPage),
  //         parseInt(this.state.items_per_page)
  //       );
  //     } else {
  //       const msg1 = "Internal server error";
  //       utils.showError(msg1);
  //     }
  //   }
  // }

  async deleteDataById(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "MenuItem",
        id: this.state.deleteuserdata,
      };
      var deleteUser = await DeleteAPI.deleteData(obj);
      console.log("deleteuser", deleteUser);
      if (deleteUser) {
        if(deleteUser.data.status === 200) {
          const msg1 = deleteUser.data.message;
          utils.showSuccess(msg1);
        this.setState({
          deleteFlag:this.state.deleteFlag = false
        })
        this.getMenuData(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
        } else {
          const msg1 = deleteUser.data.message;
          utils.showError(msg1);
        }
      } else {
        // const msg1 = "Internal server error";
        // utils.showError(msg1);
      }
    }
  }

  onItemSelect(event: any) {
    this.setState({
      items_per_page: this.state.items_per_page =
        event.target.options[event.target.selectedIndex].value,
    });
    this.getMenuData(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.menudata];
    copyTableData.sort(utils.compareByDesc(key, this.state.switchSort));
    this.setState({
      menudata: this.state.menudata = copyTableData,
    });
  }

  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj: getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };
    this.getMenuData(obj.searchText, obj.page, obj.size);
  }

  async searchApplicationDataKeyUp(e: any) {
    const obj: getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };
    this.getMenuData(obj.searchText, obj.page, obj.size);
  }

  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj : statusChangeRequest = {
        moduleName: "MenuItem",
        id: data.menuItemId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if(getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getMenuData(
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

  handleChange(item: any, e: any) {
    let _id = item.menuItemId;
    let ind: any = this.state.menudata.findIndex((x: any) => x.menuItemId === _id);
    let data: any = this.state.menudata;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        menudata: this.state.menudata = data,
      });
    }
    if (
      data.filter((res: any, index: number) => res._rowChecked === true)
        .length === data.length
    ) {
      this.setState({
        _maincheck: true,
      });
    } else {
      this.setState({
        _maincheck: false,
      });
    }
    let newarray: any = [];
    data.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newarray.push(res.menuItemId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.menudata.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      menudata: this.state.menudata,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.menudata.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.menuItemId);
      }
    });
    this.setState({
      deleteuserdata: this.state.deleteuserdata = newmainarray,
    });
    if (this.state.deleteuserdata.length > 0) {
      this.setState({
        deleteFlag: this.state.deleteFlag = true,
      });
    } else {
      this.setState({
        deleteFlag: this.state.deleteFlag = false,
      });
    }
    console.log("deleteuserdata array", this.state.deleteuserdata);
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

  getTable(userrole: any) {
    return (
      <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("menuItemName")}>
            <th className="centers">
              <CustomInput
                name="name"
                defaultValue="value"
                type="checkbox"
                id="exampleCustomCheckbox"
                onChange={this.handleMainChange}
                checked={this.state._maincheck}
              />
            </th>
            <th>{constant.menuPage.menuTableColumn.menucontoller}</th>
            <th>{constant.menuPage.menuTableColumn.menuname}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.menudata.length > 0 ? (
           
              this.state.menudata.map((data: any, index: any) => (
                <tr key={index}>
                  <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.menuItemId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={
                        this.state.menudata[index]["_rowChecked"] === true
                      }
                    />
                  </td>
                  <td>{data.menuItemController ? data.menuItemController : 'N/A' }</td>
                  <td>{data.menuItemName}</td>
                  {/* <td>{data.description}</td> */}
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be inActive menu",
                            "Yes, inActive it"
                          )
                        }
                      >
                        Active
                      </button>
                    ) : (
                      <button
                        className="status_inactive_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Active menu",
                            "Yes, Active it"
                          )
                        }
                      >
                        InActive
                      </button>
                    )}
                  </td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewMenu(data)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editMenu(data)}
                      ></i>
                      {/* <i
                        className="fas fa-trash"
                        onClick={() =>
                          this.deleteRole(
                            data,
                            "You should be Delete Role",
                            "Yes, Role it"
                          )
                        }
                      ></i> */}
                    </span>
                  </td>
                </tr>
              ))
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
                        {constant.menuPage.title.menuTitle}
                      </CardTitle>
                    </Col>
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <div className="right">
                        <Link to="/add-menu">
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

                  {this.state.menudata.length > 0 ? (
                    <>{this.getTable(this.state.menudata)}</>
                  ) : (
                    <h1 className="text-center mt-5">
                      {constant.noDataFound.nodatafound}
                    </h1>
                  )}
                  {this.state.deleteFlag === true ? (
                    <Button
                      className="mb-2 mr-2 custom-button"
                      color="primary"
                      onClick={() =>
                        this.deleteDataById(
                          "You should be Delete MenuItem",
                            "Yes, Delete it"
                        )
                      }
                    >
                      {constant.button.remove}
                    </Button>
                  ) : (
                    ""
                  )}
                  {this.state.menudata.length > 0
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

export default ListMenu;
