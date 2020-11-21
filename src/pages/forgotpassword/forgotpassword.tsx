import React from 'react';
import { Link } from 'react-router-dom';

class ForgotPassword extends React.Component {
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
                                    <h3><b>Forgot Password</b></h3>
                                    <p>Please enter your email to continue</p>
                                    <div className="mb-3">
                                        <label><b>Email Address</b></label>
                                        <div className="input-group">
                                            <input type="email" className="form-control" id="validationCustom08" placeholder="Email Address" required />
                                            <div className="invalid-feedback">Please provide a valid email.</div>
                                        </div>
                                    </div>
                                    <button className="btn mt-4 d-block w-100" type="button" style={{ backgroundColor: '#eea218', color: '#fff' }}>Forgot Password</button>
                                    <p className="mb-0 mt-3 text-center"><b style={{ color: '#eea218' }}><Link to="/">Back To Login</Link></b>
                                    </p>
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

export default ForgotPassword;
