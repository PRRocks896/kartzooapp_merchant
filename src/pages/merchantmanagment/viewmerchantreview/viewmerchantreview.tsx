import React from 'react';
import { Link } from 'react-router-dom';
import utils from '../../../utils';
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
} from 'reactstrap';
// import './adduser.css';

import API from '../../../service/service';
import Switch from "react-switch";
import constant from '../../../constant/constant';

class ViewMerchantReview extends React.Component<{ history: any }> {

    constructor(props: any) {
        super(props);
    }

    async componentDidMount() {
        document.title = constant.ViewMerchantReview + utils.getAppName();
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
                                                <h1>View Merchant Review Details</h1>
                                            </Col>
                                            <Col xs="12" sm="6" md="3" lg="3" xl="3" style={{ textAlign: "right" }}>
                                                <Link to="/list-merchant-review">
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        color="primary"
                                                        className="mb-2 mr-2 custom-button"
                                                    >
                                                        Back
                                        </Button>
                                                </Link>
                                            </Col>
                                        </Row>

                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name"><b>Merchant Name</b></Label>
                                                    <p>Merchant-1</p>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name"><b>User Name</b></Label>
                                                    <p>user-1</p>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="first_name"><b>Rating</b></Label>
                                                    <p>Rating</p>
                                                </FormGroup>
                                            </Col>
                                            <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                                <FormGroup>
                                                    <Label htmlFor="last_name"><b>Review Details</b></Label>
                                                    <p>review-detail</p>
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

export default ViewMerchantReview;
