import React from "react";
import "./login.css";
import { API } from "../../service/index.service";
import utils from "../../utils";
import constant from "../../constant/constant";
import axios from "axios";
import apiUrl from "../../apicontroller/apicontrollers";
import { loginCreateRequest } from "../../modelController";
const interceptor = require("../../intercepter");
const publicIp = require("public-ip");

class Login extends React.Component<{ history: any }> {
  loginState = constant.loginPage.state;
  state = {
    email: this.loginState.email,
    emailerror: this.loginState.emailerror,
    password: this.loginState.password,
    passworderror: this.loginState.passworderror,
    ipAddress: this.loginState.ipAddress,
    isButton: this.loginState.isButton,
    type: this.loginState.type,
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeEventPassword = this.handleChangeEventPassword.bind(this);
    this.login = this.login.bind(this);
    this.forgotpassword = this.forgotpassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
        console.log("forgotPassword", forgotPassword);

        if (forgotPassword) {
          if (forgotPassword.status === 200) {
            var ele = document.getElementById("modal-12");
            if (ele != null) {
              ele.style.display = "none";
            }
            const msg = forgotPassword.data.message;
            utils.showSuccess(msg);
          } else {
            const msg = forgotPassword.data.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async login() {
    this.setState({
      isButton: true,
    });
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        emailerror: this.state.emailerror = "",
        passworderror: this.state.passworderror = "",
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
          .then((res: any) => {
            console.log("login", res);
            if (res) {
              if (res.data.status === 200) {
                this.setState({
                  isButton: false,
                });
                var userData = res.data.resultObject;
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", userData.token);
                const msg = res.data.message;
                utils.showSuccess(msg);
                this.props.history.push("/dashboard");
              } else {
                const msg = res.data.message;
                utils.showError(msg);
              }
            } else {
              const msg1 = "Internal server error";
              utils.showError(msg1);
            }
          });
      }
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
                        <a
                          href=""
                          className="btn-link"
                          data-toggle="modal"
                          data-target="#modal-12"
                        >
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

          <div
            className="modal fade"
            id="modal-12"
            tabIndex={1}
            role="dialog"
            aria-labelledby="modal-12"
          >
            <div
              className="modal-dialog modal-dialog-centered modal-min"
              role="document"
            >
              <div className="modal-content">
                <div className="modal-body text-center">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>{" "}
                  <i className="flaticon-secure-shield d-block"></i>
                  <h1>
                    <b>{constant.reset}</b>
                  </h1>
                  <p>
                    <b>{constant.enter}</b>
                  </p>
                  <form method="post">
                    <div className="ms-form-group has-icon">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="form-control"
                        onChange={this.handleChangeEventPassword}
                      />
                      <i className="material-icons">email</i>
                    </div>
                    <div className="mb-4 text-danger">
                      {this.state.emailerror}
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary shadow-none"
                      onClick={this.forgotpassword}
                    >
                      {constant.reset}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default Login;
