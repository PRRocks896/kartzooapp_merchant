import React, { Component } from 'react';
import { API } from "../../service/index.service";
import {
    Row,
    Col,
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import utils from '../../utils';
import constant from '../../constant/constant';
import { changePasswordStateRequest } from '../../modelController/changepasswordModel/changepasswordState';


class ChangePassword extends Component<{history:any,location:any}> {
    changeState : changePasswordStateRequest = constant.changePasswordPage.state;
    state = {
        oldpassword: this.changeState.oldpassword,
        oldpassworderror: this.changeState.oldpassworderror,
        newpassword: this.changeState.newpassword,
        newpassworderror: this.changeState.newpassworderror,
        confirmpassword: this.changeState.confirmpassword,
        confirmpassworderror: this.changeState.confirmpassworderror,
        userid: this.changeState.userid
    }

    constructor(props: any) {
        super(props);
        this.ChangePassword = this.ChangePassword.bind(this);
    }

    async componentDidMount() {
        let userid: any = localStorage.getItem('user');
        this.state.userid = JSON.parse(userid).merchantID
        document.title = constant.changepassword + utils.getAppName();
    }


    validate() {
        let oldpassworderror = "";
        let newpassworderror = "";
        let confirmpassworderror = "";

        if (!this.state.oldpassword) {
            oldpassworderror = "please enter old password"
        }

        if (!this.state.newpassword) {
            newpassworderror = "please enter new password"
        }

        if (!this.state.confirmpassword) {
            confirmpassworderror = "please enter confirm password"
        }

        if (newpassworderror || oldpassworderror || confirmpassworderror) {
            this.setState({ newpassworderror, oldpassworderror, confirmpassworderror });
            return false;
        }
        return true;

    }

    async ChangePassword() {
        const isValid = this.validate();
        if (isValid) {
            this.setState({
                newpassworderror: '',
                oldpassworderror: '',
                confirmpassworderror: ''
            })
            if (this.state.newpassword === this.state.confirmpassword && this.state.oldpassword !== this.state.newpassword) {
                const obj = {
                    merchantId: this.state.userid,
                    password: this.state.newpassword
                }
                const updatePassword = await API.updatePassword(obj);
                if (updatePassword) {
                    this.props.history.push("/dashboard");
                } else {
                    const msg1 = updatePassword.message;
                    utils.showError(msg1);
                }
            } else if (this.state.newpassword !== this.state.confirmpassword) {
                const msg1 = constant.alertMsg.msg;
                utils.showError(msg1);
            } else if (this.state.oldpassword === this.state.newpassword) {
                const msg1 = constant.alertMsg.newmsg;
                utils.showError(msg1);
            } else {
                const msg1 = "Error";
                utils.showError(msg1);
            }
        };
    }

    render() {
        return (
           
                <div className="ms-content-wrapper">
                    <div className="row">
                        <Col xs="12" sm="12" md="12" lg="12" xl="12">
                            <Card>
                                <CardHeader>
                                    <strong className="maincontent">{constant.changePasswordPage.title.changepassword}</strong>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="oldpassword">{constant.changePasswordPage.title.oldpassword}</Label>
                                                <Input
                                                    type="password"
                                                    id="oldpassword"
                                                    name="oldpassword"
                                                    className="form-control"
                                                    onChange={(e) => this.setState({
                                                        oldpassword:e.target.value
                                                    })
                                                    }
                                                    placeholder="Enter your Old Password"
                                                    required
                                                />
                                                <div className="text-danger">
                                                    {this.state.oldpassworderror}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="newpassword">{constant.changePasswordPage.title.newpassword}</Label>
                                                <Input
                                                    type="password"
                                                    id="newpassword"
                                                    name="newpassword"
                                                    className="form-control"
                                                    onChange={(e) => this.setState({
                                                    newpassword: e.target.value
                                                    })
                                                    }
                                                    placeholder="Enter your New Password"
                                                    required
                                                />
                                                <div className="text-danger">
                                                    {this.state.newpassworderror}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <FormGroup>
                                                <Label htmlFor="confirmpassword">{constant.changePasswordPage.title.confirmpassword}</Label>
                                                <Input
                                                    type="password"
                                                    id="confirmpassword"
                                                    name="confirmpassword"
                                                    className="form-control"
                                                    onChange={(e) => this.setState({
                                                        confirmpassword : e.target.value
                                                    })
                                                    }
                                                    placeholder="Enter your Confirm Password"
                                                    required
                                                />
                                                <div className="text-danger">
                                                    {this.state.confirmpassworderror}
                                                </div>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button
                                        type="button"
                                        className="mb-2 mr-2 custom-button"
                                        color="primary"
                                        onClick={this.ChangePassword}
                                    >{constant.button.update}</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    </div>
                </div>
           
        );
    }
}

export default ChangePassword;