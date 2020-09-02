import React from "react";
import { Link } from "react-router-dom";
import utils from "../../utils";
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
// import "./merchant.css";
import NavBar from "../navbar/navbar";
import API from "../../service/merchant.service";
import Switch from "react-switch";
import constant from "../../constant/constant";
import { Editor } from "@tinymce/tinymce-react";
import {
  merchantCreateRequest,
  merchantUpdateRequest,
} from "../../modelController/merchantModel";
import { LocationAPI, MerchantAPI } from "../../service/index.service";
import { profileGetRequest } from "../../modelController";

interface User {
  merchantID: number;
}

class Profile extends React.Component<{ history: any }> {
  profileState = constant.profilePage.state;
  state = {
    selectedFile: this.profileState.selectedFile,
    selectedProofFile: this.profileState.selectedProofFile,
    selectedDocumentFile: this.profileState.selectedDocumentFile,
    firstname: this.profileState.firstname,
    firstnameerror: this.profileState.firstnameerror,
    lastname: this.profileState.lastname,
    lastnameerror: this.profileState.lastnameerror,
    email: this.profileState.email,
    emailerror: this.profileState.emailerror,
    mobilenumber: this.profileState.mobilenumber,
    mobilenumbererror: this.profileState.mobilenumbererror,
    shopname: this.profileState.shopname,
    shopnamerror: this.profileState.shopnamerror,
    address: this.profileState.address,
    addresserror: this.profileState.addresserror,
    city: this.profileState.city,
    cityerror: this.profileState.cityerror,
    user: this.profileState.user,
    usererror: this.profileState.usererror,
    zipcode: this.profileState.zipcode,
    zipcodeerror: this.profileState.zipcodeerror,
    latitude: this.profileState.latitude,
    latitudeerror: this.profileState.latitudeerror,
    longitude: this.profileState.longitude,
    longitudeerror: this.profileState.longitudeerror,
    website: this.profileState.website,
    shoppingpolicy: this.profileState.shoppingpolicy,
    shoppingpolicyerror: this.profileState.shoppingpolicyerror,
    refundpolicy: this.profileState.refundpolicy,
    refundpolicyerror: this.profileState.refundpolicyerror,
    cancellationpolicy: this.profileState.cancellationpolicy,
    cancellationpolicyerror: this.profileState.cancellationpolicyerror,
    isOpen: this.profileState.isOpen,
    checked: this.profileState.checked,
    selectedFileerror: this.profileState.selectedFileerror,
    selectedProofFileerror: this.profileState.selectedProofFileerror,
    selectedDocumentFileerror: this.profileState.selectedDocumentFileerror,
    password: this.profileState.password,
    passworderror: this.profileState.passworderror,
    citydata: this.profileState.citydata,
    type: this.profileState.type,
    file: this.profileState.file,
    filetrue: this.profileState.filetrue,
    file1: this.profileState.file1,
    file1true: this.profileState.file1true,
    file2: this.profileState.file2,
    file2true: this.profileState.file2true,
    updateTrue: this.profileState.updateTrue,
    userid: this.profileState.userid,
    cityname: this.profileState.cityname
  };

  constructor(props: any) {
    super(props);
    this.onItemSelect = this.onItemSelect.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeIcon = this.removeIcon.bind(this);
    this.updateMerchant = this.updateMerchant.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onChangeIDProof = this.onChangeIDProof.bind(this);
    this.onChangeDocumentHandler = this.onChangeDocumentHandler.bind(this);
    this.onUserSelect = this.onUserSelect.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleEditorMainChange = this.handleEditorMainChange.bind(this);
    this.handleEditorUpChange = this.handleEditorUpChange.bind(this);
    this.removeDocumentIcon = this.removeDocumentIcon.bind(this);
    this.removeProofIcon = this.removeProofIcon.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUserById = this.getUserById.bind(this);
    this.getCityById = this.getCityById.bind(this);
  }

  handleChange(checked: boolean) {
    this.setState({ isOpen: this.state.isOpen = checked });
  }

  async componentDidMount() {
    document.title =
      constant.merchantPage.title.addMerchantTitle + utils.getAppName();

    const getCity = await LocationAPI.getCity();
    console.log("getCity", getCity);

    if (getCity) {
      if (getCity.status === 200) {
        this.setState({
          citydata: this.state.citydata = getCity.resultObject,
        });
      } else {
        const msg1 = getCity.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
    this.getUserById();
  }

  async getUserById() {
    var user = localStorage.getItem("user");
    if (user) {
      let profile: User = JSON.parse(user);
      const obj: profileGetRequest = {
        id: profile.merchantID,
      };
      const getProfile = await API.getMerchantById(obj);
      console.log("getprofile", getProfile);

      if (getProfile) {
        if (getProfile.status === 200) {
          this.setState({
            updateTrue: this.state.updateTrue = true,
            filetrue: this.state.filetrue = true,
            userid: this.state.userid = getProfile.resultObject.merchantID,
            firstname: this.state.firstname = getProfile.resultObject.firstName,
            lastname: this.state.lastname = getProfile.resultObject.lastName,
            mobilenumber: this.state.mobilenumber =
              getProfile.resultObject.phone,
            selectedFile: this.state.selectedFile =
              getProfile.resultObject.photoPath,
            file: this.state.file = getProfile.resultObject.photoPath,
            email: this.state.email = getProfile.resultObject.email,
            address: this.state.address = getProfile.resultObject.address,
            latitude: this.state.latitude = getProfile.resultObject.latitude,
            longitude: this.state.longitude = getProfile.resultObject.longitude,
            shopname: this.state.shopname = getProfile.resultObject.shopName,
            // selectedDocumentFile:this.state.selectedDocumentFile = getProfile.resultObject.merchantDocument,
            // file2:this.state.file2 = getProfile.resultObject.merchantDocument,
            // selectedProofFile:this.state.selectedProofFile = getProfile.resultObject.merchantIDPoof,
            // file1:this.state.file1 = getProfile.resultObject.merchantIDPoof,
            city: this.state.city = getProfile.resultObject.cityID,
            website: this.state.website = getProfile.resultObject.website,
            zipcode: this.state.zipcode = getProfile.resultObject.zipCode,
            isOpen: this.state.isOpen = getProfile.resultObject.isActive,
          });
          if(this.state.city) {
            this.getCityById(this.state.city)
          }
        } else {
          const msg1 = getProfile.message;
          utils.showError(msg1);
        }
      } else {
        const msg1 = "Internal server error";
        utils.showError(msg1);
      }
    }
  }

  async getCityById(id:any) {
    const obj = {
      id:id
    }
    const getCityById: any = await LocationAPI.getCityById(obj);
    console.log("getCityById", getCityById);

    if (getCityById) {
      if (getCityById.status === 200) {
        this.setState({
          cityname: this.state.cityname = getCityById.resultObject.cityName
        });
      } else {
        const msg1 = getCityById.message;
        utils.showError(msg1);
      }
    } else {
      const msg1 = "Internal server error";
      utils.showError(msg1);
    }
  }

  onUserSelect(event: any) {
    this.setState({
      user: this.state.user = event.target.value,
    });
  }

  onItemSelect(event: any) {
    this.setState({
      city: this.state.city = event.target.value,
    });
  }

  onChangeHandler(event: any) {
    if (this.state.filetrue === true) {
      this.setState({
        filetrue: this.state.filetrue = false,
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    } else {
      this.setState({
        selectedFile: this.state.selectedFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file: reader.result,
        });
      };
    }
  }

  onChangeIDProof(event: any) {
    if (this.state.file1true === true) {
      this.setState({
        file1true: this.state.file1true = false,
        selectedProofFile: this.state.selectedProofFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file1: reader.result,
        });
      };
    } else {
      this.setState({
        selectedProofFile: this.state.selectedProofFile = event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file1: reader.result,
        });
      };
    }
  }

  onChangeDocumentHandler(event: any) {
    if (this.state.file2true === true) {
      this.setState({
        file2true: this.state.file2true = false,
        selectedDocumentFile: this.state.selectedDocumentFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file2: reader.result,
        });
      };
    } else {
      this.setState({
        selectedDocumentFile: this.state.selectedDocumentFile =
          event.target.files,
      });
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onloadend = (ev) => {
        this.setState({
          file2: reader.result,
        });
      };
    }
  }

  handleClick = () =>
    this.setState(({ type }: any) => ({
      type: type === "password" ? "text" : "password",
    }));

  handleEditorChange = (content: any, editor: any) => {
    console.log("handleEditorChange Content was updated:", content);
    this.setState({
      refundpolicy: this.state.refundpolicy = content,
    });
  };

  handleEditorMainChange = (content: any, editor: any) => {
    console.log("handleEditorMainChange Content was updated:", content);
    this.setState({
      shoppingpolicy: this.state.shoppingpolicy = content,
    });
  };

  handleEditorUpChange = (content: any, editor: any) => {
    console.log("handleEditorMainChange Content was updated:", content);
    this.setState({
      cancellationpolicy: this.state.cancellationpolicy = content,
    });
  };

  validate() {
    let firstnameerror = "";
    let lastnameerror = "";
    let emailerror = "";
    let mobilenumbererror = "";
    let selectedFileerror = "";
    let selectedDocumentFileerror = "";
    let selectedProofFileerror = "";
    let latitudeerror = "";
    let longitudeerror = "";
    let shopnamerror = "";
    let shoppingpolicyerror = "";
    let refundpolicyerror = "";
    let cancellationpolicyerror = "";
    let usererror = "";
    let cityerror = "";
    let addresserror = "";
    let zipcodeerror = "";
    let passworderror = "";

    if (!this.state.firstname) {
      firstnameerror = "please enter firstname";
    }

    if (!this.state.lastname) {
      lastnameerror = "please enter lastname";
    }

    if (!this.state.zipcode) {
      zipcodeerror = "please enter zipcode";
    }

    if (!this.state.address) {
      addresserror = "please enter address";
    }

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.email) {
      emailerror = "please enter email";
    } else if (!reg.test(this.state.email)) {
      emailerror = "please enter valid email";
    }

    if (!this.state.mobilenumber) {
      mobilenumbererror = "please enter mobile number";
    }

    if (!this.state.password) {
      passworderror = "please enter password";
    }

    if (!this.state.selectedDocumentFile) {
      selectedDocumentFileerror = "please select document image";
    }

    if (!this.state.selectedFile) {
      selectedFileerror = "please select shop image";
    }

    if (!this.state.selectedProofFile) {
      selectedProofFileerror = "please select proof image";
    }

    if (!this.state.latitude) {
      latitudeerror = "please enter latitude";
    }

    if (!this.state.longitude) {
      longitudeerror = "please enter longitude";
    }

    if (!this.state.shopname) {
      shopnamerror = "please enter shop name";
    }

    if (!this.state.shoppingpolicy) {
      shoppingpolicyerror = "please enter shopping policy";
    }

    if (!this.state.refundpolicy) {
      refundpolicyerror = "please enter refund policy";
    }

    if (!this.state.cancellationpolicy) {
      cancellationpolicyerror = "please enter cancellation policy";
    }

    // if (!this.state.user) {
    //   usererror = "please select user";
    // }

    if (!this.state.city) {
      cityerror = "please select city";
    }

    if (
      firstnameerror ||
      lastnameerror ||
      addresserror ||
      zipcodeerror ||
      emailerror ||
      mobilenumbererror ||
      latitudeerror ||
      longitudeerror ||
      shopnamerror ||
      cityerror
    ) {
      this.setState({
        firstnameerror,
        lastnameerror,
        addresserror,
        zipcodeerror,
        emailerror,
        mobilenumbererror,
        latitudeerror,
        longitudeerror,
        shopnamerror,
        cityerror
      });
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

  async updateMerchant() {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        firstnameerror: "",
        lastnameerror: "",
        emailerror: "",
        mobilenumbererror: "",
        addresserror: "",
        zipcodeerror: "",
        latitudeerror: "",
        longitudeerror: "",
        shopnamerror: "",
        cityerror: ""
      });
      if (
        this.state.firstname &&
        this.state.lastname &&
        this.state.email &&
        this.state.mobilenumber &&
        this.state.latitude &&
        this.state.longitude &&
        this.state.city && this.state.address && this.state.zipcode && this.state.shopname
      ) {
        let formData = new FormData();
        formData.append("Id", this.state.userid.toString());
        formData.append("FirstName", this.state.firstname);
        formData.append("LastName", this.state.lastname);
        formData.append("ShopName", this.state.shopname);
        formData.append("Email", this.state.email);
        formData.append("Phone", this.state.mobilenumber.toString());
        formData.append("Address", this.state.address);
        formData.append("CityId", this.state.city);
        formData.append("ZipCode", this.state.zipcode);
        formData.append("Latitude", this.state.latitude);
        formData.append("Longitude", this.state.longitude);
        formData.append("Website", this.state.website);
        formData.append("MerchantIDPoof", this.state.selectedProofFile[0]);
        formData.append("MerchantDocument", this.state.selectedDocumentFile[0]);
        formData.append("ShippingPolicy", this.state.shoppingpolicy);
        formData.append("RefundPolicy", this.state.refundpolicy);
        formData.append("CancellationPolicy", this.state.cancellationpolicy);
        formData.append("files", this.state.selectedFile[0]);
        formData.append("UserId", "0");

        const updateMerchant = await API.updateMerchant(formData);
        console.log("updateMerchant", updateMerchant);
        if (updateMerchant) {
          if (updateMerchant.status === 200) {
            const msg = updateMerchant.message;
            utils.showSuccess(msg);
            this.props.history.push("/dashboard");
          } else {
            const msg1 = updateMerchant.message;
            utils.showError(msg1);
          }
        } else {
          const msg1 = "Internal server error";
          utils.showError(msg1);
        }
      }
    }
  }

  removeIcon() {
    this.setState({
      file: this.state.file = "",
    });
  }

  removeDocumentIcon() {
    this.setState({
      file2: this.state.file2 = "",
    });
  }

  removeProofIcon() {
    this.setState({
      file1: this.state.file1 = "",
    });
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
                        <h1>{constant.profilePage.profile.updateprofile}</h1>
                      </Col>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="first_name">
                            {
                              constant.merchantPage.merchantTableColumn
                                .Firstname
                            }
                          </Label>
                          <Input
                            type="text"
                            id="first_name"
                            name="firstname"
                            className="form-control"
                            value={this.state.firstname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your first name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.firstnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="last_name">
                            {constant.merchantPage.merchantTableColumn.lastname}
                          </Label>
                          <Input
                            type="text"
                            id="last_name"
                            name="lastname"
                            className="form-control"
                            value={this.state.lastname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your last name"
                            required
                          />
                          <div className="mb-4 text-danger">
                            {this.state.lastnameerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="email">
                            {constant.merchantPage.merchantTableColumn.email}
                          </Label>
                          <Input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your email"
                            required
                            disabled
                          />
                          <div className="mb-4 text-danger">
                            {this.state.emailerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="mobile_no">
                            {constant.merchantPage.merchantTableColumn.phone}
                          </Label>
                          <Input
                            type="text"
                            id="mobile_no"
                            name="mobilenumber"
                            className="form-control"
                            value={this.state.mobilenumber}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your mobile number"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.mobilenumbererror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">
                              {constant.merchantPage.merchantTableColumn.city}
                            </Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="city"
                              onChange={this.onItemSelect}
                            >
                              <option value={this.state.city}>{this.state.cityname}</option>
                              {this.state.citydata.length > 0
                                ? this.state.citydata.map(
                                    (data: any, index: any) => (
                                      <option key={index} value={data.value}>
                                        {data.name}
                                      </option>
                                    )
                                  )
                                : ""}
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.cityerror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col>
                      {/* <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <p style={{ fontSize: "16px" }}>
                          {constant.merchantPage.merchantTableColumn.password}
                        </p>
                        <div className="right-inner-addon input-group">
                          <input
                            type={this.state.type}
                            name="password"
                            className="form-control"
                            id="validationCustom09"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleChangeEvent}
                          />
                          {this.state.type === "password" ? (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye"
                            ></i>
                          ) : (
                            <i
                              onClick={this.handleClick}
                              className="fas fa-eye-slash"
                            ></i>
                          )}
                        </div>
                        <div className="text-danger">
                          {this.state.passworderror}
                        </div>
                      </Col> */}
                      {/* <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <Form>
                          <FormGroup>
                            <Label for="exampleCustomSelect">Select User</Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="user"
                              onChange={this.onUserSelect}
                            >
                              <option value="">Select User</option>
                              <option value="0">User-1</option>
                              <option value="1">User-2</option>
                            </CustomInput>
                            <div className="mb-4 text-danger">
                              {this.state.usererror}
                            </div>
                          </FormGroup>
                        </Form>
                      </Col> */}
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="shopname">
                            {constant.merchantPage.merchantTableColumn.shopname}
                          </Label>
                          <Input
                            type="text"
                            id="shopname"
                            name="shopname"
                            className="form-control"
                            value={this.state.shopname}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your shop name"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.shopnamerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Address">
                            {constant.merchantPage.merchantTableColumn.Address}
                          </Label>
                          <Input
                            type="text"
                            id="Address"
                            name="address"
                            className="form-control"
                            value={this.state.address}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your address"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.addresserror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="ZIP-Code">
                            {constant.merchantPage.merchantTableColumn.zipcode}
                          </Label>
                          <Input
                            type="text"
                            id="ZIP-Code"
                            name="zipcode"
                            className="form-control"
                            value={this.state.zipcode}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your zipe-code"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.zipcodeerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Website">
                            {constant.merchantPage.merchantTableColumn.website}
                          </Label>
                          <Input
                            type="text"
                            id="Website"
                            name="website"
                            className="form-control"
                            value={this.state.website}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your website"
                          />
                          {/* <div className="mb-4 text-danger">
                                                    {this.state.longitudeerror}
                                                </div> */}
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Latitude">
                            {constant.merchantPage.merchantTableColumn.latitude}
                          </Label>
                          <Input
                            type="text"
                            id="Latitude"
                            name="latitude"
                            className="form-control"
                            value={this.state.latitude}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your latitude"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.latitudeerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup>
                          <Label htmlFor="Longitude">
                            {
                              constant.merchantPage.merchantTableColumn
                                .longitude
                            }
                          </Label>
                          <Input
                            type="text"
                            id="Longitude"
                            name="longitude"
                            className="form-control"
                            value={this.state.longitude}
                            onChange={this.handleChangeEvent}
                            placeholder="Enter your longitude"
                          />
                          <div className="mb-4 text-danger">
                            {this.state.longitudeerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup className="img-upload">
                          {this.state.file !== "" ? (
                            <div className="img-size">
                              {this.state.file !== "" ? (
                                <div>
                                  {this.state.filetrue === true ? (
                                    <img
                                      className="picture"
                                      src={constant.fileMerchantpath + this.state.file}
                                    />
                                  ) : (
                                    <img
                                      className="picture"
                                      src={this.state.file}
                                    />
                                  )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p style={{ fontSize: "16px" }}>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .selectedFile
                                }
                              </p>
                              <Label className="imag" for="file-input">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input"
                                type="file"
                                className="form-control"
                                name="file"
                                onChange={this.onChangeHandler.bind(this)}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup className="img-upload1">
                          {this.state.file1 !== "" ? (
                            <div className="img-size">
                              {this.state.file1 !== "" ? (
                                <div>
                                  {this.state.file1true === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file1}
                                    />
                                  ) : (
                                    <img
                                      className="picture"
                                      src={this.state.file1}
                                    />
                                  )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeProofIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p style={{ fontSize: "16px" }}>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .selectMerchantIdProff
                                }
                              </p>
                              <Label className="imag" for="file-input1">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input1"
                                type="file"
                                className="form-control"
                                name="file1"
                                onChange={this.onChangeIDProof.bind(this)}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedProofFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <FormGroup className="img-upload2">
                          {this.state.file2 !== "" ? (
                            <div className="img-size">
                              {this.state.file2 !== "" ? (
                                <div>
                                  {this.state.file2true === true ? (
                                    <img
                                      className="picture"
                                      src={constant.filepath + this.state.file2}
                                    />
                                  ) : (
                                    <img
                                      className="picture"
                                      src={this.state.file2}
                                    />
                                  )}
                                  <i
                                    className="fa fa-times cursor"
                                    onClick={() => this.removeDocumentIcon()}
                                  ></i>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="">
                              <p style={{ fontSize: "16px" }}>
                                {
                                  constant.merchantPage.merchantTableColumn
                                    .selectMerchantDocument
                                }
                              </p>
                              <Label className="imag" for="file-input2">
                                <i
                                  className="fa fa-upload fa-lg"
                                  style={{ color: "#20a8d8" }}
                                ></i>
                              </Label>
                              <Input
                                id="file-input2"
                                type="file"
                                className="form-control"
                                name="file2"
                                onChange={this.onChangeDocumentHandler.bind(
                                  this
                                )}
                              />
                            </div>
                          )}
                          <div className="text-danger">
                            {this.state.selectedDocumentFileerror}
                          </div>
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* 
                    <Row style={{ marginTop: "20px" }}>
                      <Col xs="12" sm="12" md="4" lg="4" xl="4">
                        <label>
                          <span>
                            {constant.merchantPage.merchantTableColumn.isOpen}
                          </span>
                          <br />
                          <div style={{ marginTop: "10px" }}>
                            <Switch
                              onChange={this.handleChange}
                              checked={this.state.isOpen}
                            />
                          </div>
                        </label>
                      </Col>
                    </Row> */}
                    <Button
                      type="button"
                      size="sm"
                      color="primary"
                      className="mb-2 mt-3 mr-2 custom-button"
                      onClick={this.updateMerchant}
                    >
                      {constant.button.update}
                    </Button>
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

export default Profile;