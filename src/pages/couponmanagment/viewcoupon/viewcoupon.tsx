import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import NavBar from "../../navbar/navbar";
import { CategoryAPI, CouponAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewCoupon extends React.Component<{ history: any; location: any }> {
  couponState = constant.couponPage.state;
  state = {
    checked: this.couponState.checked,
    couponcode: this.couponState.couponcode,
    percentage: this.couponState.percentage,
    discountprice: this.couponState.discountprice,
    startdate: this.couponState.startdate,
    enddate: this.couponState.enddate,
    discription: this.couponState.discription,
    minamountorder: this.couponState.minamountorder,
    title: this.couponState.title,
    isByPrice: this.couponState.isByPrice,
    isActive: this.couponState.isActive,
  };

  constructor(props: any) {
    super(props);
    this.IOSDateToYYYYMMDD = this.IOSDateToYYYYMMDD.bind(this);
    this.getCouponById = this.getCouponById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.couponPage.viewcouponpagedetails.viewcoupon + utils.getAppName();
    const couponId = this.props.location.pathname.split("/")[2];
    if (couponId !== undefined) {
      this.getCouponById(couponId);
    }
  }

  IOSDateToYYYYMMDD(d: any) {
    const date = new Date(d);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let dt: any = date.getDate();
    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return year + "-" + month + "-" + dt;
  }

  async getCouponById(id: any) {
    const obj = {
      id: id,
    };
    const getCouponById: any = await CouponAPI.getCouponById(obj);
    console.log("getCouponById", getCouponById);

    if (getCouponById) {
      if (getCouponById.status === 200) {
        this.setState({
          couponcode: this.state.couponcode =
            getCouponById.resultObject.couponCode,
          percentage: this.state.percentage =
            getCouponById.resultObject.percentage,
          discountprice: this.state.discountprice =
            getCouponById.resultObject.discountPrice,
          startdate: this.state.startdate =
            getCouponById.resultObject.startDate,
          enddate: this.state.enddate = getCouponById.resultObject.endDate,
          discription: this.state.discription =
            getCouponById.resultObject.description,
          minamountorder: this.state.minamountorder =
            getCouponById.resultObject.minAmountOrder,
          title: this.state.title = getCouponById.resultObject.title,
          isByPrice: this.state.isByPrice =
            getCouponById.resultObject.isByPrice
        });
        this.setState({
          startdate: this.state.startdate = this.IOSDateToYYYYMMDD(
            this.state.startdate
          ),
          enddate: this.state.enddate = this.IOSDateToYYYYMMDD(
            this.state.enddate
          ),
        });
      } else {
        const msg1 = getCouponById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal Server";
      utils.showError(msg1);
    }
  }

  render() {
    return (
      <>
        <NavBar>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1>
                          {constant.couponPage.viewcouponpagedetails.viewcoupon}
                        </h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/listcoupon">
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
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.couponCode}
                            </b>
                          </Label>
                          <p>{this.state.couponcode}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>{constant.couponPage.couponTableColumn.title}</b>
                          </Label>
                          <p>{this.state.title}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.startDate}
                            </b>
                          </Label>
                          <p>{this.state.startdate}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.endDate}
                            </b>
                          </Label>
                          <p>{this.state.enddate}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.couponPage.couponTableColumn
                                  .discountPrice
                              }
                            </b>
                          </Label>
                          <p>{this.state.discountprice}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {constant.couponPage.couponTableColumn.percentage}
                            </b>
                          </Label>
                          <p>{this.state.percentage}%</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.couponPage.couponTableColumn
                                  .minAmountOrder
                              }
                            </b>
                          </Label>
                          <p>{this.state.minamountorder}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.couponPage.couponTableColumn
                                  .description
                              }
                            </b>
                          </Label>
                          <p>{this.state.discription}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </NavBar>
      </>
    );
  }
}

export default ViewCoupon;
