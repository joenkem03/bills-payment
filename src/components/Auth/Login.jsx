import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
// import { axios } from 'axios';
import axios from 'axios';
import * as Yup from 'yup';

                                                                
import { 
    UserContainerBg,
    UserBoxContainer,
    UserBox
} from './AuthElements';
import { 
  Box,
  Grid,
  Stack,
  TextField, 
  Typography,
  Alert,
  AlertTitle 
 } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

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
      const res = axios.post('https://staging-api.icadpay.com/api/Auth/authenticate',payload)
        
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
        setMessage(response.data.message);
        setIsLoading(false);
      }).catch((er) => {
        console.log("error");
        console.log(er);
        console.log(er.response.data.message);
        setIsLoading(false);
        setIsError(true);
        setMessage(er.response.data.message);
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

  const validate = values => {
    const errors = {};
  
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
  
    return errors;
  };
  // const formik = useFormik({

  //   initialValues: initialValues,
  //   validate,
  //   onSubmit: values => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password:Yup.string().required().min('4')
  });

  return (
    <UserBoxContainer>
            <UserContainerBg/>
            <UserBox>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <img src="/img/logo.png" alt="" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">login</Typography>
                </Grid>
                <Grid item xs={12}>
                  { isError && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      {message}
                    </Alert>
                  )}
                  {/* {
                    isLogin && (
                      <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {}
                      </Alert>
                    )
                  } */}
                </Grid>
                <Grid item xs={12}>
                  <Formik 
                    initialValues={initialValues} 
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                    // onSubmit={(values, actions) => {
                    //   setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                    //     actions.setSubmitting(false);
                    //   }, 1000);
                    // }}
                    >
                    {props => (
                      <>
                      
                      {!isLogin && (
                        <form onSubmit={ props.handleSubmit}>
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                  fullWidth
                                  size='small'
                                  label="Email" 
                                  placeholder='Enter Email' 
                                  variant="outlined"
                                  name="email"
                                  value={ props.values.email}
                                  onChange={props.handleChange}
                                  error={ props.errors.email && true}
                                  autocomplete='off'
                                />
                                {props.errors.email && (
                                <Typography color="warning" variant='caption' >
                                    {props.errors.email}
                                </Typography>
                                )}
                            </Grid>
                            <Grid  item xs={12} >
                                <TextField
                                  fullWidth
                                  size='small'
                                  label="password" 
                                  placeholder='Enter Password' 
                                  variant="outlined"
                                  type="password"
                                  name="password"
                                  // validate={validatePassword}
                                  value={props.values.password}
                                  onChange={props.handleChange}
                                  error={ props.errors.password && true}
                                  autoComplete='off'
                                />
                                { props.errors.password &&(
                                <Typography color="warning" variant='caption' >
                                    { props.errors.password}
                                </Typography>
                                )}
                            </Grid>
                            <Grid container item xs={12} md={12} lg={12}>
                                  <Box 
                                      sx={{ 
                                        width:'100%',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'space-between',
                                        flexFlow:'row wrap'
                                      }}
                                    >

                                    <Typography component={Link} to="/user/forgot-password" variant="caption">Forget Password?</Typography>
                                  
                                    <LoadingButton 
                                      disabled={ !props.errors && true}
                                      loading={isLoading}
                                      variant="outlined"
                                      type="submit"
                                    >
                                      Login
                                    </LoadingButton>
                                  </Box>
                            </Grid>
                          </Grid>
                        </form>
                        )
                      }
                      {
                        isLogin && (
                          <Formik initialValues={initialValues} onSubmit={handleTwoFaSubmit}>
                              {(props) => (
                                <form onSubmit={props.handleTwoFaSubmit}>
                                  <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                          fullWidth
                                          size='small'
                                          label="Code" 
                                          placeholder='Enter Code' 
                                          variant="outlined"
                                          name="code"
                                          validate={validateCode}
                                          onChange={props.handleChange}
                                          autocomplete='off'
                                        />
                                        {props.errors.email && (
                                        <Typography color="warning" variant='caption' >
                                            {props.errors.email}
                                        </Typography>
                                        )}
                                    </Grid>
                                    <Grid container item xs={12} md={12} lg={12}>
                                        <Box 
                                            sx={{ 
                                              width:'100%',
                                              display:'flex',
                                              alignItems:'center',
                                              justifyContent:'space-between',
                                              flexFlow:'row wrap'
                                            }}
                                          >

                                          <Typography component={Link} to="/user/forgot-password" variant="caption">Forget Password?</Typography>
                                        
                                          <LoadingButton 
                                            disabled={ !props.errors && true}
                                            loading={isLoading}
                                            variant="outlined"
                                            type="submit"
                                          >
                                            Login
                                          </LoadingButton>
                                        </Box>
                                    </Grid>
                                  </Grid>
                                </form>
                              )}
                          </Formik>
                        )
                      }
                      </>
                    )}
                  </Formik>            
                </Grid>
              </Grid>
            </UserBox>
    </UserBoxContainer>
  )
}
export default Login
