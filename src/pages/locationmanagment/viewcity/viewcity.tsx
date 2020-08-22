import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import NavBar from "../../navbar/navbar";
import {LocationAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewCity extends React.Component<{ history: any; location: any }> {
  state = {
    statename: "",
    cityname: "",
  };

  async componentDidMount() {
    document.title = constant.cityPage.title.viewCityTitle + utils.getAppName();
    const cityId = this.props.location.pathname.split("/")[2];
    if (cityId !== undefined) {
      const obj = {
        id: cityId,
      };
      const getCityById: any = await LocationAPI.getCityById(obj);
      console.log("getCityById", getCityById);

      if (getCityById) {
        if (getCityById.status === 200) {
          this.setState({
            statename: this.state.statename =
              getCityById.resultObject.stateName,
            cityname: this.state.cityname = getCityById.resultObject.cityName,
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
    <h1>{constant.cityPage.viewcitydetails.viewcity}</h1>
                      </Col>
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
                            <b>{constant.cityPage.cityTableColumn.cityName}</b>
                          </Label>
                          <p>{this.state.cityname}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {constant.cityPage.cityTableColumn.stateName}
                              </b>
                            </Label>
                            <p>{this.state.statename}</p>
                          </FormGroup>
                        </Form>
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

export default ViewCity;
