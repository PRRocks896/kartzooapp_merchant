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
import {LocationAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";

class AddCountry extends React.Component<{ history: any; location: any }> {
  countryState = constant.countryPage.state;
  state = {
    selectedFile: this.countryState.selectedFile,
    countryname: this.countryState.countryname,
    countrynameerror: this.countryState.countrynameerror,
    countrycode: this.countryState.countrycode,
    countrycodeerror: this.countryState.countrycodeerror,
    selectedFileerror: this.countryState.selectedFileerror,
    file: this.countryState.file,
    filetrue: this.countryState.filetrue,
    updateTrue: this.countryState.updateTrue,
    countryid: this.countryState.countryid,
    isActive:this.countryState.isActive
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.addCountry = this.addCountry.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.editCountry = this.editCountry.bind(this);
    this.getCountryById = this.getCountryById.bind(this);
  }

  async componentDidMount() {
    const countryId = this.props.location.pathname.split("/")[2];
    if (countryId !== undefined) {
      this.getCountryById(countryId);
      this.setState({
        updateTrue: this.state.updateTrue = true
      })
    }

    if (this.state.updateTrue === true) {
      document.title =
        constant.countryPage.title.updateCountryTitle + utils.getAppName();
    } else {
      document.title =
        constant.categoryPage.title.addCategoryTitle + utils.getAppName();
    }
  }

  async getCountryById(countryId:any) {
    const obj = {
      id: countryId,
    };
    const getCountryById: any = await LocationAPI.getCountryById(obj);
    console.log("getCountryById", getCountryById);

    if (getCountryById) {
      if (getCountryById.status === 200) {
        this.setState({
          updateTrue: this.state.updateTrue = true,
          filetrue: this.state.filetrue = true,
          countryname: this.state.countryname =
            getCountryById.resultObject.countryName,
          countrycode: this.state.countrycode =
            getCountryById.resultObject.countryCode,
          countryid: this.state.countryid =
            getCountryById.resultObject.countryId,
          file: this.state.file = getCountryById.resultObject.imagePath,
          selectedFile: this.state.selectedFile =
            getCountryById.resultObject.imagePath,
            isActive: this.state.isActive = getCountryById.resultObject.isActive
        });
      } else {
        const msg1 = getCountryById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    } else {
      this.setState({
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    }
  }

  validate() {
    let countrynameerror = "";
    let countrycodeerror = "";
    let selectedFileerror = "";

    if (!this.state.countryname) {
      countrynameerror = "please enter country name";
    }

    if (!this.state.countrycode) {
      countrycodeerror = "please enter country code";
    }

    if (!this.state.selectedFile) {
      selectedFileerror = "please select file";
    }

    if (countrynameerror || selectedFileerror || countrycodeerror) {
      this.setState({ countrynameerror, selectedFileerror, countrycodeerror });
      return false;
    }
    return true;
  }

  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  async addCountry() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        countrynameerror: "",
        countrycodeerror: "",
        selectedFileerror: "",
      });
      if (
        this.state.countryname &&
        this.state.selectedFile &&
        this.state.countrycode
      ) {
        let formData = new FormData();

        formData.append("countryName", this.state.countryname);
        formData.append("countryCode", this.state.countrycode);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile[0]);

        const addCountry = await LocationAPI.addCountry(formData);
        console.log("addCountry", addCountry);

        if (addCountry) {
          if (addCountry.status === 200) {
            const msg = addCountry.message;
            utils.showSuccess(msg);
            this.props.history.push("/country");
          } else {
            const msg = addCountry.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  async editCountry() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        countrynameerror: "",
        countrycodeerror: "",
        selectedFileerror: "",
      });
      if (
        this.state.countryname &&
        this.state.selectedFile &&
        this.state.countrycode
      ) {
        let formData = new FormData();
        formData.append("countryId", this.state.countryid.toString());
        formData.append("countryName", this.state.countryname);
        formData.append("countryCode", this.state.countrycode);
        formData.append("isActive", new Boolean(this.state.isActive).toString());
        formData.append("files", this.state.selectedFile[0]);

        const editCountry = await LocationAPI.editCountry(
          formData,
          this.state.countryid.toString()
        );
        console.log("editCountry", editCountry);

        if (editCountry) {
          if (editCountry.status === 200) {
            const msg = editCountry.message;
            utils.showSuccess(msg);
            this.props.history.push("/country");
          } else {
            const msg = editCountry.message;
            utils.showError(msg);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  removeIcon() {
    this.setState({
      file: this.state.file = "",
    });
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
                          <h1>{constant.countryPage.title.updateCountryTitle}</h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>{constant.countryPage.title.addCountryTitle}</h1>
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
                        <Link to="/country">
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
                          <Label htmlFor="country_name">{constant.countryPage.countryTableColumn.countryName}</Label>
                          <Input
                            type="text"
                            id="country_name"
                            name="countryname"
                            className="form-control"
                            value={this.state.countryname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your country name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.countrynameerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="country_code">{constant.countryPage.countryTableColumn.countryCode}</Label>
                          <Input
                            type="text"
                            id="country_code"
                            name="countrycode"
                            className="form-control"
                            value={this.state.countrycode}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your country code"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.countrycodeerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          {this.state.file !== "" ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  {this.state.filetrue === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file}
                                    />
                                  ) : (
                                    <img
                                      className="picture"
                                      src={this.state.file}
                                    />
                                  )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p style={{ fontSize: "16px" }}>{constant.countryPage.countryTableColumn.countryFlag}</p>
                              <Label className="imag" for="file-input">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input"
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={this.onChangeHandler.bind(this)}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.editCountry}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mr-2 custom-button"
                        onClick={this.addCountry}
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

export default AddCountry;
