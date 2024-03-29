import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";

import './viewhours.css';
import {MerchantAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { businessState, getDataByIdRequest } from "../../../modelController";

class ViewBusinessHours extends React.Component<{
  history: any;
  location: any;
}> {
  /** Business State */
  businessState : businessState = constant.merchantBussinessPage.state;
  state = {
    days: this.businessState.days,
    hours: this.businessState.hours,
    name: this.businessState.merchant,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.getBusinessById = this.getBusinessById.bind(this);
  }

  /** Page Render Call */
  async componentDidMount() {
    document.title =
      constant.merchantBussinessPage.viewmerchantbusinesshoursdetails
        .viewmerchant + utils.getAppName();
    const businessId = this.props.location.pathname.split("/")[2];
    if (businessId !== undefined) {
      this.getBusinessById(businessId);
    }
  }

  /**
   * 
   * @param id : get business hours by id 
   */
  async getBusinessById(id: getDataByIdRequest) {
    const getBusinessById: any = await MerchantAPI.getBusinessById(id);
    // console.log("getBusinessById", getBusinessById);

    if (getBusinessById) {
      if(getBusinessById.status === 200) {
      this.setState({
        days: this.state.days = getBusinessById.resultObject.days,
        hours: this.state.hours = getBusinessById.resultObject.hours,
      });
    } else {
      const msg1 = getBusinessById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Render DOM */
  render() {
    return (
      <>
       
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1 className="userbutton1">
                          {
                            constant.merchantBussinessPage
                              .viewmerchantbusinesshoursdetails.viewmerchant
                          }
                        </h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="userbutton"
                      >
                        <Link to="/list-business-hours">
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
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <FormGroup className="view_user">
                          <div>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantBussinessPage
                                  .merchantHoursTableColumn.days
                              } :
                            </b>
                          </Label>
                          <span>{this.state.days}</span>
                          </div>
                          <div>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                  constant.merchantBussinessPage
                                    .merchantHoursTableColumn.hours
                                } :
                              </b>
                            </Label>
                            <span>{this.state.hours}</span>
                          </div>
                          </FormGroup>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
       
      </>
    );
  }
}

export default ViewBusinessHours;
