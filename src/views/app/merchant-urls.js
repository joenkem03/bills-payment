
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, {useState, useEffect}  from 'react';
import { Formik, Form, Field } from 'formik';
// import * as Yup from 'yup';
import { Row, CardTitle, FormGroup, Label, Card, CardBody, Button } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import { GetMerchantProfileService } from 'services/ProtectedService';
import { Colxx } from 'components/common/CustomBootstrap';
import AlertNotice from 'components/common/alert';
// import ModalActionStatus from 'components/common/ModalActionStatus';
import Switch from 'rc-switch';
import 'rc-switch/assets/index.css';
import {
  AddWebHooks,
} from 'services/ProtectedService';

const MerchantUrls = ({merchant}) => {
  // const [modalRight, setModalRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
//   const [merchant, setMerchant] = useState([]);
  const [checkedTest, setCheckedTest] = useState(false);
  const [checkedLive, setCheckedLive] = useState(false);

  const [liveNotification, setLiveNotification] = useState("");
  const [callBackUrl, setCallBackUrl] = useState(merchant.callBackUrl);
  const [testNotification, setTestNotification] = useState("");
  const [testCallBack, setTestCallBack] = useState("");

  
  
  useEffect(() => {
    // // if (option === null) {
    //   GetMerchantProfileService().then((ret) => {
    //     // console.log(ret);
    //     // if(ret.data.length > 0){
    //     //   ret.data.forEach(element => {
    //     //     // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
    //     //       options.push({ value: element.id, label: `${element.name}` });              
    //     //     // }
    //     //   });
    //       setMerchant(ret.data);
    //     // }
    //   });
    // // }
    // // }
    setCallBackUrl(merchant.callBackUrl);
    setTestCallBack(merchant.testCallBackUrl);
    setLiveNotification(merchant.webHook);
    setTestNotification(merchant.testWebHook);
}, [merchant]);

    

// const registerScheme = Yup.object().shape({
//   firstName: Yup.string().required('Required'),
//   lastName: Yup.string().required('Required'),
//   // individualOrNon: Yup.string().required("Required"),
//   email: Yup.string().required('Required').email('Invalid email'),
//   // address: Yup.string().required(),
//   phone: Yup.string().required('Required'),
// });

// const initialValues = {
//   email: '',
//   firstName: '',
//   lastName: '',
//   phone: '',
// };


  // const handleSubmit = async (inputData) => {
  const lHandleSubmit = async () => {
    setIsLoading(true);
    // console.log(data);
    try {
      const req = {
        "isLive": true,
        "callBack": callBackUrl,
        "notification": liveNotification
      };
      console.log('signing up');
      console.log(req);

      AddWebHooks(req).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setIsSuccess(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
          console.log(response);
          setMessage(
            'Error occured! '
          );
        }
      }).catch ((et) => {
        console.log('error');
        console.log(et);
        setIsLoading(false);
        setIsError(true);
        setMessage(et.data);
      });
    } catch (e) {
      console.log('error');
      console.log(e);
      setIsLoading(false);
      setIsError(true);
      setMessage(e.data);
    }
  }
  const tHandleSubmit = async () => {
    setIsLoading(true);
    // console.log(data);
    try {
      const req = {
        "isLive": false,
        "callBack": testCallBack,
        "notification": testNotification
      };
      console.log('signing up');
      console.log(req);

      AddWebHooks(req).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setIsSuccess(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
          console.log(response);
          setMessage(
            'Error occured! '
          );
        }
      }).catch ((et) => {
        console.log('error');
        console.log(et);
        setIsLoading(false);
        setIsError(true);
        setMessage(et.data);
      });
    } catch (e) {
      console.log('error');
      console.log(e);
      setIsLoading(false);
      setIsError(true);
      setMessage(e.data);
    }
  };

  
  
  return (
    <>
      <Row className="pb-1">
      <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
        
      <Row>              
              <AlertNotice
                message={message}
                isNotError={isSuccess}
                isError={isError}
                classStyle="form-input"
              />
              </Row>
      <Card>
        <CardBody>
          <CardTitle className="d-block d-md-inline-block pt-1">
            {/* <IntlMessages id="table.divided" /> */}
            {/* <h1>{pagetitle}</h1> */}
            <h3>Test Urls</h3>
          </CardTitle>
        <Row className="mb-4">
          <Colxx xxs="6">
            <Label>
              {/* <IntlMessages id="form-components.primary" /> */}
              Edit
            </Label>
            <Switch
              className="custom-switch custom-switch-primary"
              checked={checkedTest}
              onChange={(primary) => setCheckedTest(primary)}
            />
          </Colxx>
        </Row>
        <Colxx xxs="12">
              <Formik
                initialValues={{ t_callBack: testCallBack, t_notification: testNotification, t_isLive: false}}
                // initialValues={{ callBack: merchant.testCallBackUrl, notification: merchant.testWebHook, isLive: false}}
                onSubmit={tHandleSubmit}
                // validationSchema={registerScheme}
              >
                {() => (
          <Form>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Callback
                    </Label>
                    <Field
                      className="form-control"
                      name="t_callBack"
                      value={testCallBack}
                      onChange={(e) => setTestCallBack(e.target.value)}
                      disabled={!checkedTest}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Notification
                    </Label>
                    <Field
                      className="form-control"
                      name="t_notification"
                      value={testNotification}
                      onChange={(e) => setTestNotification(e.target.value)}
                      disabled={!checkedTest}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            {checkedTest && 
            
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
                    </Button>}
          </Form>
                )}
              </Formik>
        </Colxx>
        </CardBody>
        </Card>
        </Colxx>
      </Row>
      
      <Row className="pt-1">
      <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
      <Card>
        <CardBody>
          <CardTitle className="d-block d-md-inline-block pt-1">
            {/* <IntlMessages id="table.divided" /> */}
            {/* <h1>{pagetitle}</h1> */}
            <h3>Live Urls</h3>
          </CardTitle>
        <Row className="mb-4">
          <Colxx xxs="6">
            <Label>
              {/* <IntlMessages id="form-components.primary" /> */}
              Edit
            </Label>
            <Switch
              className="custom-switch custom-switch-primary"
              checked={checkedLive}
              onChange={(primary) => setCheckedLive(primary)}
            />
          </Colxx>
        </Row>
        <Colxx xxs="12">
              <Formik
                initialValues={{ l_callBack: callBackUrl, l_notification: liveNotification, l_isLive: true}}
                // initialValues={{ callBack: merchant.callBackUrl, notification: merchant.webHook, isLive: true}}
                onSubmit={lHandleSubmit}
                // validationSchema={registerScheme}
              >
                {() => (
          <Form>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Callback
                    </Label>
                    <Field
                      className="form-control"
                      name="l_callBack"
                      onChange={(e) => setCallBackUrl(e.target.value)}
                      value={callBackUrl}
                      disabled={!checkedLive}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                  <FormGroup className="form-group has-float-label  mb-4">
                    <Label>
                      {/* <IntlMessages id="user.first-name" /> */}
                      Notification
                    </Label>
                    <Field
                      className="form-control"
                      name="l_notification"
                      onChange={(e) => setLiveNotification(e.target.value)}
                      value={liveNotification}
                      disabled={!checkedLive}
                    />
                  </FormGroup>
              </Colxx>
            </Row>
            {checkedLive && 
            
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
                    </Button>}
          </Form>
                )}
              </Formik>
        </Colxx>
        </CardBody>
        </Card>
        </Colxx>
      </Row>


    </>
  );
};

export default MerchantUrls;
