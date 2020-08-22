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
  Form,
  CustomInput,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import NavBar from "../../navbar/navbar";
import {LocationAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";
import {
  cityCreateRequest,
  cityUpdateRequest,
} from "../../../modelController";

class AddCity extends React.Component<{ history: any; location: any }> {
  cityState = constant.cityPage.state;
  state = {
    stateid: this.cityState.stateid,
    stateiderror: this.cityState.stateiderror,
    cityname: this.cityState.cityname,
    citynameerror: this.cityState.citynameerror,
    selectedFileerror: this.cityState.selectedFileerror,
    selectedStateerror: this.cityState.selectedStateerror,
    statelist: this.cityState.statelist,
    updateTrue: this.cityState.updateTrue,
    statename: this.cityState.statename,
    cityid: this.cityState.cityid,
    isActive:this.cityState.isActive
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addCity = this.addCity.bind(this);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.editCity = this.editCity.bind(this);
    this.getState = this.getState.bind(this);
    this.getCityById = this.getCityById.bind(this);
  }

  async componentDidMount() {
    this.getState();
    const cityId = this.props.location.pathname.split("/")[2];
    if (cityId !== undefined) {
      this.getCityById(cityId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.cityPage.title.updateCityTitle + utils.getAppName();
    } else {
      document.title =
        constant.cityPage.title.addCityTitle + utils.getAppName();
    }
  }

  async getState() {
    const getState = await LocationAPI.getState();
    console.log("getState", getState);

    if (getState) {
      if (getState.status === 200) {
        this.setState({
          statelist: this.state.statelist = getState.resultObject,
        });
      } else {
        const msg = getState.message;
        utils.showError(msg);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  async getCityById(cityId: any) {
    const obj = {
      id: cityId,
    };
    const getCityById: any = await LocationAPI.getCityById(obj);
    console.log("getCityById", getCityById);

    if (getCityById) {
      if (getCityById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          statename: this.state.statename = getCityById.resultObject.stateName,
          stateid: this.state.stateid = getCityById.resultObject.stateId,
          cityid: this.state.cityid = getCityById.resultObject.cityId,
          cityname: this.state.cityname = getCityById.resultObject.cityName,
          isActive: this.state.isActive = getCityById.resultObject.isActive
        });
      } else {
        const msg1 = getCityById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  validate() {
    let citynameerror = "";
    let stateiderror = "";

    if (!this.state.cityname) {
      citynameerror = "please enter city name";
    }

    if (!this.state.stateid) {
      stateiderror = "please select state";
    }

    if (citynameerror || stateiderror) {
      this.setState({ citynameerror, stateiderror });
      return false;
    }
    return true;
  }

  onItemSelect(event: any) {
    this.setState({
      stateid: this.state.stateid = event.target.value,
    });
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addCity() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        citynameerror: "",
        stateiderror: "",
      });
      if (this.state.cityname && this.state.stateid) {
        const obj: cityCreateRequest = {
          cityName: this.state.cityname,
          stateId: JSON.parse(this.state.stateid),
          isActive: this.state.isActive,
        };

        const addCity = await LocationAPI.addCity(obj);
        console.log("addCity", addCity);

        if (addCity) {
          if (addCity.status === 200) {
            const msg = addCity.message;
            utils.showSuccess(msg);
            this.props.history.push("/city");
          } else {
            const msg = addCity.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async editCity() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        citynameerror: "",
        stateiderror: "",
      });
      if (this.state.cityname && this.state.stateid && this.state.cityid) {
        const obj: cityUpdateRequest = {
          cityId: this.state.cityid,
          cityName: this.state.cityname,
          stateId: JSON.parse(this.state.stateid),
          isActive: this.state.isActive,
        };

        const editCity = await LocationAPI.editCity(obj, this.state.cityid);
        console.log("editCity", editCity);

        if (editCity) {
          if (editCity.status === 200) {
            const msg = editCity.message;
            utils.showSuccess(msg);
            this.props.history.push("/city");
          } else {
            const msg = editCity.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
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
                          <h1>{constant.cityPage.title.updateCityTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.cityPage.title.addCityTitle}</h1>
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
                        <Link to="/city">
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
                          <Label htmlFor="city_name">
                            {constant.cityPage.cityTableColumn.cityName}
                          </Label>
                          <Input
                            type="text"
                            id="city_name"
                            name="cityname"
                            className="form-control"
                            value={this.state.cityname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your city name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.citynameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
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
                              {this.state.updateTrue === true ? (
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
                                  <option value="">{constant.cityPage.cityTableColumn.selectstate}</option>
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
                              )}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.selectedStateerror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.editCity}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addCity}
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

export default AddCity;
