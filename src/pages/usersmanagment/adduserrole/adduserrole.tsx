import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import {RoleAPI} from "../../../service/index.service";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import {
  userRoleCreateRequest,
  userRoleUpdateRequest,
  getDataByIdRequest,
  addUserRoleState,
} from "../../../modelController";

class AddUserRole extends React.Component<{ history: any; location: any }> {
  userState : addUserRoleState = constant.userRolePage.state;
  state = {
    rolename: this.userState.rolename,
    rolenameerror: this.userState.rolenameerror,
    description: this.userState.description,
    descriptionerror: this.userState.descriptionerror,
    isOpen: this.userState.isOpen,
    updateTrue: this.userState.updateTrue,
    roleid: this.userState.roleid,
    isActive: this.userState.isActive
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUserRole = this.addUserRole.bind(this);
    this.updateUserRole = this.updateUserRole.bind(this);
    this.getRoleById = this.getRoleById.bind(this);
  }

  async componentDidMount() {
    const roleId = this.props.location.pathname.split("/")[2];
    if (roleId !== undefined) {
      this.getRoleById(roleId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.userRolePage.title.updateRoleTitle + utils.getAppName();
    } else {
      document.title =
        constant.userRolePage.title.adduserRoleTitle + utils.getAppName();
    }
  }

  async getRoleById(roleId: any) {
    const obj:getDataByIdRequest = {
      id: roleId,
    };
    const getRoleById: any = await RoleAPI.getRoleById(obj);
    // console.log("getRoleById", getRoleById);

    if (getRoleById) {
      if(getRoleById.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        rolename: this.state.rolename = getRoleById.resultObject.role,
        roleid: this.state.roleid = getRoleById.resultObject.roleId,
        description: this.state.description =
          getRoleById.resultObject.description,
        isOpen: this.state.isOpen = getRoleById.resultObject.isAdminRole,
        isActive: this.state.isActive = getRoleById.resultObject.isActive
      });
    } else {
      const msg1 = getRoleById.message;
        utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  handleChange(checked: boolean) {
    this.setState({ isOpen: this.state.isOpen = checked });
  }

  validate() {
    let rolenameerror = "";

    if (!this.state.rolename) {
      rolenameerror = "please enter role name";
    }

    if (rolenameerror) {
      this.setState({ rolenameerror });
      return false;
    }
    return true;
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addUserRole() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        rolenameerror: "",
      });
      if (this.state.rolename && this.state.isOpen) {
        const obj: userRoleCreateRequest = {
          role: this.state.rolename,
          description: this.state.description,
          isActive: this.state.isActive,
          isAdminRole: this.state.isOpen,
        };

        // console.log("userole", obj);

        const addUserRole = await RoleAPI.addUserRole(obj);
        // console.log("addUserRole", addUserRole);

        if (addUserRole) {
          if(addUserRole.status === 200) {
            const msg1 = addUserRole.message;
            utils.showSuccess(msg1);
          this.props.history.push("/userrole");
          }  else {
            const msg1 = addUserRole.message;
              utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updateUserRole() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        rolenameerror: "",
      });
      if (this.state.rolename && this.state.isOpen) {
        const obj: userRoleUpdateRequest = {
          roleId: this.state.roleid,
          role: this.state.rolename,
          description: this.state.description,
          isActive: this.state.isActive,
          isAdminRole: this.state.isOpen,
        };
        // console.log("userole", obj);

        const editUserRole = await RoleAPI.editUserRole(obj);
        // console.log("editUserRole", editUserRole);

        if (editUserRole) {
          if(editUserRole.status === 200) {
            const msg1 = editUserRole.message;
            utils.showSuccess(msg1);
          this.props.history.push("/userrole");
          } else {
            const msg1 = editUserRole.message;
            utils.showError(msg1);
          }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

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
                          <h1>{constant.userRolePage.title.updateRoleTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.userRolePage.title.updateRoleTitle}</h1>
                        </Col>
                      )}
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/userrole">
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
                          <Label htmlFor="role_name">
                            {constant.userRolePage.userRoleTableColumn.rolename}
                          </Label>
                          <Input
                            type="text"
                            id="role_name"
                            name="rolename"
                            className="form-control"
                            value={this.state.rolename}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your role name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.rolenameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="description">{constant.userRolePage.userRoleTableColumn.description}</Label>
                          <Input
                            type="textarea"
                            id="description"
                            name="description"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your description"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.descriptionerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                      <span>{constant.userRolePage.userRoleTableColumn.isadminrole}</span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isOpen}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.updateUserRole}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addUserRole}
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

export default AddUserRole;
