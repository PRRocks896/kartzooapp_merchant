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
  CustomInput,
  Form,
  Row,
} from "reactstrap";
import "./inventoryproduct.css";
import constant from "../../../constant/constant";
import {
  inventoryCreateRequest,
  inventoryUpdateRequest,
  addInventoryState,
} from "../../../modelController/productInventoryModel";
import { ProductAPI } from "../../../service/index.service";
import { getDataByIdRequest } from "../../../modelController";

class InventoryProduct extends React.Component<{
  history: any;
  location: any;
}> {
  productState: addInventoryState = constant.productInventoryPage.state;
  state = {
    productid: this.productState.productid,
    productiderror: this.productState.productiderror,
    stockqty: this.productState.stockqty,
    stockqtyerror: this.productState.stockqtyerror,
    updateTrue: this.productState.updateTrue,
    productdata: this.productState.productdata,
    inventoryid: this.productState.inventoryid,
    product: this.productState.product,
  };

  constructor(props: any) {
    super(props);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.addInventoryProduct = this.addInventoryProduct.bind(this);
    this.updateInventoryProduct = this.updateInventoryProduct.bind(this);
    this.onProductSelect = this.onProductSelect.bind(this);
  }
  async componentDidMount() {
    this.getAllProduct();
    const inventoryId = this.props.location.pathname.split("/")[2];
    if (inventoryId !== undefined) {
      this.getInventoryData(inventoryId);
      this.setState({
        updateTrue: this.state.updateTrue = true,
        inventoryid: this.state.inventoryid = inventoryId,
      });
    }
    if (this.state.updateTrue === true) {
      document.title =
        constant.productInventoryPage.title.updateProductInventoryTitle +
        utils.getAppName();
    } else {
      document.title =
        constant.productInventoryPage.title.addProductInventoryTitle +
        utils.getAppName();
    }
  }

  async getInventoryData(inventoryId: any) {
    const obj:getDataByIdRequest = {
      id: inventoryId,
    };
    const getInventoryData: any = await ProductAPI.getInventoryData(obj);
    console.log("getInventoryData", getInventoryData);

    if (getInventoryData) {
      if(getInventoryData.status === 200) {
      this.setState({
        updateTrue: this.state.updateTrue = true,
        productid: this.state.productid =
          getInventoryData.resultObject.productId,
        stockqty: this.state.stockqty = getInventoryData.resultObject.stockQty,
        product: this.state.product = getInventoryData.resultObject.product,
      });
    } else {
      const msg1 = getInventoryData.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      //     utils.showError(msg1);
    }
  }

  async getAllProduct() {
    const getAllProduct = await ProductAPI.getAllProduct();
    console.log("getAllProduct", getAllProduct);
    if (getAllProduct) {
      if(getAllProduct.status === 200) {
      this.setState({
        productdata: this.state.productdata = getAllProduct.resultObject,
      });
    } else {
      const msg1 = getAllProduct.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  onProductSelect(event: any) {
    this.setState({
      productid: event.target.value,
    });
  }

  validate() {
    let productiderror = "";
    let stockqtyerror = "";

    if (!this.state.productid) {
      productiderror = "please select product";
    }

    var regex = /^[0-9\b]+$/;
    if (!this.state.stockqty) {
      stockqtyerror = "please enter qty";
    } else if(!regex.test(this.state.stockqty)) {
      stockqtyerror = "please enter valid qty";
    }

    if (productiderror || stockqtyerror) {
      this.setState({ productiderror, stockqtyerror });
      return false;
    }
    return true;
  }

  validateUpdate() {
   
    let stockqtyerror = "";

    var regex1 = /^[0-9\b]+$/;
    if (!this.state.stockqty) {
      stockqtyerror = "please enter qty";
    } else if(!regex1.test(this.state.stockqty)) {
      stockqtyerror = "please enter valid qty";
    }


    if (stockqtyerror) {
      this.setState({stockqtyerror });
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

  async addInventoryProduct() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        productiderror: "",
        stockqtyerror: "",
      });
      if (this.state.productid && this.state.stockqty) {
        const obj: inventoryCreateRequest = {
          productId: parseInt(this.state.productid),
          stockQty: parseInt(this.state.stockqty),
        };

        const addProductInventory = await ProductAPI.addProductInventory(obj);
        console.log("addProductInventory", addProductInventory);

        if (addProductInventory) {
          if(addProductInventory.status === 200) {
            const msg1 = addProductInventory.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-product-inventory");
        } else {
          const msg1 = addProductInventory.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
      }
    }
  }

  async updateInventoryProduct() {
    const isValid = this.validateUpdate();
    if (isValid) {
      this.setState({
        stockqtyerror: "",
      });
      if (this.state.stockqty) {
        const obj: inventoryUpdateRequest = {
          productInventoryId: parseInt(this.state.inventoryid),
          productId: parseInt(this.state.productid),
          stockQty: parseInt(this.state.stockqty),
        };

        const editProductInventory = await ProductAPI.editProductInventory(
          obj
        );
        console.log("editProductInventory", editProductInventory);

        if (editProductInventory) {
          if(editProductInventory.status === 200) {
            const msg1 = editProductInventory.message;
            utils.showSuccess(msg1);
          this.props.history.push("/list-product-inventory");
        } else {
          const msg1 = editProductInventory.message;
          utils.showError(msg1);
        }
        } else {
          // const msg1 = "Internal server error";
          // utils.showError(msg1);
        }
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {
                              constant.productInventoryPage.title
                                .updateProductInventoryTitle
                            }
                          </h1>
                        </Col>
                      ) : (
                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                          <h1>
                            {
                              constant.productInventoryPage.title
                                .addProductInventoryTitle
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
                      {this.state.updateTrue === true ? (
                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                          <FormGroup>
                            <Label htmlFor="product">
                              {
                                constant.productInventoryPage
                                  .merchantHoursTableColumn.product
                              }
                            </Label>
                            <Input
                              type="text"
                              id="product"
                              name="stockqty"
                              className="form-control"
                              value={this.state.product}
                              onChange={this.handleChangeEvent}
                              placeholder="Enter your stock qty"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      ) : (
                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                          <Form>
                            <FormGroup>
                              <Label for="exampleCustomSelect">
                                {
                                  constant.productInventoryPage
                                    .merchantHoursTableColumn.selectproduct
                                }
                              </Label>

                              <CustomInput
                                type="select"
                                id="exampleCustomSelect"
                                name="productid"
                                onChange={this.onProductSelect}
                                value={
                                  this.state.productid
                                    ? this.state.productid
                                    : ""
                                }
                              >
                                <option value="">
                                  {
                                    constant.productInventoryPage
                                      .merchantHoursTableColumn.selectproduct
                                  }
                                </option>

                                {this.state.productdata.length > 0
                                  ? this.state.productdata.map(
                                      (data: any, index: number) => (
                                        <option key={index} value={data.value}>
                                          {data.name}
                                        </option>
                                      )
                                    )
                                  : ""}
                              </CustomInput>
                              <div className="mb-4 text-danger">
                                {this.state.productiderror}
                              </div>
                            </FormGroup>
                          </Form>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="Stock Qty">
                            {
                              constant.productInventoryPage
                                .merchantHoursTableColumn.stockQty
                            }
                          </Label>
                          <Input
                            type="number"
                            id="Stock Qty"
                            name="stockqty"
                            className="form-control"
                            value={this.state.stockqty}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your stock qty"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.stockqtyerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    {this.state.updateTrue === true ? (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mt-3 mr-2 custom-button"
                        onClick={this.updateInventoryProduct}
                      >
                        {constant.button.update}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        size="sm"
                        color="primary"
                        className="mb-2 mt-3 mr-2 custom-button"
                        onClick={this.addInventoryProduct}
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

export default InventoryProduct;
