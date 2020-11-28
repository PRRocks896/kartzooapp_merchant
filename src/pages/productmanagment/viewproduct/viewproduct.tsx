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
import constant from "../../../constant/constant";
import { ProductAPI } from "../../../service/index.service";
import { addProductStateRequest } from "../../../modelController";

class ViewProduct extends React.Component<{ history: any; location: any }> {
  productState : addProductStateRequest = constant.productPage.state;
  state = {
    merchantid: this.productState.merchantid,
    maincategoryid: this.productState.maincategoryid,
    productname: this.productState.productname,
    productdescription: this.productState.productdescription,
    price: this.productState.price,
    discountprice: this.productState.discountprice,
    metatitle: this.productState.metatitle,
    metadiscription: this.productState.metadiscription,
    metakeyword: this.productState.metakeyword,
    sortorder: this.productState.sortorder,
    images: this.productState.images,
    isFeatured: this.productState.isFeatured,
  };

  constructor(props: any) {
    super(props);
    this.getProductById = this.getProductById.bind(this);
    this.createMarkup = this.createMarkup.bind(this);
  }

  async componentDidMount() {
    document.title =
      constant.productPage.title.viewProductTitle + utils.getAppName();
    const productId = this.props.location.pathname.split("/")[2];
    if (productId !== undefined) {
      this.getProductById(productId);
    }
  }

  createMarkup()  { 
    if(this.state.productdescription) {
      return {__html: this.state.productdescription}; 
    } else {
      return {__html:'N/A'}
    }
};

  async getProductById(id: any) {
    const getProductById: any = await ProductAPI.getProductById(id);
    // console.log("getProductById", getProductById);

    if (getProductById) {
      if(getProductById.status === 200) {
      this.setState({
        merchantid: this.state.merchantid =
          getProductById.resultObject.merchantName,
        maincategoryid: this.state.maincategoryid =
          getProductById.resultObject.categoryName,
        prodctname: this.state.productname =
          getProductById.resultObject.productName,
        price: this.state.price = getProductById.resultObject.price,
        discountprice: this.state.discountprice =
          getProductById.resultObject.discountPrice,
        metatitle: this.state.metatitle =
          getProductById.resultObject.metaTitle,
        metadescritption: this.state.metadiscription =
          getProductById.resultObject.metaDescription,
        metakeyword: this.state.metakeyword =
          getProductById.resultObject.metaKeyword,
        productdescription: this.state.productdescription =
          getProductById.resultObject.productDesc,
        sortorder: this.state.sortorder =
          getProductById.resultObject.sortOrder,
        isFeatured: this.state.isFeatured =
          getProductById.resultObject.isFeatured,
        images: this.state.images = getProductById.resultObject.productImages,
      });
    } else {
      const msg1 = getProductById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  render() {
    return (
      <>
        <>
          <div className="ms-content-wrapper">
            <div className="row">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col xs="12" sm="6" md="9" lg="9" xl="9">
                        <h1 className="userbutton1">
                          {constant.productPage.viewproductdetails.viewproduct}
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
                        <Link to="/list-product">
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
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="first_name">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .merchantid
                              }
                            </b>
                          </Label>
                          <p>{this.state.merchantid ? this.state.merchantid : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="last_name">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .categoryid
                              }
                            </b>
                          </Label>
                          <p>{this.state.maincategoryid ? this.state.maincategoryid : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .prodctname
                              }
                            </b>
                          </Label>
                          <p>{this.state.productname ? this.state.productname : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                    <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .metakeyword
                              }
                            </b>
                          </Label>
                          <p>{this.state.metakeyword ? this.state.metakeyword : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {constant.productPage.productTableColumn.price}
                            </b>
                          </Label>
                          <p>{this.state.price ? this.state.price : '0'}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .discountPrice
                              }
                            </b>
                          </Label>
                          <p>{this.state.discountprice ? this.state.discountprice : '0'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                     
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .metatitle
                              }
                            </b>
                          </Label>
                          <p>{this.state.metatitle ? this.state.metatitle : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .sortOrder
                              }
                            </b>
                          </Label>
                          <p>{this.state.sortorder ? this.state.sortorder : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                      {/* <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .isFeatured
                              }
                            </b>
                          </Label>
                          <p>{this.state.isFeatured ? this.state.isFeatured : 'N/A'}</p>
                        </FormGroup>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .productdescription
                              }
                            </b>
                          </Label>
                          <p dangerouslySetInnerHTML={this.createMarkup()}></p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            <b>
                              {
                                constant.productPage.productTableColumn
                                  .metadescritption
                              }
                            </b>
                          </Label>
                          <p>{this.state.metadiscription ? this.state.metadiscription : 'N/A'}</p>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      <Col xs="12" sm="12" md="12" lg="12" xl="12">
                      <Label htmlFor="mobile_no">
                          <b>
                            {
                              constant.productPage.productTableColumn
                                .images
                            }
                          </b>
                        </Label>
                        <div className="image_margin">
                          {this.state.images.length > 0
                            ? this.state.images.map((img: any, index: any) =>
                                img.imagePath !== null ? (
                                  <img
                                    key={index}
                                    className="picture"
                                    alt="previewImg"
                                    src={
                                      constant.fileMerchantpath + img.imagePath
                                    }
                                  />
                                ) : (
                                  ""
                                )
                              )
                            : "N/A"}
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </div>
          </div>
        </>
      </>
    );
  }
}

export default ViewProduct;
