import React from "react";
import { Link } from "react-router-dom";
import utils from "../../../utils";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";

import {API} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewUser extends React.Component<{ history: any; location: any }> {

  state = {
    userdata: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      file: null,
    },
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    document.title = constant.userPage.title.viewUserTitle + utils.getAppName();
    const usderId = this.props.location.pathname.split("/")[2];
    if (usderId !== undefined) {
      const obj = {
        id: usderId,
      };
      const getUserById: any = await API.getUserById(obj);
      if (getUserById) {
        if (getUserById.status === 200) {
          this.setState({
            userdata: {
              firstName: getUserById.resultObject.firstName,
              lastName: getUserById.resultObject.lastName,
              email: getUserById.resultObject.email,
              phone: getUserById.resultObject.phone,
              file: getUserById.resultObject.photoPath,
            },
          });
        } else {
          const msg1 = getUserById.message;
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
       
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
    <h1>{constant.userPage.viewuser.viewdetails}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/users">
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
                          <Label htmlFor="first_name">
                            <b>{constant.userPage.userTableColumn.firstname}</b>
                          </Label>
                          <p>{this.state.userdata.firstName}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="last_name">
                            <b>{constant.userPage.userTableColumn.lastname}</b>
                          </Label>
                          <p>{this.state.userdata.lastName}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="email">
                            <b>{constant.userPage.userTableColumn.email}</b>
                          </Label>
                          <p>{this.state.userdata.email}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
    <b>{constant.userPage.userTableColumn.mobilenumber}</b>
                          </Label>
                          <p>{this.state.userdata.phone}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>{constant.userPage.userTableColumn.userimage}</b>
                          </p>
                          <div>
                            {this.state.userdata.file != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.filepath + this.state.userdata.file
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
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

export default ViewUser;
