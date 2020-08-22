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
import { LocationAPI, MerchantAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewMerchant extends React.Component<{
  history: any;
  location: any;
}> {
    merchantState = constant.merchantPage.state;
    state = {
      selectedFile: this.merchantState.selectedFile,
      selectedProofFile: this.merchantState.selectedProofFile,
      selectedDocumentFile: this.merchantState.selectedDocumentFile,
      firstname: this.merchantState.firstname,
      firstnameerror: this.merchantState.firstnameerror,
      lastname: this.merchantState.lastname,
      lastnameerror: this.merchantState.lastnameerror,
      email: this.merchantState.email,
      emailerror: this.merchantState.emailerror,
      mobilenumber: this.merchantState.mobilenumber,
      mobilenumbererror: this.merchantState.mobilenumbererror,
      shopname: this.merchantState.shopname,
      shopnamerror: this.merchantState.shopnamerror,
      address: this.merchantState.address,
      addresserror: this.merchantState.addresserror,
      city: this.merchantState.city,
      cityerror: this.merchantState.cityerror,
      user: this.merchantState.user,
      usererror: this.merchantState.usererror,
      zipcode: this.merchantState.zipcode,
      zipcodeerror: this.merchantState.zipcodeerror,
      latitude: this.merchantState.latitude,
      latitudeerror: this.merchantState.latitudeerror,
      longitude: this.merchantState.longitude,
      longitudeerror: this.merchantState.longitudeerror,
      website: this.merchantState.website,
      shoppingpolicy: this.merchantState.shoppingpolicy,
      shoppingpolicyerror: this.merchantState.shoppingpolicyerror,
      refundpolicy: this.merchantState.refundpolicy,
      refundpolicyerror: this.merchantState.refundpolicyerror,
      cancellationpolicy: this.merchantState.cancellationpolicy,
      cancellationpolicyerror: this.merchantState.cancellationpolicyerror,
      isOpen: this.merchantState.isOpen,
      checked: this.merchantState.checked,
      selectedFileerror: this.merchantState.selectedFileerror,
      selectedProofFileerror: this.merchantState.selectedProofFileerror,
      selectedDocumentFileerror: this.merchantState.selectedDocumentFileerror,
      password: this.merchantState.password,
      passworderror: this.merchantState.passworderror,
      citydata: this.merchantState.citydata,
      type: this.merchantState.type,
      file: this.merchantState.file,
      filetrue: this.merchantState.filetrue,
      file1: this.merchantState.file1,
      file1true: this.merchantState.file1true,
      file2: this.merchantState.file2,
      file2true: this.merchantState.file2true,
    };

  constructor(props: any) {
    super(props);
    this.getMerchantById = this.getMerchantById.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.merchantPage.viewmerchanrpagedetails.viewmerchant + utils.getAppName();
    const merchantId = this.props.location.pathname.split("/")[2];
    if (merchantId !== undefined) {
      this.getMerchantById(merchantId);
    }
  }

  async getMerchantById(id: any) {
    const getMerchantById: any = await MerchantAPI.getMerchantById(id);
    console.log("getMerchantById", getMerchantById);

    if (getMerchantById) {
      if (getMerchantById.status === 200) {
        this.setState({
            selectedFile: this.state.selectedFile = getMerchantById.resultObject.photoPath,
            selectedProofFile: this.state.selectedProofFile = getMerchantById.resultObject.merchantIDPoof,
            selectedDocumentFile: this.state.selectedDocumentFile = getMerchantById.resultObject.merchantDocument,
            firstname: this.state.firstname = getMerchantById.resultObject.firstName,
            lastname: this.state.lastname = getMerchantById.resultObject.lastName,
            email: this.state.email = getMerchantById.resultObject.email,
            mobilenumber: this.state.mobilenumber = getMerchantById.resultObject.phone,
            shopname: this.state.shopname = getMerchantById.resultObject.shopname,
            address: this.state.address = getMerchantById.resultObject.address,
            city: this.state.city = getMerchantById.resultObject.cityID,
            zipcode: this.state.zipcode = getMerchantById.resultObject.zipCode,
            latitude: this.state.latitude = getMerchantById.resultObject.latitude,
            longitude: this.state.longitude = getMerchantById.resultObject.longitude,
            website: this.state.website = getMerchantById.resultObject.website,
            shoppingpolicy: this.state.shoppingpolicy = getMerchantById.resultObject.shippingPolicy,
            refundpolicy: this.state.refundpolicy = getMerchantById.resultObject.refundPolicy,
            cancellationpolicy: this.state.cancellationpolicy = getMerchantById.resultObject.cancellationPolicy,
            password: this.state.password = getMerchantById.resultObject.password,
            file: this.state.file =  getMerchantById.resultObject.photoPath
            // filetrue: this.state.filetrue = getMerchantById.resultObject.
            // file1: this.state.file1 = getMerchantById.resultObject.
            // file1true: this.state.file1true = getMerchantById.resultObject.
            // file2: this.state.file2 = getMerchantById.resultObject.
            // file2true: this.state.file2true = getMerchantById.resultObject.
        });
      } else {
        const msg1 = getMerchantById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
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
                          {
                            constant.merchantPage.title.viewMerchantTitle
                          }
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
                        <Link to="/list-merchant">
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
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn.Firstname
                              }
                            </b>
                          </Label>
                          <p>{this.state.firstname}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                 constant.merchantPage.merchantTableColumn.lastname
                                }
                              </b>
                            </Label>
                            <p>{this.state.lastname}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn.email
                              }
                            </b>
                          </Label>
                          <p>{this.state.email}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                 constant.merchantPage.merchantTableColumn.phone
                                }
                              </b>
                            </Label>
                            <p>{this.state.mobilenumber}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn.password
                              }
                            </b>
                          </Label>
                          <p>{this.state.password}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                 constant.merchantPage.merchantTableColumn.shopname
                                }
                              </b>
                            </Label>
                            <p>{this.state.shopname}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn.latitude
                              }
                            </b>
                          </Label>
                          <p>{this.state.latitude}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                 constant.merchantPage.merchantTableColumn.longitude
                                }
                              </b>
                            </Label>
                            <p>{this.state.longitude}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="state_name">
                            <b>
                              {
                                constant.merchantPage.merchantTableColumn.Address
                              }
                            </b>
                          </Label>
                          <p>{this.state.address}</p>
                        </FormGroup>
                      </Col>

                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              <b>
                                {
                                 constant.merchantPage.merchantTableColumn.website
                                }
                              </b>
                            </Label>
                            <p>{this.state.website}</p>
                          </FormGroup>
                        </Form>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>{constant.merchantPage.merchantTableColumn.selectedFile}</b>
                          </p>
                          <div>
                            {this.state.file != null ? (
                              <img
                                className="picture"
                                src={
                                  constant.fileMerchantpath + this.state.file
                                }
                              />
                            ) : (
                              <i className="fa fa-user"></i>
                            )}
                          </div>
                        </FormGroup>
                      </Col>
                      {/* <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                            <b>{constant.userPage.userTableColumn.userimage}</b>
                          </p>
                          <div>
                            {this.state.file != null ? (
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
                      </Col> */}
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

export default ViewMerchant;
