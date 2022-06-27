import { useState, useEffect } from 'react'
import { 
    UserBox,
    UserBoxContainer,
    UserContainerBg
} from './AuthElements'
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RegisterService, GetBusinessTypes } from '../../services/AuthService';
import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import SearchSelect from '../common/searchSelect';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';

import { 
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Box
 } from '@mui/material';

const registerScheme = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
    merchantName: Yup.string().required('Required'),
    // merchantTypeId: Yup.number().min(2, "Select a Service Type").max(729,  "Select a Service Type").required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').matches(/[a-zA-Z]/, 'Password can only contain Latin letters.').required('Required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});

const Register = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [option, setOption] = useState(null);


    const options = [];
  
    useEffect(() => {
    //   if (option === null) {
    //     GetBusinessTypes().then((ret) => {
    //       console.log(ret);
    //       if (ret.data.length > 0) {
    //         ret.data.forEach((element) => {
    //           options.push({ value: element.id, label: `${element.name}` });
    //         });
    //         setOption(options);
    //       }
    //     });
    //   }
      // }
    }, []);



    const handleIdChange = () => {};


    const handleSubmit = async (inputData) => {
        setIsLoading(true);
        console.log('signing up');
        try {
          const req = {
            firstName: inputData.firstName,
            lastName: inputData.lastName,
            merchantName: inputData.merchantName,
            merchantTypeId: inputData.merchantTypeId,
            phone: inputData.phone,
            email: inputData.email,
            password: inputData.password,
            passwordConfirmation: inputData.passwordConfirmation,
          };
          console.log('signing up');
          console.log(req);
          
          RegisterService(req).then((response) => {
            console.log(response);
            if (response.status === 200) {
              setIsSuccess(true);
              setIsLoading(false);
            }
            if (response.status === 400) {
              setIsLoading(false);
              setIsError(true);
              setMessage(response.data.data);
            } else {
              setIsLoading(false);
              setIsError(true);
              console.log(response);
              setMessage(
                'Error occured! Kindly check that email and phone number are not previously registered'
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
    
      const initialValues = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        merchantName: "",
        merchantTypeId: 0,
        phone: "",
        passwordConfirmation: "",
      };
  return (
    <UserBoxContainer>
            <UserContainerBg/>
            <UserBox >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <img src="/img/logo.png" alt="" />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography variant="h5">Register</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            !isSuccess && (
                                <Formik
                                initialValues={initialValues}
                                
                                validationSchema={registerScheme}
                                onSubmit={handleSubmit}
                                // onSubmit={(values, actions) => {
                                //     setTimeout(() => {
                                //       alert(JSON.stringify(values, null, 2));
                                //       actions.setSubmitting(false);
                                //     }, 1000);
                                //   }}
                            >
                            { (props) => (
                            <form onSubmit={ props.handleSubmit}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            label="Merchant Name"
                                            name="merchantName"
                                            value={props.values.merchantName}
                                            onChange={props.handleChange}
                                            error={ props.errors.merchantName && true}
                                            autoComplete='off'
                                            // validate={validateEmail}
                                        />
                                        {props.errors.merchantName && (
                                            <Typography color="warning" variant='caption' >
                                            {props.errors.merchantName}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="firstName"
                                            label="First Name"
                                            value={props.values.firstName}
                                            onChange={props.handleChange}
                                            error={ props.errors.firstName && true}
                                            autoComplete='off'
                                            // validate={validateEmail}
                                        />
                                        {props.errors.firstName && (
                                            <Typography color="warning" variant='caption'  >
                                            {props.errors.firstName}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="lastName"
                                            label="Last Name"
                                            value={props.values.lastName}
                                            onChange={props.handleChange}
                                            error={ props.errors.lastName && true}
                                            autoComplete='off'
                                            // validate={validateEmail}
                                        />
                                        {props.errors.lastName && (
                                            <Typography color="warning" variant='caption'  >
                                            {props.errors.lastName}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="phone"
                                            label="Phone Number"
                                            value={props.values.phone}
                                            onChange={props.handleChange}
                                            error={ props.errors.phone && true}
                                            autoComplete='off'
                                            // validate={validatePhone}
                                        />
                                        {props.errors.phone && (
                                            <Typography color="warning" variant='caption' >
                                            {props.errors.phone}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            name="email"
                                            label="Email"
                                            value={props.values.email}
                                                onChange={props.handleChange}
                                                error={ props.errors.email && true}
                                                autoComplete='off'
                                            // validate={validateEmail}
                                        />
                                        {props.errors.email && (
                                            <Typography color="warning" variant='caption' >
                                            {props.errors.email}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            type="password"
                                            name="password"
                                            label="Password"
                                            value={props.values.password}
                                                onChange={props.handleChange}
                                                error={ props.errors.password && true}
                                                autoComplete='off'
                                            // validate={validatePassword}
                                        />
                                        {props.errors.password && (
                                            <Typography color="warning" variant='caption' >
                                            {props.errors.password}
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        type="password"
                                        name="passwordConfirmation"
                                        label="Confirm Password"
                                        value={props.values.passwordConfirmation}
                                            onChange={props.handleChange}
                                            error={ props.errors.passwordConfirmation && true}
                                            autoComplete='off'
                                        // validate={validatePassword}
                                    />
                                    {props.errors.password && (
                                        <Typography color="warning" variant='caption' >
                                        {props.errors.password}
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

                                                <Typography component={Link} to="/user/login" variant="caption">Already have an Accout? Login</Typography>
                                                
                                                <LoadingButton 
                                                    disabled={ !props.errors && true}
                                                    loading={isLoading}
                                                    variant="outlined"
                                                    type="submit"
                                                >
                                                    Register
                                                </LoadingButton>
                                                </Box>
                                    </Grid>
                                </Grid>
                            </form>
                            )}
                                </Formik>
                            )
                        }
                        {
                            isSuccess && (
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Typography variant='subtitle1'>Confirmation Link has been Sent Too the Email address Provided</Typography>
                                    </Grid>
                                </Grid>
                            )
                        }
                    </Grid>
                </Grid>
            </UserBox>
    </UserBoxContainer>
  )
}

export default Register