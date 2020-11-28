import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  CustomInput,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import './business.css';
import Switch from "react-switch";
import constant from "../../../constant/constant";
import {
  bussinessCreateRequest,
  bussinessUpdateRequest,
  getDataByIdRequest,
  businessState,
} from "../../../modelController";
import { MerchantAPI } from "../../../service/index.service";
import { TimePicker } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

class MerchantBusiness extends React.Component<{
  history: any;
  location: any;
}> {

  /** Merchant BusinessPage State */
  businessState: businessState = constant.merchantBussinessPage.state;
  state = {
    merchant: this.businessState.merchant,
    merchanterror: this.businessState.merchanterror,
    days: this.businessState.days,
    dayserror: this.businessState.dayserror,
    hours: this.businessState.hours,
    hourserror: this.businessState.hourserror,
    isOpen: this.businessState.isOpen,
    updateTrue: this.businessState.updateTrue,
    merchantdata: this.businessState.merchantdata,
    businessid: this.businessState.businessid,
  };

  /** Constructor call */
  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addBusinessMerchant = this.addBusinessMerchant.bind(this);
    this.updateBusinessMerchant = this.updateBusinessMerchant.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.getMerchantList = this.getMerchantList.bind(this);
    this.getHoursById = this.getHoursById.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /** Page render call */
  async componentDidMount() {
    const businessId = this.props.location.pathname.split("/")[2];
    if (businessId !== undefined) {
      this.getHoursById(businessId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        businessid: this.state.businessid = businessId,
      });
    }
    this.getMerchantList();
    if (this.state.updateTrue === true) {
      document.title =
        constant.merchantBussinessPage.title.updateMerchantHoursTitle +
        utils.getAppName();
    } else {
      document.title =
        constant.merchantBussinessPage.title.addMerchantHoursTitle +
        utils.getAppName();
    }
    const users: any = localStorage.getItem("user");
    let user = JSON.parse(users);
    this.setState({
      merchant: this.state.merchant = user.merchantID,
    });
  }

  /** Get Merchant business hours data */
  async getHoursById(businessId: any) {
    const obj:getDataByIdRequest = {
      id: businessId,
    };
    const getHoursById: any = await MerchantAPI.getHoursById(obj);
    // console.log("getHoursById", getHoursById);

    if (getHoursById) {
      if(getHoursById.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        // merchant:this.state.merchant =  getHoursById.resultObject.merchantId,
        days: this.state.days = getHoursById.resultObject.days,
        hours: this.state.hours = getHoursById.resultObject.hours,
        isOpen: this.state.isOpen = getHoursById.resultObject.isOpen,
      });
    } else {
      const msg1 = getHoursById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal Server Error";
      // utils.showError(msg1);
    }
  }

  /** Get Merchant list */
  async getMerchantList() {
    var getMerchantList = await MerchantAPI.getMerchantList();
    // console.log("getMerchantList", getMerchantList);

    if (getMerchantList) {
      if(getMerchantList.status === 200) {
      this.setState({
        merchantdata: this.state.merchantdata = getMerchantList.resultObject,
      });
    } else {
      const msg1 = getMerchantList.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /**
   * 
   * @param time : time value
   * @param timeString : time value in string
   */
  onChange(time: any, timeString: any) {
    this.setState({
      hours:timeString
    })
  }

  /**
   * 
   * @param checked : boolean value 
   */
  handleChange(checked: boolean) {
    this.setState({ isOpen:checked });
  }

  /** Check validate or not */
  validate() {
    let dayserror = "";
    let hourserror = "";
    let merchanterror = "";

    if (!this.state.merchant) {
      merchanterror = "please select merchant";
    }

    if (!this.state.days) {
      dayserror = "please enter days";
    }

    if (!this.state.hours) {
      hourserror = "please enter hours";
    } 

    if (merchanterror || dayserror || hourserror) {
      this.setState({ merchanterror, dayserror, hourserror });
      return false;
    }
    return true;
  }

  /**
   * 
   * @param e : select day value 
   */
  onItemSelect(e: any) {
    this.setState({
      days:e.target.value,
    });
  }

  /**
   * 
   * @param event : update state value
   */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Add Business merchant */
  async addBusinessMerchant() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchanterror: "",
        dayserror: "",
        hourserror: "",
      });
      if (this.state.merchant && this.state.days && this.state.hours) {
        const obj: bussinessCreateRequest = {
          merchantId: parseInt(this.state.merchant),
          days: this.state.days,
          hours: this.state.hours,
          isOpen: this.state.isOpen,
        };

        const addMerchantBusiness = await MerchantAPI.addMerchantBusiness(obj);
        // console.log("addMerchantBusiness", addMerchantBusiness);

        if (addMerchantBusiness) {
          if(addMerchantBusiness.status === 200) {
            const msg1 = addMerchantBusiness.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-business-hours");
        } else {
          const msg1 = addMerchantBusiness.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  /** Update Business merchant */
  async updateBusinessMerchant() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        merchanterror: "",
        dayserror: "",
        hourserror: "",
      });
      if (this.state.merchant && this.state.days && this.state.hours) {
        const obj: bussinessUpdateRequest = {
          merchantBusinessHoursId: parseInt(this.state.businessid),
          merchantId: parseInt(this.state.merchant),
          days: this.state.days,
          hours: this.state.hours,
          isOpen: this.state.isOpen,
        };

        const updateMerchantBusiness = await MerchantAPI.updateMerchantBusiness(
          obj
        );
        // console.log("updateMerchantBusiness", updateMerchantBusiness);

        if (updateMerchantBusiness) {
          if(updateMerchantBusiness.status === 200) {
            const msg1 = updateMerchantBusiness.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-business-hours");
        } else {
          const msg1 = updateMerchantBusiness.message;
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
       
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1 className="userbutton1">
                            {
                              constant.merchantBussinessPage.title
                                .updateMerchantHoursTitle
                            }
                          </h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1 className="userbutton1">
                            {
                              constant.merchantBussinessPage.title
                                .addMerchantHoursTitle
                            }
                          </h1>
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
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {
                                constant.merchantBussinessPage
                                  .merchantHoursTableColumn.selectday
                              }
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="days"
                              onChange={this.onItemSelect}
                              value={this.state.days ? this.state.days : ""}
                            >
                              <option value="">
                                {
                                  constant.merchantBussinessPage
                                    .merchantHoursTableColumn.selectday
                                }
                              </option>
                              {constant.merchantBussinessPage.days.length > 0
                                ? constant.merchantBussinessPage.days.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.dayserror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="12" sm="12" md="6" lg="6" xl="6">
                    <Label for="exampleCustomSelect">
                              {
                                constant.merchantBussinessPage
                                  .merchantHoursTableColumn.selecttime
                              }
                            </Label>
                      <div>
                        {
                          this.state.updateTrue === true ? (
                            this.state.hours ? (
                              <TimePicker
                              defaultValue={moment(`${this.state.hours ? this.state.hours : '00:00:00'}`,"HH:mm:ss")}
                                onChange={this.onChange}
                              />
                            ) : (null)
                          ) : (
                            <TimePicker
                              onChange={this.onChange}
                            />
                          )
                        }
                     
                        <div className="mb-4 text-danger">
                            {this.state.hourserror}
                          </div>
                      </div>
                      </Col>

                      {/* <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="Hours">
                            {
                              constant.merchantBussinessPage
                                .merchantHoursTableColumn.hours
                            }
                          </Label>
                          <Input
                            type="text"
                            id="Hours"
                            name="hours"
                            className="form-control"
                            value={this.state.hours}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your hours"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.hourserror}
                          </div>
                        </FormGroup>
                      </Col> */}
                    </Row>
                    <Row className="mt-3">
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <label>
                          <span>
                            {
                              constant.merchantBussinessPage
                                .merchantHoursTableColumn.IsOpen
                            }
                          </span>
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
                        onClick={this.updateBusinessMerchant}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addBusinessMerchant}
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

export default MerchantBusiness;
