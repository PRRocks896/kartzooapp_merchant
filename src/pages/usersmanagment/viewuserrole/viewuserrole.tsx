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

import { RoleAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { addUserRoleState, getDataByIdRequest } from "../../../modelController";

class ViewUserRole extends React.Component<{ history: any; location: any }> {

  /** View User Role */
  userState : addUserRoleState = constant.userRolePage.state;
  state = {
      rolename: this.userState.rolename,
      description: this.userState.description
  };

  /** Constructor Call */
  constructor(props: any) {
    super(props);
  }

  /** Page Render Call */
  async componentDidMount() {
    document.title =
      constant.userRolePage.title.viewUserRoleTitle + utils.getAppName();
    const roleId = this.props.location.pathname.split("/")[2];
    if (roleId !== undefined) {
      this.getUserRole(roleId);
    }
  }

  /**
   * 
   * @param roleId : get role
   */
  async getUserRole(roleId: any) {
    const obj: getDataByIdRequest = {
      id: roleId,
    };
    const getRoleById: any = await RoleAPI.getRoleById(obj);
    // console.log("getRoleById", getRoleById);

    if (getRoleById) {
      if (getRoleById.status === 200) {
      this.setState({
       
          rolename: getRoleById.resultObject.role,
          description: getRoleById.resultObject.description,
       
      });
    } else {
      const msg1 = getRoleById.message;
      utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  /** Render DOM */
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
                        <h1>{constant.userRolePage.viewrole.roleview}</h1>
                      </Col>
                      <Col
                        xs="12"
                        sm="6"
                        md="3"
                        lg="3"
                        xl="3"
                        className="search_right"
                      >
                        <Link to="/userrole">
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
                          <Label htmlFor="role_name">
                            <b>
                              {
                                constant.userRolePage.userRoleTableColumn
                                  .rolename
                              }
                            </b>
                          </Label>
                          <p>{this.state.rolename}</p>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="6" lg="6" xl="6">
                        <FormGroup>
                          <Label htmlFor="description">
                            <b>
                              {
                                constant.userRolePage.userRoleTableColumn
                                  .description
                              }
                            </b>
                          </Label>
                          <p>{this.state.description}</p>
                        </FormGroup>
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

export default ViewUserRole;
