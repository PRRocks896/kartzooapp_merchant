import React from "react";
import {API} from "../../service/index.service";
import {
  Row,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "./resetpassword.css";
import constant from '../../constant/constant';
import { resetPasswordRequest } from "../../modelController";
import utils from '../../utils';

interface resetPasswordState {
  password:string,
  passwordError:string
}

class ResetPassword extends React.Component<{ location: any; history: any }> {
  state : resetPasswordState = {
    password: "",
    passwordError: "",
  };
  /** First Constructor Call */
  constructor(props: any) {
    super(props);
    this.ResetPassword = this.ResetPassword.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
  }

  /** first this method call */
  componentDidMount() {
    console.log(
      "query=",
      this.props.location.pathname.split("/")[2].split("=")[1]
    );
  }

  /** validation of reset form */
  validate = () => {
    let passwordError = "";

    if (this.state.password) {
      passwordError = "please enter reset password";
    }

    if (passwordError) {
      this.setState({ passwordError });
      return false;
    }
    return true;
  };

  /** onChange event  */
  handleChangeEvent(event: any) {
    event.preventDefault();
    const state: any = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  /** Reset password  */
  async ResetPassword() {
    const obj:resetPasswordRequest = {
      guid: this.props.location.pathname.split("/")[2].split("=")[1],
      password: this.state.password,
    };
    var resetPassword: any = await API.resetPassword(obj);
    console.log("resetPassword", resetPassword);

    if (resetPassword) {
      if(resetPassword.status === 200) {
        const msg1 = resetPassword.message;
        utils.showSuccess(msg1);
      this.props.history.push("/login");
    } else {
      const msg1 = resetPassword.message;
        utils.showError(msg1);
    }
    } else {
      // const msg1 = "Internal server error";
      // utils.showError(msg1);
    }
  }

  render() {
    return (
      <div className="mainclass">
        <div className="main-box">
          <Card>
            <CardHeader>
    <strong className="maincontent">{constant.resetPasswordPage.resetpassword}</strong>
            </CardHeader>
            <CardBody>
              <Row>
                <div className="box">
                  <FormGroup>
                    <Label htmlFor="resetpassword">{constant.resetPasswordPage.resetpassword}</Label>
                    <Input
                      type="password"
                      name="password"
                      id="defaultFormRegisterPasswordEx"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.handleChangeEvent}
                    />
                    <div className="text-danger">
                      {this.state.passwordError}
                    </div>
                  </FormGroup>
                </div>
              </Row>
              <Button
                type="button"
                className="mb-2 mr-2 custom-button"
                color="primary"
                onClick={this.ResetPassword}
                disabled={!this.state.password}
              >
                {constant.resetPasswordPage.resetButton}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default ResetPassword;
