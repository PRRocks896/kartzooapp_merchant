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
// import './adduser.css';
import NavBar from "../../navbar/navbar";
import constant from "../../../constant/constant";
import { ProductAPI } from "../../../service/index.service";

class ViewProductInventory extends React.Component<{
  history: any;
  location: any;
}> {
  productState = constant.productInventoryPage.state;
  state = {
    productid: this.productState.productid,
    stockqty: this.productState.stockqty,
    productdata: this.productState.productdata,
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    document.title = constant.viewInventoryProduct + utils.getAppName();
    const inventoryId = this.props.location.pathname.split("/")[2];
    if (inventoryId !== undefined) {
      this.getInventoryData(inventoryId);
    }
  }

  async getInventoryData(inventoryId: any) {
    const obj = {
      id: inventoryId,
    };
    const getInventoryData: any = await ProductAPI.getInventoryData(obj);
    console.log("getInventoryData", getInventoryData);

    if (getInventoryData.status === 200) {
      this.setState({
        productdata: this.state.productdata =
          getInventoryData.resultObject.product,
        stockqty: this.state.stockqty = getInventoryData.resultObject.stockQty,
      });
    } else {
      const msg1 = getInventoryData.message;
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
                            constant.productInventoryPage
                              .viewProductInventorydetails.viewInventoryProduct
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
                        <Link to="/list-product-inventory">
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
                            <b>
                              {
                                constant.productInventoryPage
                                  .merchantHoursTableColumn.product
                              }
                            </b>
                          </Label>
                          <p>{this.state.productdata}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="last_name">
                            <b>
                              {
                                constant.productInventoryPage
                                  .merchantHoursTableColumn.stockQty
                              }
                            </b>
                          </Label>
                          <p>{this.state.stockqty}</p>
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

export default ViewProductInventory;
