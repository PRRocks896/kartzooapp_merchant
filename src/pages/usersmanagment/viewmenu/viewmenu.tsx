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
import { MenuAPI } from "../../../service/index.service";
import constant from "../../../constant/constant";
import { addMenuStateRequest, getDataByIdRequest } from "../../../modelController";

class ViewMenuItem extends React.Component<{ history: any; location: any }> {

    menuState: addMenuStateRequest = constant.menuPage.state;
    state = {
        menuitemname: this.menuState.menuitemname,
        menuitemnameerror: this.menuState.menuitemnameerror,
        menuitemcontoller: this.menuState.menuitemcontoller,
        menuitemview: this.menuState.menuitemview,
        sortorder: this.menuState.sortorder,
        parentid: this.menuState.parentid,
        isActive: this.menuState.isActive,
        updateTrue: this.menuState.updateTrue,
        menuid: this.menuState.menuid,
        menudata: this.menuState.menudata
    };

    constructor(props: any) {
        super(props);
        this.getMenuDataById = this.getMenuDataById.bind(this);
    }

    async componentDidMount() {
        document.title = constant.menuPage.title.viewMenuTitle + utils.getAppName();
        const menuId = this.props.location.pathname.split("/")[2];
        if (menuId !== undefined) {
            this.getMenuDataById(menuId)
        }
    }

    async getMenuDataById(id: any) {
        const obj: getDataByIdRequest = {
            id: id,
        };
        const getMenuItemById: any = await MenuAPI.getMenuItemById(obj);
        if (getMenuItemById) {
            if (getMenuItemById.status === 200) {
                this.setState({

                    menuitemname: getMenuItemById.resultObject.menuItemName,
                    menuitemcontoller: getMenuItemById.resultObject.menuItemController ? getMenuItemById.resultObject.menuItemController : 'N/A',
                    menuitemview: getMenuItemById.resultObject.menuItemView ? getMenuItemById.resultObject.menuItemView : 'N/A',
                    sortorder: getMenuItemById.resultObject.sortOrder

                });
            } else {
                const msg1 = getMenuItemById.message;
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

                <div className="ms-content-wrapper">
                    <div className="row">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Card>
                                <CardHeader>
                                    <Row>
                                        <Col xs="12" sm="6" md="9" lg="9" xl="9">
                                            <h1>{constant.menuPage.viewmenu.menuview}</h1>
                                        </Col>
                                        <Col
                                            xs="12"
                                            sm="6"
                                            md="3"
                                            lg="3"
                                            xl="3"
                                            className="search_right"
                                        >
                                            <Link to="/listmenu">
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
                                                    <b>{constant.menuPage.menuTableColumn.menuname}</b>
                                                </Label>
                                                <p>{this.state.menuitemname}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="last_name">
                                                    <b>{constant.menuPage.menuTableColumn.menucontoller}</b>
                                                </Label>
                                                <p>{this.state.menuitemcontoller}</p>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="email">
                                                    <b>{constant.menuPage.menuTableColumn.menuview}</b>
                                                </Label>
                                                <p>{this.state.menuitemview}</p>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="mobile_no">
                                                    <b>{constant.menuPage.menuTableColumn.sortorder}</b>
                                                </Label>
                                                <p>{this.state.sortorder}</p>
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

export default ViewMenuItem;
