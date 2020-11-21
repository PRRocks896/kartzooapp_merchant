import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../service/service';
import utils from '../../utils';
import history from '../../history';
import Constant from '../../constant/constant';
import constant from '../../constant/constant';
import { registerCreateRequest } from '../../modelController/registerModel';

class Signup extends React.Component<{ history: any }> {

    state = {
        firstname: '',
        firstnameerror: '',
        lastname: '',
        lastnameerror: '',
        email: '',
        emailerror: '',
        password: '',
        passworderror: ''
    }

    constructor(props: any) {
        super(props);
        this.handleChangeEvent = this.handleChangeEvent.bind(this);
        this.signup = this.signup.bind(this);
    }

    async componentDidMount() {
        document.title = constant.signupTitle + utils.getAppName();
    
    }

    handleChangeEvent(event: any) {
        event.preventDefault();
        const state: any = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    validate() {
        let firstnameerror = "";
        let lastnameerror = "";
        let emailerror = "";
        let passworderror = "";

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

        if (!this.state.password) {
            passworderror = "please enter password";
        }

        if (firstnameerror || lastnameerror || emailerror || passworderror) {
            this.setState({ firstnameerror, lastnameerror, emailerror, passworderror });
            return false;
        }
        return true;
    };

    signup() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                firstnameerror: this.state.firstnameerror = '',
                lastnameerror: this.state.lastnameerror = '',
                emailerror: this.state.emailerror = '',
                passworderror: this.state.passworderror = ''
            })
            if (this.state.firstname && this.state.lastname && this.state.email && this.state.password) {
                const obj : registerCreateRequest = {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: this.state.password
                }

                // var signupUser = await API.signupUser(obj);
                // // console.log("signupUser",signupUser);

                if (this.state.firstname === obj.firstname && this.state.lastname === obj.lastname && this.state.email === obj.email && this.state.password === obj.password) {
                    const msg = "Signup Successfully";
                    utils.showSuccess(msg);
                    this.props.history.push('/login');
                } else {
                    const msg1 = "Error";
                    utils.showError(msg1);
                }
            }
        };
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
                <div className="ms-aside-overlay ms-overlay-left ms-toggler" data-target="#ms-side-nav" data-toggle="slideLeft"></div>
                <div className="ms-aside-overlay ms-overlay-right ms-toggler" data-target="#ms-recent-activity" data-toggle="slideRight"></div>
                <main className="body-content">
                    <div className="ms-content-wrapper ms-auth">
                        <div className="ms-auth-container">
                            <div className="ms-auth-col">
                                <div className="ms-auth-bg"></div>
                            </div>
                            <div className="ms-auth-col">
                                <div className="ms-auth-form">
                                    <form className="needs-validation">
                                        <h3><b>{Constant.signup}</b></h3>
                                        <p>{Constant.signuppage} </p>
                                        <div className="form-row">
                                            <div className="col-md-6 ">
                                                <label><b>{Constant.firstname}</b></label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="firstname"
                                                        className="form-control"
                                                        id="validationCustom01"
                                                        placeholder="First name"
                                                        onChange={this.handleChangeEvent}
                                                    />
                                                    <div className="valid-feedback">
                                                        Looks good!
                    </div>
                                                </div>
                                                <div className="mb-4 text-danger">
                                                    {this.state.firstnameerror}
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <label><b>{Constant.lastname}</b></label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        name="lastname"
                                                        className="form-control"
                                                        id="validationCustom02"
                                                        placeholder="Last name"
                                                        onChange={this.handleChangeEvent}
                                                    />
                                                    <div className="valid-feedback">
                                                        Looks good!
                    </div>
                                                </div>
                                                <div className="mb-4 text-danger">
                                                    {this.state.lastnameerror}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="col-md-12 ">
                                                <label><b>{Constant.email}</b></label>
                                                <div className="input-group">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="form-control"
                                                        id="validationCustom03"
                                                        placeholder="Email Address"
                                                        onChange={this.handleChangeEvent}
                                                    />

                                                </div>
                                                <div className="mb-4 text-danger">
                                                    {this.state.emailerror}
                                                </div>
                                            </div>
                                            <div className="col-md-12 ">
                                                <label><b>{Constant.password}</b></label>
                                                <div className="input-group">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        className="form-control"
                                                        id="validationCustom04"
                                                        placeholder="Password"
                                                        onChange={this.handleChangeEvent}
                                                    />

                                                </div>
                                                <div className="mb-4 text-danger">
                                                    {this.state.passworderror}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-check pl-0">
                                                <label className="ms-checkbox-wrap">
                                                    <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required />
                                                    <i className="ms-checkbox-check"></i>
                                                </label>
                                                <span> <b>Agree to terms and conditions </b></span>
                                            </div>
                                        </div>
                                        <button
                                            className="btn mt-4 d-block w-100"
                                            type="button"
                                            style={{ backgroundColor: '#eea218', color: '#fff',fontWeight: 500 }}
                                            onClick={this.signup}
                                        >
                                            {Constant.signup}
                                        </button>
                                        <p className="mb-0 mt-3 text-center">Already have an account?<Link className="btn-link" style={{ color: '#eea218' }} to="/login"> {Constant.login}</Link></p>
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

export default Signup;
