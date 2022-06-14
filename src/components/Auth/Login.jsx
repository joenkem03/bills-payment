import React, { useState, useEffect } from 'react';
// import * as Yup from "yup";
import { Col , Row, Card, CardTitle, Label, FormGroup, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { axios } from 'axios';

                                                                
import { 
    LoginContainer,
    FixedBg
} from './AuthElements';
// import { connect } from 'react-redux';

// import { NotificationManager } from 'components/common/react-notifications';

// import { loginUser } from '../../redux/actions';
// import { Colxx } from '../common/CustomBootstrap';
// import IntlMessages from 'helpers/IntlMessages';
// import {LoginService} from '../../services/AuthService';
// import {TwoFActorAuthorize} from '../../services/ProtectedService';
// import AlertNotice from '../common/alert';

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};
const validateCode = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your password';
  } else if (value.length < 4) {
    error = 'Value must be longer than 3 characters';
  }
  return error;
};

const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Please enter your email address';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
};


// const loginScheme = Yup.object().shape({
//   email: Yup.string().required().email(),
//   password: Yup.string().required(),
// });

const Login = () => {
  // const [email] = useState('demo@gogo.com');
  // const [password] = useState('gogo123');

  const [isLoading, setIsLoading] = useState(false);
  const [loading, setloading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [tempToken, setTempToken] = useState('');
  const [authPro, setAuthPro] = useState('');

  // const [loaded, setLoaded] = useState(false);
  // const [isNotError, setIsNotError] = useState(false);

//   useEffect(() => {
//     if (error) {
//       NotificationManager.warning(error, 'Login Error', 3000, null, null, '');
//     }
//   }, [error]);

  // const onUserLogin = (values) => {
  //   if (!loading) {
  //     if (values.email !== '' && values.password !== '') {
  //       loginUserAction(values, history);
  //     }
  //   }
  // };

  
  
  const handleTwoFaSubmit = async (e) => {
    setIsLoading(true);

    // preLogin
    //   TwoFActorAuthorize({"inputCode": e.code,"authProvider": authPro}, tempToken).then((response) => {  
    //     console.log(response);
    //     // response?.token  
    //     if (parseInt(response.status, 10) === 200) {
    //       console.log("xx");
    //       console.log(response.data);
    //       console.log(history);
    //       // if(!response.data.twoFactorStatus){
    //       loginUserAction(response.data, history);
    //       // } else{
    //       //   setIsLogin(true);
    //       // }
    //     } 
    //     else{
    //       setIsError(true);
    //     }
    //       setMessage(response.message);
    //       setIsLoading(false);
    //   }).catch((er) => {
    //     console.log("error");
    //     console.log(er);
    //     console.log(er.message);
    //     setIsLoading(false);
    //     setIsError(true);
    //     setMessage(er.message);
    //   });
  };

  
  const handleSubmit = async (e) => {
    setIsLoading(true);
        const payload = {
            username: e.email,
            password: e.password,
        }
        const res = axios.post('https://app-service.icadpay.com/api/Auth/authenticate',payload)
        
      res.then((response) => {  
        console.log(response);
        // response?.token  
        if (parseInt(response.status, 10) === 200) {
        
          console.log("xx");
          // responseDisplay(response.data);
          // loginUserAction({email:"demo@gogo.com", password: "gogo123"}, history);
          console.log(response.data);
            //   console.log(history);
          if(!response.data.twoFactorStatus){
            // loginUserAction(response.data, history);
          } else{
            // localStorage.setItem('icard_current_user', JSON.stringify(response.data));
            setTempToken(response.data.token);
            setAuthPro(response.data.preLogin);
            setIsLogin(true);
          }
        } 
        else{
          setIsError(true);
        }
        setMessage(response.message);
        setIsLoading(false);
      }).catch((er) => {
        console.log("error");
        console.log(er);
        console.log(er.message);
        setIsLoading(false);
        setIsError(true);
        setMessage(er.message);
      });
    // } .catch (er) {
    //   console.log("error");
    //   console.log(er);
    //   setIsLoading(false);
    //   setIsError(true);
    //   setMessage(er.message);
    // }
  };

  const initialValues = { email: "", password: ""};

  return (
        // <div class="h-100">
            // {/* <FixedBg/>
            // <img src="./img/balloon-lg.jpg" alt="" /> */}
            <LoginContainer>
                    <div class="row no-gutter">
                        <div class="col-md-6 d-none d-md-flex bg-image"></div>

                        <div class="col-md-6 bg-light">
                            <div class="login d-flex align-items-center py-5">

                                <div class="container">
                                    <div class="row">
                                        <div class="col-lg-10 col-xl-7 mx-auto">
                                            <h3 class="display-4">Icadpay Login!</h3>

                                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                                {({ errors, touched }) => (
                                                    <Form className="av-tooltip tooltip-label-bottom">
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                        </Label>
                                                        <Field
                                                        className="form-control"
                                                        name="email"
                                                        validate={validateEmail}
                                                        />
                                                        {errors.email && touched.email && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.email}
                                                        </div>
                                                        )}
                                                    </FormGroup>
                                                    <FormGroup className="form-group has-float-label">
                                                        <Label>
                                                        </Label>
                                                        <Field
                                                        className="form-control"
                                                        type="password"
                                                        name="password"
                                                        validate={validatePassword}
                                                        />
                                                        {errors.password && touched.password && (
                                                        <div className="invalid-feedback d-block">
                                                            {errors.password}
                                                        </div>
                                                        )}
                                                    </FormGroup>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <NavLink to="/user/forgot-password">
                                                        </NavLink>
                                                        <Button 
                                                            // color="primary"
                                                            style={{backgroundColor:'#900604 !important',}}
                                                            className={` ${loading ? 'show-spinner' : ''
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
                                                            {!isLoading && <span>Login</span>}
                                                        
                                                        </Button>
                                                    </div>
                                                    </Form>
                                                )}
                                                </Formik>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
            </LoginContainer>
        // </div>
  )
}
export default Login
