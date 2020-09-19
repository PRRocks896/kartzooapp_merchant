import React, { Component } from "react";
import './pagenotfound.css';
import { Link } from "react-router-dom";
import constant from "../../constant/constant";

class Page404 extends Component {
  render() {
    return (
      <div className="main-box-404">
      <div className="page-404">
        <h2>Oops! Page not found.</h2>
        <h1>404</h1>
        <p>We can't find the page you're looking for.</p>
    <Link to="/dashboard">{constant.pageNotFound.gobackhome}</Link>
      </div>
      </div>
    );
  }
}

export default Page404;
