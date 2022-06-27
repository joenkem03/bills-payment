/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, CardTitle, FormGroup, Label, Card, CardBody, Button, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import {getCurrentUser, setCurrentUser} from 'helpers/Utils';
// import { GetMerchantProfileService } from 'services/ProtectedService';
import { Colxx } from 'components/common/CustomBootstrap';
// import DropzoneForm from 'containers/forms/DropzoneForm';
import { TwoFaEnable, DoTwoFaEnable, DoTwoFaDisable, ChangePassword, GetDisableAuthCode } from 'services/ProtectedService';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import AlertNotice from 'components/common/alert';
// import { UserRole } from '../../constants/defaultValues';
// import AlertNotice from 'components/common/alert';
// import ModalActionStatus from 'components/common/ModalActionStatus';

const Profile = () => {
  const currentMerchant = getCurrentUser();
  const [modalBack, setModalBack] = useState(false);
  const [backdrop] = useState('static');
  const [twoFaStatus, setTwoFaStatus] = useState(currentMerchant.twoFactorStatus);
  // const [phone, setPhone] = useState(currentMerchant.phone);
  const [email, setEmail] = useState(currentMerchant.email);
  const [userName] = useState(`${currentMerchant.firstName} ${currentMerchant.lastName}`);
  const [phoneCode, setPhoneCode] = useState('');
  const [twoFaReqImg, setTwoFaReqImg] = useState('');
  const [twoFaReqCode, setTwoFaReqCode] = useState('');
  const [twoFactorInputCode, setTwoFactorInputCode] = useState('');
  const [authBy, setAuthBy] = useState('');
  // const [modalRight, setModalRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisablingTwoFa, setIsDisablingTwoFa] = useState(false);

  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  //   const [merchant, setMerchant] = useState([]);

  //   useEffect(() => {
  //     // if (option === null) {
  //       GetMerchantProfileService().then((ret) => {
  //         // console.log(ret);
  //         // if(ret.data.length > 0){
  //         //   ret.data.forEach(element => {
  //         //     // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
  //         //       options.push({ value: element.id, label: `${element.name}` });
  //         //     // }
  //         //   });
  //           setMerchant(ret.data);
  //         // }
  //       });
  //     // }
  //     // }
  // }, []);

  const registerScheme = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    // individualOrNon: Yup.string().required("Required"),
    email: Yup.string().required('Required').email('Invalid email'),
    // address: Yup.string().required(),
    phone: Yup.string().required('Required'),
  });

  const doSetTwoFaStatus = (primary) => {
    if(!twoFaStatus){
      setModalBack(true);      
    }
    if(twoFaStatus){
      setIsDisablingTwoFa(true);
      GetDisableAuthCode("MAIL").then().catch();
    }
    setTwoFaStatus(primary);
  }

  const authByApp = () => {
    setModalBack(false);
    setAuthBy("app")
    setIsLoading(true);
    TwoFaEnable("APP").then((res) => {
      if(res.status === 200){
        console.log(res.data);
        setTwoFaReqCode(res.data.setupCode);
        setTwoFaReqImg(res.data.barcodeImageUrl);
      }
      setIsLoading(false);
    })
  }

  const authBySms = () => {
    setModalBack(false);
    setAuthBy("sms")
    setIsLoading(true);
    TwoFaEnable("MAIL").then((res) => {
      if(res.status === 200){
        // console.log(res);
      }
      setIsLoading(false);
    }).catch();
  }

  const handleTwoFaDisable = () => {
    setIsLoading(true);   
    DoTwoFaDisable({
      "inputCode": twoFactorInputCode,
      "authProvider": currentMerchant.preLogin
    }).then((res) => {  
      if(res.status === 200){
        currentMerchant.twoFactorStatus = false;
        setCurrentUser(currentMerchant);
      } 
      window.location.reload();
    } ).catch();
    setIsLoading(false);
  }

  const handleTwoFaSubmit = () => {
    setIsLoading(true);
    
    DoTwoFaEnable({
      "inputCode": twoFactorInputCode,
      "authProvider": "APP"
    }).then((res) => {
      if(res.status === 200){
        // setTwoFaStatus(!primary);
        currentMerchant.twoFactorStatus = true;
        currentMerchant.preLogin = "APP";
        setCurrentUser(currentMerchant);
      }
      window.location.reload();
      setIsLoading(false);

    }).catch() 
  }

  const handleTwoFaSmsSubmit = () => {
    setIsLoading(true);
    
    DoTwoFaEnable({
      "inputCode": phoneCode,
      "authProvider": "MAIL"
    }).then((res) => {
      if(res.status === 200){
        // setTwoFaStatus(!primary);
        currentMerchant.twoFactorStatus = true;
        currentMerchant.preLogin = "MAIL";
        setCurrentUser(currentMerchant);
      }
      window.location.reload();
      setIsLoading(false);

    }).catch()  
  }

  const initialValues = {
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  const handleChangePassSubmit = async (e) => {
    e.preventDefault();
    if(newPassword !== confPassword){
      setIsError(true);
      setMessage("Confirm New Password does not match");
      return;

    }
    e.preventDefault();
    const request = {
      "currentPassword": curPassword,
      "newPassword": newPassword
    };

    console.log(request);
    setIsLoading(true);
    setIsError(false);
    

    ChangePassword(request).then((response) => {
      console.log(response);
      if (response.status === 200) {
        // localStorage.setItem("def", false)
        setIsSuccess(true);
        setIsLoading(false);
             
      }
      if (response.status === 400) {
        setIsLoading(false);
        setIsError(true);
        setMessage(response.data.message);
      } 
    }).catch ((et) => {
      console.log('error');
      console.log(et);
      setIsLoading(false);
      setIsError(true);
      setMessage(et);
    });
    
  };
 

  const handleSubmit = async () => {
  };

  return (
    <>
      <Row className="mb-4">
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
          <Card>
            <CardBody>
              <CardTitle className="d-block d-md-inline-block pt-1">
                {/* <IntlMessages id="table.divided" /> */}
                {/* <h1>{pagetitle}</h1> */}
                <h3>Profile</h3>
              </CardTitle>
              <Colxx xxs="12">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={registerScheme}
                >
                  {() => (
                    <Form>
                      <Row>
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              {/* <IntlMessages id="user.first-name" /> */}
                              Full Name
                            </Label>
                            <Field
                              className="form-control"
                              // name="firstName"
                              value={userName}
                            />
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="6">
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              <IntlMessages id="user.phone" />
                            </Label>
                            <Field
                              className="form-control"
                              value={currentMerchant.phone}
                            />
                          </FormGroup>
                        </Colxx>
                        <Colxx xxs="6">
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              <IntlMessages id="user.email" />
                            </Label>
                            <Field
                              className="form-control"
                              value={currentMerchant.email}
                            />
                          </FormGroup>
                        </Colxx>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      
      <Row className="mb-4">
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
          <Card>
            <CardBody>
              <CardTitle className="d-block d-md-inline-block pt-1">
                {/* <IntlMessages id="table.divided" /> */}
                {/* <h1>{pagetitle}</h1> */}
                {/* <h3>Two Factor Authentication</h3> */}
              </CardTitle>
              <Colxx xxs="12">
                <Row className="mb-4">
                  <Colxx xxs="6">
                    <Label>
                      {/* <IntlMessages id="form-components.primary" /> */}
                      Two Factor Authentication
                    </Label>
                    <Switch
                      className="custom-switch custom-switch-primary"
                      checked={twoFaStatus}
                      onChange={(primary) => doSetTwoFaStatus(primary)}
                    />
                  </Colxx>
                </Row>
                {isDisablingTwoFa && (
                  
                <Formik
                // initialValues={initialValues}
                onSubmit={handleTwoFaDisable}
                // validationSchema={registerScheme}
              >
                {() => (
                  <Form>
                    {/* <Row>
                      <Colxx xxs="12" xxl="12">
                        <img alt='Two-FA QR' src={twoFaReqImg}/>
                      </Colxx>
                    </Row> */}
                    <Row>
                      <Colxx xxs="12" xxl="12" className="mb-5">
                        {twoFaReqCode}
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            {/* <IntlMessages id="user.first-name" /> */}
                            Security Code
                          </Label>
                          <Field
                            className="form-control"
                            // name="firstName"
                            value={twoFactorInputCode}
                            onChange={(e) => setTwoFactorInputCode(e.target.value)}
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <Row>
          
          <Button
                  color="primary"
                  className={`btn-shadow btn-multiple-state ${
                    isLoading ? 'show-spinner' : ''
                  }`}
                  size="lg"
                                  disabled={isLoading}
                                >
                                  {isLoading && (

                                    <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                                  )}
                                  {isLoading && <span>&nbsp;&nbsp;Waiting...</span>}
                                  {!isLoading && <span>Disable</span>}
                  {/* <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.login-button" />
                  </span> */}
                </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
                )}
                {authBy === "app" && (
                  
                <Formik
                // initialValues={initialValues}
                onSubmit={handleTwoFaSubmit}
                // validationSchema={registerScheme}
              >
                {() => (
                  <Form>
                    <Row>
                      <Colxx xxs="12" xxl="12">
                        <img alt='Two-FA QR' src={twoFaReqImg}/>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12" xxl="12" className="mb-5">
                        {twoFaReqCode}
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            {/* <IntlMessages id="user.first-name" /> */}
                            Security Code
                          </Label>
                          <Field
                            className="form-control"
                            // name="firstName"
                            value={twoFactorInputCode}
                            onChange={(e) => setTwoFactorInputCode(e.target.value)}
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <Row>
          
          <Button
                  color="primary"
                  className={`btn-shadow btn-multiple-state ${
                    isLoading ? 'show-spinner' : ''
                  }`}
                  size="lg"
                                  disabled={isLoading}
                                >
                                  {isLoading && (

                                    <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                                  )}
                                  {isLoading && <span>&nbsp;&nbsp;Waiting...</span>}
                                  {!isLoading && <span>Enable</span>}
                  {/* <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.login-button" />
                  </span> */}
                </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
                )}
                {authBy === "sms" && (
                  
                <Formik
                // initialValues={initialValues}
                onSubmit={handleTwoFaSmsSubmit}
                // validationSchema={registerScheme}
              >
                {() => (
                  <Form>
                    <Row>
                      <Colxx xxs="12" xxl="12">
                        dkkdkdkdk
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            {/* <IntlMessages id="user.first-name" /> */}
                            Phone
                          </Label>
                          <Field
                            className="form-control"
                            // name="firstName"
                            enabled={false}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>
                    <Row>
                      <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            {/* <IntlMessages id="user.first-name" /> */}
                            Phone Confirmation Code
                          </Label>
                          <Field
                            className="form-control"
                            // name="firstName"
                            value={phoneCode}
                            onChange={(e) => setPhoneCode(e.target.value)}
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>

                    <Row>
          
          <Button
                  color="primary"
                  className={`btn-shadow btn-multiple-state ${
                    isLoading ? 'show-spinner' : ''
                  }`}
                  size="lg"
                                  disabled={isLoading}
                                >
                                  {isLoading && (

                                    <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                                  )}
                                  {isLoading && <span>&nbsp;&nbsp;Waiting...</span>}
                                  {!isLoading && <span>SAVE</span>}
                  {/* <span className="spinner d-inline-block">
                    <span className="bounce1" />
                    <span className="bounce2" />
                    <span className="bounce3" />
                  </span>
                  <span className="label">
                    <IntlMessages id="user.login-button" />
                  </span> */}
                </Button>
                    </Row>
                  </Form>
                )}
              </Formik>
                )}
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      
      <Row className="mb-4">
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
          <Card>
            <CardBody>
              <CardTitle className="d-block d-md-inline-block pt-1">
                {/* <IntlMessages id="table.divided" /> */}
                {/* <h1>{pagetitle}</h1> */}
                <h3>Change Password</h3>
              </CardTitle>
              <Colxx xxs="12">

            <Row>              
              <AlertNotice
                message={message}
                isNotError={isSuccess}
                isError={isError}
                classStyle="form-input"
              />
              </Row>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleChangePassSubmit}
                  validationSchema={registerScheme}
                >
                  {() => (
                    <Form>
                    <Row>
                      <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            {/* <IntlMessages id="user.first-name" /> */}
                            Current Password
                          </Label>
                          <Field
                            className="form-control"
                            // name="firstName"
                            value={curPassword} onChange={(e) => setCurPassword(e.target.value)}
                          />
                        </FormGroup>
                      </Colxx>
                    </Row>
                      <Row>
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              {/* <IntlMessages id="user.first-name" /> */}
                              New Password
                            </Label>
                            <Field
                              className="form-control"
                              // name="firstName"
                              value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </FormGroup>
                        </Colxx>
                      </Row>
                      <Row>
                        <Colxx xxs="12">
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              {/* <IntlMessages id="user.first-name" /> */}
                              Confirm Password
                            </Label>
                            <Field
                              className="form-control"
                              value={confPassword} onChange={(e) => setConfPassword(e.target.value)}
                            />
                          </FormGroup>
                        </Colxx>
                      </Row>
                    </Form>
                  )}
                </Formik>
              </Colxx>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      
<Modal
  isOpen={modalBack}
  toggle={() => setModalBack(!modalBack)}
  backdrop={backdrop}
>
  <ModalHeader>Two Factor Authentication By</ModalHeader>
  <ModalBody>

    
                            
  <Row>
                              {/* <Colxx xxl="4"> */}
                                <div className="text-center mb-3 pr-2">
                                <Button
                        color="primary"
                        type="submit"
                        onClick={() => authBySms()}
                      >
                        
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        
                          <span>
                            Email
                          </span>
                      </Button>
                                </div>{'    '} 

                                <div className="text-center mb-3">
                                <Button
                        color="primary"
                        onClick={() => authByApp()}
                      >
                        
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        
                          <span>
                            2-FA App
                          </span>
                      </Button>
                                </div>
                              {/* </Colxx> */}
                            </Row>
    
  </ModalBody>
  <ModalFooter />
  {/* </ModalFooter> */}
</Modal>
    </>
  );
};

export default Profile;
