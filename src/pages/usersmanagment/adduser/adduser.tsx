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
import "./adduser.css";

import { API, RoleAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";

class AddUser extends React.Component<{ history: any; location: any }> {
  userState = constant.userPage.state;
  state = {
    selectedFile: this.userState.selectedFile,
    firstname: this.userState.firstname,
    firstnameerror: this.userState.firstnameerror,
    lastname: this.userState.lastname,
    lastnameerror: this.userState.lastnameerror,
    email: this.userState.email,
    emailerror: this.userState.emailerror,
    mobilenumber: this.userState.mobilenumber,
    mobilenumbererror: this.userState.mobilenumbererror,
    password: this.userState.password,
    passworderror: this.userState.passworderror,
    checked: this.userState.checked,
    selectedFileerror: this.userState.selectedFileerror,
    onItemSelect: this.userState.onItemSelect,
    onItemSelecterror: this.userState.onItemSelecterror,
    roleid: 0,
    userrole: this.userState.userrole,
    updateTrue: this.userState.updateTrue,
    filetrue: this.userState.filetrue,
    file: this.userState.file,
    userid: this.userState.userid,
    rolename: this.userState.rolename,
    type: this.userState.type,
    isActive:this.userState.isActive
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.addUser = this.addUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getUserRole = this.getUserRole.bind(this);
    this.getUserById = this.getUserById.bind(this);
  }

  async componentDidMount() {
    this.getUserRole();
    const usderId = this.props.location.pathname.split("/")[2];
    if (usderId !== undefined) {
      this.getUserById(usderId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.userPage.title.updateUserTitle + utils.getAppName();
    } else {
      document.title =
        constant.userPage.title.addUserTitle + utils.getAppName();
    }
  }

  handleChange(checked: boolean) {
    this.setState({ checked });
  }

  async getUserById(usderId: any) {
    const obj = {
      id: usderId,
    };
    const getUserById: any = await API.getUserById(obj);
    // console.log("getUserById", getUserById);

    if (getUserById) {
      if (getUserById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          filetrue: this.state.filetrue = true,
          firstname: this.state.firstname = getUserById.resultObject.firstName,
          lastname: this.state.lastname = getUserById.resultObject.lastName,
          email: this.state.email = getUserById.resultObject.email,
          mobilenumber: this.state.mobilenumber =
            getUserById.resultObject.phone,
          userid: this.state.userid = getUserById.resultObject.userId,
          rolename: this.state.rolename = getUserById.resultObject.role,
          roleid: this.state.roleid = getUserById.resultObject.roleId,
          file: this.state.file = getUserById.resultObject.photoPath,
          selectedFile: this.state.selectedFile =
            constant.filepath + getUserById.resultObject.photoPath,
          password: this.state.password = getUserById.resultObject.password
            ? getUserById.resultObject.password
            : "",
            isActive:this.state.isActive = getUserById.resultObject.isActive
        });
      } else {
        const msg1 = getUserById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    } else {
      this.setState({
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    }
  }

  async getUserRole() {
    const getUserRole = await RoleAPI.getUserRole();

    if (getUserRole) {
      if (getUserRole.status === 200) {
        this.setState({
          userrole: this.state.userrole = getUserRole.resultObject,
        });
      } else {
        const msg1 = getUserRole.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  validate() {
    let firstnameerror = "";
    let lastnameerror = "";
    let emailerror = "";
    let mobilenumbererror = "";
    let passworderror = "";
    let selectedFileerror = "";
    let onItemSelecterror = "";

    if (!this.state.firstname) {
      firstnameerror = "please enter firstname";
    }

    if (!this.state.lastname) {
      lastnameerror = "please enter lastname";
    }

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    const mobileRegex: any = /^([+]\d{2})?\d{10}$/;
    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    } else if (!mobileRegex.test(this.state.mobilenumber)) {
      mobilenumbererror = "please enter valid mobile number";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (!this.state.selectedFile) {
      selectedFileerror = "please select file";
    }

    if (!this.state.onItemSelect) {
      onItemSelecterror = "please select role";
    }

    if (
      firstnameerror ||
      lastnameerror ||
      emailerror ||
      mobilenumbererror ||
      passworderror ||
      selectedFileerror ||
      onItemSelecterror
    ) {
      this.setState({
        firstnameerror,
        lastnameerror,
        emailerror,
        mobilenumbererror,
        passworderror,
        selectedFileerror,
        onItemSelecterror,
      });
      return false;
    }
    return true;
  }

  validateUpdate() {
    let firstnameerror = "";
    let lastnameerror = "";
    let emailerror = "";
    let mobilenumbererror = "";
    let selectedFileerror = "";

    if (!this.state.firstname) {
      firstnameerror = "please enter firstname";
    }

    if (!this.state.lastname) {
      lastnameerror = "please enter lastname";
    }

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    }

    if (!this.state.selectedFile) {
      selectedFileerror = "please select file";
    }

    if (
      firstnameerror ||
      lastnameerror ||
      emailerror ||
      mobilenumbererror ||
      selectedFileerror
    ) {
      this.setState({
        firstnameerror,
        lastnameerror,
        emailerror,
        mobilenumbererror,
        selectedFileerror,
      });
      return false;
    }
    return true;
  }

  onItemSelect(event: any) {
    this.setState({
      roleid: this.state.roleid =
        event.target.options[event.target.selectedIndex].value,
      onItemSelect: this.state.onItemSelect =
        event.target.options[event.target.selectedIndex].innerHTML,
    });
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleClick = () =>
    this.setState(({ type }: any) => ({
      type: type === "password" ? "text" : "password",
    }));

  async addUser() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        emailerror: "",
        mobilenumbererror: "",
        passworderror: "",
        onItemSelecterror: "",
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.email &&
        this.state.mobilenumber &&
        this.state.password &&
        this.state.selectedFile &&
        this.state.onItemSelect
      ) {
        let formData = new FormData();

        formData.append("roleId", this.state.roleid.toString());
        formData.append("firstName", this.state.firstname);
        formData.append("lastName", this.state.lastname);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.mobilenumber.toString());
        formData.append("password", this.state.password);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : "null");
        formData.append("userId", "0");

        const addUser: any = await API.addUser(formData);
        // console.log("addUser", addUser);

        if (addUser) {
          if (addUser.data.status === 200) {
            const msg = addUser.data.message;
            utils.showSuccess(msg);
            this.props.history.push("/users");
          } else {
            const msg1 = addUser.data.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async editUser() {
    const isValid = this.validateUpdate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        emailerror: "",
        mobilenumbererror: "",
        selectedFileerror: "",
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.email &&
        this.state.mobilenumber &&
        this.state.selectedFile
      ) {
        // console.log("id", this.state.userid, this.state.roleid);

        let formData = new FormData();

        formData.append("id", this.state.userid.toString());
        formData.append("roleId", this.state.roleid.toString());
        formData.append("firstName", this.state.firstname);
        formData.append("lastName", this.state.lastname);
        formData.append("email", this.state.email);
        formData.append("phone", this.state.mobilenumber.toString());
        formData.append("password", this.state.password);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile ? this.state.selectedFile[0] : "null");
        formData.append("userId", "0");

        const editUser: any = await API.editUser(formData, this.state.userid);
        // console.log("editUser", editUser);

        if (editUser) {
          if (editUser.status === 200) {
            const msg = editUser.data.message;
            utils.showSuccess(msg);
            this.props.history.push("/users");
          } else {
            const msg1 = editUser.data.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  removeIcon() {
    this.setState({
      file: this.state.file = "",
    });
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
                      {this.state.updateTrue == true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.userPage.title.editUser}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.userPage.title.addUser}</h1>
                        </Col>
                      )}
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        style={{ textAlign: "right" }}
                      >
                        <Link to="/users">
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
                          <Label htmlFor="first_name">
                            {constant.userPage.userTableColumn.firstname}
                          </Label>
                          <Input
                            type="text"
                            id="first_name"
                            name="firstname"
                            className="form-control"
                            value={this.state.firstname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your first name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.firstnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="last_name">
                            {constant.userPage.userTableColumn.lastname}
                          </Label>
                          <Input
                            type="text"
                            id="last_name"
                            name="lastname"
                            className="form-control"
                            value={this.state.lastname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your last name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.lastnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="email">
                            {constant.userPage.userTableColumn.email}
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your email"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.emailerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                      <Label htmlFor="mobile_no">{constant.userPage.userTableColumn.mobilenumber}</Label>
                          <Input
                            type="number"
                            id="mobile_no"
                            name="mobilenumber"
                            className="form-control"
                            value={this.state.mobilenumber}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your mobile number"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.mobilenumbererror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                      <Label htmlFor="password">{constant.userPage.userTableColumn.password}</Label>
                        <div className="right-inner-addon input-group">
                          <input
                            type={this.state.type}
                            name="password"
                            className="form-control"
                            id="validationCustom09"
                            value={this.state.password}
                            placeholder="Enter your password"
                            onChange={this.handleChangeEvent}
                          />
                          {this.state.type === "password" ? (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye"
                            ></i>
                          ) : (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye-slash"
                            ></i>
                          )}
                        </div>
                        <div className="mb-4 text-danger">
                          {this.state.passworderror}
                        </div>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        {this.state.updateTrue === true ? (
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.userPage.userTableColumn.roleselect}
                            </Label>
                            <Input
                              type="select"
                              name="onItemSelect"
                              onChange={this.onItemSelect}
                            >
                              <option value="">{this.state.rolename}</option>
                              {this.state.userrole.length > 0
                                ? this.state.userrole.map(
                                    (data: any, index: any) => (
                                      <option
                                        key={data.roleId}
                                        value={data.roleId}
                                      >
                                        {data.role}
                                      </option>
                                    )
                                  )
                                : ""}
                            </Input>
                            <div className="mb-4 text-danger">
                              {this.state.onItemSelecterror}
                            </div>
                          </FormGroup>
                        ) : (
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                            {constant.userPage.userTableColumn.roleselect}
                            </Label>
                            <Input
                              type="select"
                              name="onItemSelect"
                              onChange={this.onItemSelect}
                            >
                              {/* <option value="">Select UserRole:</option>
                            <option id="1" value="User">User</option>
                            <option id="2" value="Customer">Customer</option> */}
                              <option value="">{constant.userPage.userTableColumn.roleselect}</option>
                              {this.state.userrole.length > 0
                                ? this.state.userrole.map(
                                    (data: any, index) => (
                                      <option
                                        key={data.value}
                                        value={data.value}
                                      >
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </Input>
                            <div className="mb-4 text-danger">
                              {this.state.onItemSelecterror}
                            </div>
                          </FormGroup>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          {this.state.file !== "" ? (
                            <div className="img-size">
                              {this.state.file !== "" ? (
                                <div>
                                  {this.state.filetrue === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file}
                                    />
                                  ) : (
                                    <img
                                      className="picture"
                                      src={this.state.file}
                                    />
                                  )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p style={{ fontSize: "16px" }}>{constant.userPage.userTableColumn.userimage}</p>
                              <Label className="imag" for="file-input">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input"
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={this.onChangeHandler.bind(this)}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.updateTrue == true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.editUser}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addUser}
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
    );
  }
}

export default AddUser;
