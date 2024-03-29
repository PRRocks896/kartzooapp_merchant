import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Form,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import {CategoryAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import { addMenuRequest, addMenuStateRequest, getDataByIdRequest } from "../../../modelController";
import { MenuAPI } from "../../../service/index.service";
// import { getDataByIdRequest, addCategoryStateRequest } from "../../../modelController";

class AddMenu extends React.Component<{ history: any; location: any }> {

  /** Add Menu State */
  menuState: addMenuStateRequest = constant.menuPage.state;
  state = {
    menuitemname: this.menuState.menuitemname,
    menuitemnameerror: this.menuState.menuitemnameerror,
    menuitemcontoller: this.menuState.menuitemcontoller,
    menuitemview: this.menuState.menuitemview,
    sortorder: this.menuState.sortorder,
    sortordererror: this.menuState.sortordererror,
    parentid: this.menuState.parentid,
    isActive: this.menuState.isActive,
    updateTrue: this.menuState.updateTrue,
    menuid: this.menuState.menuid,
    menudata: this.menuState.menudata
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addMenu = this.addMenu.bind(this);
    this.updateMenu = this.updateMenu.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getMenuDataById = this.getMenuDataById.bind(this);
    this.getAllMenu = this.getAllMenu.bind(this);
  }

  /** Page Render Call */
  async componentDidMount() {
    this.getAllMenu();
    const menuId = this.props.location.pathname.split("/")[2];
    if (menuId !== undefined) {
      this.getMenuDataById(menuId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.menuPage.title.updatemenuTitle + utils.getAppName();
    } else {
      document.title =
        constant.menuPage.title.addmenuTitle + utils.getAppName();
    }
  }

  /** Get All Menu */
  async getAllMenu() {
    const getAllMenu = await MenuAPI.getAllMenu();
    // console.log("getAllMenu", getAllMenu);
    if(getAllMenu) {
      if(getAllMenu.status === 200) {
        this.setState({
          menudata: this.state.menudata = getAllMenu.resultObject
        });
      } else {
        const msg1 = getAllMenu.message;
        utils.showError(msg1);
      }
    }
  }

  /** Get menu data  */
  async getMenuDataById(id: any) {
    const obj: getDataByIdRequest = {
      id: id,
    };
    const getMenuItemById: any = await MenuAPI.getMenuItemById(obj);
    if (getMenuItemById) {
      if(getMenuItemById.status === 200) {
      this.setState({
        menuid:getMenuItemById.resultObject.menuItemId,
        parentid:getMenuItemById.resultObject.parentID,
        menuitemname: getMenuItemById.resultObject.menuItemName,
        menuitemcontoller: getMenuItemById.resultObject.menuItemController ? getMenuItemById.resultObject.menuItemController : 'N/A',
        menuitemview: getMenuItemById.resultObject.menuItemView ? getMenuItemById.resultObject.menuItemView : 'N/A',
        sortorder: getMenuItemById.resultObject.sortOrder,
        isActive: getMenuItemById.resultObject.isActive

    });
  } else {
    const msg1 = getMenuItemById.message;
    utils.showError(msg1);
  }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

/**
 * 
 * @param event : select menu
 */
  onItemSelect(event: any) {
    this.setState({
      parentid:this.state.parentid = 
        parseInt(event.target.value),
    });
  }

  /** Check Validate or not */
  validate() {
    let menuitemnameerror = "";
    let sortordererror = "";

    if (!this.state.menuitemname) {
      menuitemnameerror = "please enter menu item name";
    }

    var regex1 = /^[0-9]+$/;
    if(!regex1.test(this.state.sortorder)) {
      sortordererror = "please enter valid order"
    }

    if (menuitemnameerror || sortordererror) {
      this.setState({ menuitemnameerror,sortordererror });
      return false;
    }
    return true;
  }

  /**
   * 
   * @param event : update the state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Add menu */
  async addMenu() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        menuitemnameerror: "",
        sortordererror:""
      });
      if (this.state.menuitemname) {
        const obj : addMenuRequest = {
          menuItemName: this.state.menuitemname,
          menuItemController: this.state.menuitemcontoller,
          menuItemView: this.state.menuitemview,
          sortOrder: parseInt(this.state.sortorder),
          parentID: this.state.parentid,
          isActive: this.state.isActive
        }
        const addMenu = await MenuAPI.addMenu(obj);
        // console.log("addMenu", addMenu);
        if (addMenu) {
          if(addMenu.status === 200) {
            const msg1 = addMenu.message;
            utils.showSuccess(msg1);
          this.props.history.push("/listmenu");
          } else {
            const msg1 = addMenu.message;
              utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Update menu */
  async updateMenu() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        menuitemnameerror: "",
        sortordererror:""
      });
      if (this.state.menuitemname) {
        const obj : addMenuRequest = {
          menuItemId: parseInt(this.state.menuid),
          menuItemName: this.state.menuitemname,
          menuItemController: this.state.menuitemcontoller,
          menuItemView: this.state.menuitemview,
          sortOrder: parseInt(this.state.sortorder),
          parentID: this.state.parentid,
          isActive: this.state.isActive
        }
        const editMenu = await MenuAPI.editMenu(obj);
        // console.log("editMenu", editMenu);
        if (editMenu) {
          if(editMenu.status === 200) {
            const msg1 = editMenu.message;
            utils.showSuccess(msg1);
          this.props.history.push("/listmenu");
          } else {
            const msg1 = editMenu.message;
              utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Render DOM */
  render() {
    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1 className="userbutton1">{constant.menuPage.title.updatemenuTitle}</h1>
                        </Col>
                      ) : (
                          <Col xs="12" sm="6" md="9" lg="9" xl="9">
                            <h1 className="userbutton1">{constant.menuPage.title.addmenuTitle}</h1>
                          </Col>
                        )}

                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="userbutton"
                      >
                        <Link to="/listmenu">
                          <Button
                            type="button"
                            size="sm"
                            color="primary"
                            className="mb-2 mr-2 custom-button"
                          >
                            {constant.button.back}
                          </Button>
                        </Link>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="menuname">
                            {
                              constant.menuPage.menuTableColumn.menuname
                            }
                          </Label>
                          <Input
                            type="text"
                            id="menuname"
                            name="menuitemname"
                            className="form-control"
                            value={this.state.menuitemname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your menu item name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.menuitemnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                            {constant.menuPage.menuTableColumn.select}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                              value={this.state.parentid ? this.state.parentid : ''}
                            >
                              <option value="">
                                {constant.menuPage.menuTableColumn.select}
                              </option>
                              {this.state.menudata.length > 0
                                ? this.state.menudata.map(
                                  (data: any, index: any) => (
                                    <option
                                      key={index}
                                      value={data.value}
                                    >
                                      {data.name}
                                    </option>
                                  )
                                )
                                : ""}
                            </CustomInput>

                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="menucontroller">
                            {
                              constant.menuPage.menuTableColumn.menucontoller
                            }
                          </Label>
                          <Input
                            type="text"
                            id="menucontroller"
                            name="menuitemcontoller"
                            className="form-control"
                            value={this.state.menuitemcontoller}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your menu item controller"
                            required
                          />

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="menuview">
                            {
                              constant.menuPage.menuTableColumn.menuview
                            }
                          </Label>
                          <Input
                            type="text"
                            id="menuview"
                            name="menuitemview"
                            className="form-control"
                            value={this.state.menuitemview}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your menu item view"
                            required
                          />

                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">{constant.menuPage.menuTableColumn.sortorder}</Label>
                          <Input
                            type="number"
                            id="sortnumber"
                            name="sortorder"
                            className="form-control"
                            value={this.state.sortorder}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your sort order"
                            required
                          />
                            <div className="mb-4 text-danger">
                            {this.state.sortordererror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>



                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateMenu}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                        <Button
                          type="button"
                          size="sm"
                          color="primary"
                          className="mb-2 mr-2 custom-button"
                          onClick={this.addMenu}
                        >
                          {constant.button.Save}
                        </Button>
                      )}
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

export default AddMenu;
