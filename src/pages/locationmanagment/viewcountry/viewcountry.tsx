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
import NavBar from "../../navbar/navbar";
import {LocationAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewCountry extends React.Component<{ history: any; location: any }> {
  state = {
    countryname: "",
    countrycode: "",
    file: null,
  };

  async componentDidMount() {
    document.title =
      constant.countryPage.title.viewCountryTitle + utils.getAppName();
    const countryId = this.props.location.pathname.split("/")[2];
    if (countryId !== undefined) {
      const obj = {
        id: countryId,
      };
      const getCountryById: any = await LocationAPI.getCountryById(obj);
      console.log("getCountryById", getCountryById);

      if (getCountryById) {
        if (getCountryById.status === 200) {
          this.setState({
            countryname: this.state.countryname =
              getCountryById.resultObject.countryName,
            countrycode: this.state.countrycode =
              getCountryById.resultObject.countryCode,
            file: this.state.file = getCountryById.resultObject.imagePath,
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
    <h1>{constant.countryPage.title.countryTitle}</h1>
                      </Col>
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
                          <Label htmlFor="country_name">
                            <b>
                              {
                                constant.countryPage.countryTableColumn
                                  .countryName
                              }
                            </b>
                          </Label>
                          <p>{this.state.countryname}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="country_code">
                            <b>
                              {
                                constant.countryPage.countryTableColumn
                                  .countryCode
                              }
                            </b>
                          </Label>
                          <p>{this.state.countrycode}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>
                              {
                                constant.countryPage.countryTableColumn
                                  .countryFlag
                              }
                            </b>
                          </p>
                          {this.state.file != null ? (
                            <div className="img-size">
                              {this.state.file ? (
                                <div>
                                  <img
                                    className="picture"
                                    src={constant.filepath + this.state.file}
                                  />
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div>
                              <i className="fa fa-user picture"></i>
                            </div>
                          )}
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

export default ViewCountry;
