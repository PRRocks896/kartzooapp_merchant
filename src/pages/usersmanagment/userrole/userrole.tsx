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
import "./userrole.css";
import utils from "../../../utils";
import constant from "../../../constant/constant";
import {
  getAllTableDataListRequest,
  statusChangeRequest,
  roleStateRequest,deleteAllDataRequest
} from "../../../modelController/index";
import { DeleteAPI, RoleAPI, StatusAPI } from "../../../service/index.service";

class UserRole extends React.Component<{ history: any }> {

  /** User Role State */
  userState = constant.userPage.state;
  state:roleStateRequest = {
    count: this.userState.count,
    currentPage: this.userState.currentPage,
    items_per_page: this.userState.items_per_page,
    upperPageBound: this.userState.upperPageBound,
    lowerPageBound: this.userState.lowerPageBound,
    pageBound: this.userState.pageBound,
    onItemSelect: this.userState.onItemSelect,
    userrole: this.userState.userrole,
    switchSort: this.userState.switchSort,
    isStatus: this.userState.isStatus,
    deleteuserdata: this.userState.deleteuserdata,
    _maincheck: this.userState._maincheck,
    deleteFlag: this.userState.deleteFlag,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.editRole = this.editRole.bind(this);
    // this.deleteRole = this.deleteRole.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.viewRole = this.viewRole.bind(this);
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
    this.delleteAllData = this.delleteAllData.bind(this);
  }

  /** Page Render Call */
  componentDidMount() {
    document.title =
      constant.userRolePage.title.userRoleTitle + utils.getAppName();
    utils.dataTable();
    this.getRole();
  }

  /**
   * 
   * @param searchText : search value
   * @param page : page number
   * @param size : per page
   */
  async getRole(searchText: string = "", page: number = 1, size: number = 10) {
    const obj: getAllTableDataListRequest = {
      searchText: searchText,
      page: page,
      size: size,
    };
    var getRole = await RoleAPI.getRoles(obj);
    // console.log("getRole", getRole);

    if (getRole) {
      if(getRole.status === 200) {
        this.setState({
          userrole: this.state.userrole = getRole.resultObject.data,
          count: this.state.count = getRole.resultObject.totalcount,
        });
      } else {
        const msg1 = getRole.message;
        utils.showError(msg1);
      }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /**
   * 
   * @param pageNumber : page number
   */
  handlePageChange(pageNumber: number) {
    this.setState({ activePage: pageNumber });
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

  /** Button previous */
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

  /**
   * 
   * @param data : redirect in edit role
   */
  editRole(data: any) {
    this.props.history.push("/edituserrole/" + data.roleId);
  }

  /**
   * 
   * @param data : redirect in view role
   */
  viewRole(data: any) {
    this.props.history.push("/viewuserrole/" + data.roleId);
  }

  // async deleteRole(data: any, text: string, btext: string) {
  //   if (await utils.alertMessage(text, btext)) {
  //     const obj: deleteByIdRequest = {
  //       id: data.roleId,
  //     };
  //     var deleteUser = await RoleAPI.deleteRole(obj);
  //   if(deleteUser) {
  //     this.getRole(
  //       "",
  //       parseInt(this.state.currentPage),
  //       parseInt(this.state.items_per_page)
  //     );
  //   } else {
  //     const msg1 = "Internal server error";
  //     utils.showError(msg1);
  //   }
  //   }
  // }

  /**
   * 
   * @param event : Record per page value
   */
  onItemSelect(event: any) {
    this.setState({
      items_per_page: 
        event.target.options[event.target.selectedIndex].value,
    });
    this.getRole(
      "",
      parseInt(this.state.currentPage),
      parseInt(this.state.items_per_page)
    );
  }

  /**
   * 
   * @param key : sorting value
   */
  handleSort(key: any) {
    this.setState({
      switchSort: !this.state.switchSort,
    });
    let copyTableData = [...this.state.userrole];
    copyTableData.sort(utils.compareByDesc(key,this.state.switchSort));
    this.setState({
      userrole: this.state.userrole = copyTableData,
    });
  }

  /**
   * 
   * @param event : click on next page
   */
  async handleClick(event: any) {
    this.setState({
      currentPage: this.state.currentPage = event.target.id,
    });
    const obj: getAllTableDataListRequest = {
      searchText: "",
      page: parseInt(event.target.id),
      size: parseInt(this.state.items_per_page),
    };
   
      this.getRole(obj.searchText, obj.page, obj.size);
    
  }

  /**
   * 
   * @param e : search value listing
   */
  async searchApplicationDataKeyUp(e: any) {
    const obj: getAllTableDataListRequest = {
      searchText: e.target.value,
      page: 1,
      size: parseInt(this.state.items_per_page),
    };
    this.getRole(obj.searchText, obj.page, obj.size);
  }

  /**
   * 
   * @param data : data
   * @param text : message
   * @param btext : button message
   */
  async statusChange(data: any, text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: statusChangeRequest = {
        moduleName: "Role",
        id: data.roleId,
        isActive: data.isActive === true ? false : true,
      };
      var getStatusChange = await StatusAPI.getStatusChange(obj);
      // console.log("getStatusChange", getStatusChange);
      if (getStatusChange) {
        if(getStatusChange.status === 200) {
          const msg1 = getStatusChange.message;
          utils.showSuccess(msg1);
        this.getRole(
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
   * @param text : message
   * @param btext : button message
   */
  async delleteAllData(text: string, btext: string) {
    if (await utils.alertMessage(text, btext)) {
      const obj: deleteAllDataRequest = {
        moduleName: "Role",
        id: this.state.deleteuserdata
      };
      var deleteAllData = await DeleteAPI.deleteData(obj);
      // console.log("deleteAllData", deleteAllData);
      if (deleteAllData) {
        if(deleteAllData.data.status === 200) {
          const msg1 = deleteAllData.data.message;
          utils.showSuccess(msg1);
        this.getRole(
          "",
          parseInt(this.state.currentPage),
          parseInt(this.state.items_per_page)
        );
        this.setState({
          deleteFlag:this.state.deleteFlag = false
        })
        } else {
          const msg1 = deleteAllData.data.message;
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
   * @param item : item
   * @param e : item select event 
   */
  handleChange(item: any, e: any) {
    let _id = item.roleId;
    let ind: any = this.state.userrole.findIndex((x: any) => x.roleId === _id);
    let data: any = this.state.userrole;
    if (ind > -1) {
      let newState: any = !item._rowChecked;
      data[ind]._rowChecked = newState;
      this.setState({
        userrole: this.state.userrole = data,
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
        newarray.push(res.roleId);
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
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  /**
   * 
   * @param e : main checkbox event
   */
  handleMainChange(e: any) {
    let _val = e.target.checked;
    this.state.userrole.forEach((element: any) => {
      element._rowChecked = _val;
    });
    this.setState({
      userrole: this.state.userrole,
    });
    this.setState({
      _maincheck: _val,
    });
    let newmainarray: any = [];
    this.state.userrole.map((res: any, index: number) => {
      if (res._rowChecked === true) {
        newmainarray.push(res.roleId);
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
    // console.log("deleteuserdata array", this.state.deleteuserdata);
  }

  /**
   * 
   * @param pageNumbers : Page number
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

  /** Get Table List */
  getTable(userrole: any) {
    return (
      <div className="userClass">
      <table
      id="dtBasicExample"
      className="table table-striped table-bordered table_responsive table-sm sortable"
      width="100%"
      >
        <thead>
          <tr onClick={() => this.handleSort("role")}>
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
            <th>{constant.userRolePage.userRoleTableColumn.rolename}</th>
            <th style={{ textAlign: "center" }}>
              {constant.tableAction.status}
            </th>
            <th className="action">{constant.tableAction.action}</th>
          </tr>
        </thead>
        <tbody>
          {this.state.userrole.length > 0 ? (
            <>
              {this.state.userrole.map((data: any, index: any) => (
                <tr key={index}>
                  <td className="centers">
                    <CustomInput
                      // name="name"
                      type="checkbox"
                      id={data.roleId}
                      onChange={(e) => this.handleChange(data, e)}
                      checked={this.state.userrole[index]["_rowChecked"] === true}
                    />
                  </td>
                  <td>{data.role}</td>
                  {/* <td>{data.description}</td> */}
                  <td style={{ textAlign: "center" }}>
                    {data.isActive === true ? (
                      <button
                        className="status_active_color"
                        onClick={() =>
                          this.statusChange(
                            data,
                            "You should be Inactive user role",
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
                            "You should be Active user role",
                            "Yes, Active it"
                          )
                        }
                      >
                        Inactive
                      </button>
                    )}
                  </td>
                  <td className="action">
                    <span className="padding">
                      <i
                        className="fa fa-eye"
                        onClick={() => this.viewRole(data)}
                      ></i>
                      <i
                        className="fas fa-edit"
                        onClick={() => this.editRole(data)}
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

  /** Get Pagiation data */
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
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="main-card mb-12">
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <CardTitle className="font">
                          {constant.userRolePage.title.userRoleTitle}
                        </CardTitle>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <div className="right">
                          <Link to="/adduserrole">
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

                    {this.state.deleteFlag === true ? (
                      <Button
                        className="mb-2 mr-2 custom-button"
                        color="primary"
                        onClick={() => this.delleteAllData( "You should be Delete Role",
                        "Yes, Role it")}
                      >
                        {constant.button.remove}
                      </Button>
                    ) : (
                      ""
                    )}
                    {this.state.userrole.length > 0 ? (
                      <>{this.getTable(this.state.userrole)}</>
                    ) : (
                    <h1 className="text-center mt-5">{constant.noDataFound.nodatafound}</h1>
                    )}
                    
                    {this.state.userrole.length > 0
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
      </>
    );
  }
}

export default UserRole;
