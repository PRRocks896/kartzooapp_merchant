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
  Form,
  CustomInput,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import Switch from "react-switch";
import constant from "../../../constant/constant";
import Merchant from "../merchant/merchant";
import {
  bussinessCreateRequest,
  bussinessUpdateRequest,
} from "../../../modelController";
import { MerchantAPI } from "../../../service/index.service";

class MerchantBusiness extends React.Component<{ history: any }> {
  businessState = constant.merchantBussinessPage.state;
  state = {
    merchant: this.businessState.merchant,
    merchanterror: this.businessState.merchanterror,
    days: this.businessState.days,
    dayserror: this.businessState.dayserror,
    hours: this.businessState.hours,
    hourserror: this.businessState.hourserror,
    isOpen: this.businessState.isOpen,
    updateTrue: this.businessState.updateTrue,
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addBusinessMerchant = this.addBusinessMerchant.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
  }

  async componentDidMount() {
      if(this.state.updateTrue === true) {
        document.title = constant.merchantBussinessPage.title.updateMerchantHoursTitle + utils.getAppName();
      } else {
          document.title = constant.merchantBussinessPage.title.addMerchantHoursTitle + utils.getAppName();
      }
  }

  handleChange(checked: boolean) {
    this.setState({ isOpen: this.state.isOpen = checked });
  }

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

  onItemSelect(e: any) {
    this.setState({
      merchant: this.state.merchant = e.target.value,
    });
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

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
        console.log("addMerchantBusiness", addMerchantBusiness);

        if (addMerchantBusiness) {
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }

        // if (this.state.days === obj.days && this.state.hours === obj.hours) {
        //   const msg = "Merchant Business Added Successfully";
        //   utils.showSuccess(msg);
        // } else {
        //   const msg1 = "Error";
        //   utils.showError(msg1);
        // }
      }
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {
                              constant.merchantBussinessPage.title
                                .updateMerchantHoursTitle
                            }
                          </h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
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
                        className="search_right"
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
                              {constant.cityPage.cityTableColumn.selectstate}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              onChange={this.onItemSelect}
                            >
                              <option value="">
                                {
                                  constant.merchantBussinessPage
                                    .merchantHoursTableColumn.merchantname
                                }
                              </option>

                              {/* {this.state.updateTrue === true ? (
                                <>
                                  <option value="">
                                    {this.state.statename}
                                  </option>
                                  {this.state.statelist.length > 0
                                    ? this.state.statelist.map(
                                        (data: any, index: any) => (
                                          <option
                                            key={index}
                                            value={data.value}
                                          >
                                            {data.name}
                                          </option>
                                        )
                                      )
                                    : ""}
                                </>
                              ) : (
                                <>
                                  <option value="">
                                    {
                                      constant.cityPage.cityTableColumn
                                        .selectstate
                                    }
                                  </option>
                                  {this.state.statelist.length > 0
                                    ? this.state.statelist.map(
                                        (data: any, index: any) => (
                                          <option
                                            key={index}
                                            value={data.value}
                                          >
                                            {data.name}
                                          </option>
                                        )
                                      )
                                    : ""}
                                </>
                              )} */}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.merchanterror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="Days">
                            {
                              constant.merchantBussinessPage
                                .merchantHoursTableColumn.days
                            }
                          </Label>
                          <Input
                            type="text"
                            id="Days"
                            name="days"
                            className="form-control"
                            // value={this.state.categoryname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your days"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.dayserror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
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
                            // value={this.state.categoryname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your hours"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.hourserror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
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
                        onClick={this.addBusinessMerchant}
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
        </NavBar>
      </>
    );
  }
}

export default MerchantBusiness;
