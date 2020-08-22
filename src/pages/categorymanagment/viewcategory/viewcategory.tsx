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
import {CategoryAPI} from "../../../service/index.service";
import constant from "../../../constant/constant";

class ViewCategory extends React.Component<{ history: any; location: any }> {
  state = {
    category: "",
    file: null,
    sortorder: "",
    parentCategory: "",
  };

  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    document.title =
      constant.categoryPage.title.viewCategoryTitle + utils.getAppName();

    const categoryId = this.props.location.pathname.split("/")[2];
    if (categoryId !== undefined) {
      const obj = {
        id: categoryId,
      };
      const getCategoryById: any = await CategoryAPI.getCategoryById(obj);
      console.log("getCategoryById", getCategoryById);
      if (getCategoryById) {
        if (getCategoryById.status === 200) {
          this.setState({
            category: this.state.category =
              getCategoryById.resultObject.category,
            sortorder: this.state.sortorder =
              getCategoryById.resultObject.sortOrder,
            file: this.state.file = getCategoryById.resultObject.imagePath,
            parentCategory: this.state.parentCategory = getCategoryById
              .resultObject.parentCategory
              ? getCategoryById.resultObject.parentCategory
              : "",
          });
        } else {
          const msg1 = getCategoryById.message;
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
    <h1>{constant.categoryPage.viewcategorydetail.viewcategory}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                       className="search_right"
                      >
                        <Link to="/category">
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
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.categoryPage.caetgoryTableColumn
                                  .categoryName
                              }
                            </b>
                          </Label>
                          <p>{this.state.category}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                            <b>
                              {
                                constant.categoryPage.caetgoryTableColumn
                                  .subCategoryName
                              }
                            </b>
                          </Label>
                          {this.state.parentCategory === "" ? (
                            <p>N/A</p>
                          ) : (
                            <p>{this.state.parentCategory}</p>
                          )}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="category_name">
                          <b>{constant.categoryPage.caetgoryTableColumn.sortorder}</b>
                          </Label>
                          <p>{this.state.sortorder}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup className="img-upload">
                          <p style={{ fontSize: "16px" }}>
                          <b>{constant.categoryPage.caetgoryTableColumn.image}</b>
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

export default ViewCategory;
