import React from "react";
import "./login.css";
import { API } from "../../service/index.service";
import utils from "../../utils";
import constant from "../../constant/constant";
import axios from "axios";
import apiUrl from "../../apicontroller/apicontrollers";
import { loginCreateRequest,addLoginStateRequest } from "../../modelController";
import {
  Button,
  Input,
  FormGroup,
  Label
} from "reactstrap";
import { Modal } from "react-bootstrap";
const interceptor = require("../../intercepter");
const publicIp = require("public-ip");

class Login extends React.Component<{ history: any }> {
  loginState : addLoginStateRequest = constant.loginPage.state;
  state = {
    email: this.loginState.email,
    emailerror: this.loginState.emailerror,
    password: this.loginState.password,
    passworderror: this.loginState.passworderror,
    ipAddress: this.loginState.ipAddress,
    isButton: this.loginState.isButton,
    type: this.loginState.type,
    forgot: this.loginState.forgot,
    disabled:this.loginState.disabled
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeEventPassword = this.handleChangeEventPassword.bind(this);
    this.login = this.login.bind(this);
    this.forgotpassword = this.forgotpassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.enterPressed = this.enterPressed.bind(this);
    this.forgotmodelOpen = this.forgotmodelOpen.bind(this);
    this.handleCloseForgot = this.handleCloseForgot.bind(this);
  }

  forgotmodelOpen() {
    this.setState({ forgot: !this.state.forgot });
  }

  handleCloseForgot() {
    this.setState({ forgot: !this.state.forgot });
  }

  async componentDidMount() {
    document.title = constant.loginTitle + utils.getAppName();
    const ipaddress = publicIp.v4();
    this.setState({
      ipAddress: this.state.ipAddress = await ipaddress,
      isButton: this.state.isButton = false,
    });
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleChangeEventPassword(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleClick = () =>
    this.setState(({ type }: any) => ({
      type: type === "password" ? "text" : "password",
    }));

  validate() {
    let emailerror = "";
    let passworderror = "";

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (emailerror || passworderror) {
      this.setState({ emailerror, passworderror });
      return false;
    }
    return true;
  }

  validatePassword() {
    let emailerror = "";

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    if (emailerror) {
      this.setState({ emailerror });
      return false;
    }
    return true;
  }

  async forgotpassword() {
    const isValid = this.validatePassword();
    if (isValid) {
      this.setState({
        emailerror: this.state.emailerror = "",
      });
      if (this.state.email) {
        const obj = {
          email: this.state.email,
        };

        var forgotPassword: any = await API.forgotPassword(obj);
        // console.log("forgotPassword", forgotPassword);

        if (forgotPassword) {
          this.setState({
            forgot: this.state.forgot = false,
          });
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  enterPressed(event: any) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      this.login();
    }
  }

  async login() {
    this.setState({
      isButton: true,
      disabled: true
    });
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        emailerror: "",
        passworderror: "",
      });
      if (this.state.email && this.state.password) {
        const obj: loginCreateRequest = {
          email: this.state.email,
          password: this.state.password,
          deviceType: 1,
          deviceId: "deviceId",
          ipAddress: this.state.ipAddress,
          userId: 0,
        };

        axios
          .post(constant.apiUrl + apiUrl.userController.createData, obj)
          .then(async(res: any) => {
            // console.log("login", res);
            if (res) {
              if (res.data.status === 200) {
                this.setState({
                  isButton: true,
                  disabled: true
                });
                var userData = res.data.resultObject;
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", userData.token);
                const users: any = localStorage.getItem("user");
                // let user = JSON.parse(users);
                var getToken = await API.getToken();
                // console.log("getToken", getToken);
                if (getToken) {
                  localStorage.setItem("adminToken", getToken.token);
                }
                this.props.history.push("/dashboard");
              } else {
                this.setState({
                  isButton: this.state.isButton = false,
                  disabled:false
                });
              }
            } else {
              this.setState({
                isButton: this.state.isButton = false,
                disabled:false
              });
              // const msg1 = "Internal server error";
              // utils.showError(msg1);
            }
          });
      }
    } else {
      this.setState({
        isButton: this.state.isButton = false,
        disabled:false
      });
    }
  }

  render() {
    return (
      <div className="ms-body ms-primary-theme ms-logged-out">
        <div id="preloader-wrap">
          <div className="spinner spinner-8">
            <div className="ms-circle1 ms-child"></div>
            <div className="ms-circle2 ms-child"></div>
            <div className="ms-circle3 ms-child"></div>
            <div className="ms-circle4 ms-child"></div>
            <div className="ms-circle5 ms-child"></div>
            <div className="ms-circle6 ms-child"></div>
            <div className="ms-circle7 ms-child"></div>
            <div className="ms-circle8 ms-child"></div>
            <div className="ms-circle9 ms-child"></div>
            <div className="ms-circle10 ms-child"></div>
            <div className="ms-circle11 ms-child"></div>
            <div className="ms-circle12 ms-child"></div>
          </div>
        </div>

        <div
          className="ms-aside-overlay ms-overlay-left ms-toggler"
          data-target="#ms-side-nav"
          data-toggle="slideLeft"
        ></div>
        <div
          className="ms-aside-overlay ms-overlay-right ms-toggler"
          data-target="#ms-recent-activity"
          data-toggle="slideRight"
        ></div>

        <main className="body-content">
          <div className="ms-content-wrapper ms-auth">
            <div className="ms-auth-container">
              <div className="ms-auth-col">
                <div className="ms-auth-bg"></div>
              </div>
              <div className="ms-auth-col">
                <div className="ms-auth-form">
                  <form className="needs-validation">
                    <h3>
                      <b>{constant.account}</b>
                    </h3>
                    <p>{constant.loginpage}</p>
                    <div className="mb-3">
                      <label>
                        <b>{constant.email}</b>
                      </label>
                      <div className="input-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="validationCustom08"
                          placeholder="Email Address"
                          onKeyPress={this.enterPressed.bind(this)}
                          onChange={this.handleChangeEvent}
                        />
                      </div>
                      <div className="mb-4 text-danger">
                        {this.state.emailerror}
                      </div>
                    </div>
                    <div className="mb-2">
                      <label>
                        <b>{constant.password}</b>
                      </label>
                      <div className="right-inner-addon input-group">
                        <input
                          type={this.state.type}
                          name="password"
                          className="form-control"
                          id="validationCustom09"
                          placeholder="Password"
                          onKeyPress={this.enterPressed.bind(this)}
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
                    </div>
                    <div className="form-group">
                      <label className="ms-checkbox-wrap">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                        />
                        <i className="ms-checkbox-check"></i>
                      </label>{" "}
                      <span>
                        <b> {constant.recoverPassword} </b>
                      </span>
                      <label className="d-block mt-3">
                        <a className="btn-link" onClick={this.forgotmodelOpen}>
                          <b style={{ color: "#eea218" }}>{constant.forgot} </b>
                        </a>
                      </label>
                    </div>
                    {this.state.isButton === false ? (
                      <button
                        className="btn mt-4 d-block w-100"
                        type="button"
                        style={{
                          backgroundColor: "#eea218",
                          color: "#fff",
                          fontWeight: 500,
                        }}
                        disabled={this.state.disabled}
                        onClick={this.login}
                      >
                        {constant.signin}
                      </button>
                    ) : (
                      <div className="spinerButton">
                        <div>
                          <button
                            className="btn mt-4 d-block w-100"
                            type="button"
                            disabled={this.state.disabled}
                            style={{
                              backgroundColor: "#eea218",
                              color: "#fff",
                              fontWeight: 500,
                            }}
                          >
                            
                            {constant.signin}
                          </button>
                        </div>
                        <div className="spinners"></div>
                      </div>
                    )}
                    {/* <p className="mb-0 mt-3 text-center">{constant.notmember} <b className="btn-link"><Link to="/signup" style={{ color: 'rgb(238, 162, 24)',fontWeight:600 }}>{constant.signup}</Link></b>
                                        </p> */}
                  </form>
                </div>
              </div>
            </div>
          </div>

          <Modal
            className="modal-dialog-centered"
            show={this.state.forgot}
            onHide={this.handleCloseForgot}
          >
            <Modal.Header closeButton>
              <Modal.Title>{constant.forgotpassword}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ margin: "auto" }}>
              <FormGroup>
                <div className="text-center">
                  <Label> {constant.email}:</Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="form-control"
                    onChange={this.handleChangeEventPassword}
                    required
                  />
                  <div className="mb-4 text-danger">
                    {this.state.emailerror}
                  </div>
                </div>
              </FormGroup>
            </Modal.Body>
            <Modal.Footer>
              <div className="button-ct">
                <Button variant="primary" onClick={this.forgotpassword}>
                  {constant.reset}
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        </main>
      </div>
    );
  }
}

export default Login;
