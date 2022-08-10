/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { 
    UserBox,
    UserBoxContainer,
    UserContainerBg
} from './AuthElements'
import { Formik } from 'formik';
import { RegisterService } from '../../services/AuthService';
// import { Row, Card, CardTitle, FormGroup, Label, Button } from 'reactstrap';
// import SearchSelect from '../common/searchSelect';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';

import { 
    Grid,
    Typography,
    TextField,
    Box,
    List,
    ListItem,
    ListItemAvatar,
    Avatar
} from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import CheckIcon from '@mui/icons-material/Check';
import * as Yup from 'yup';
import YupPassword from 'yup-password'
import PasswordChecklist from "react-password-checklist"
YupPassword(Yup);

const registerScheme = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
    merchantName: Yup.string().required('Required'),
    // merchantTypeId: Yup.number().min(2, "Select a Service Type").max(729,  "Select a Service Type").required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string()
                .min(8, 'Password must be 8 characters long')
                .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
                .minLowercase(1, 'password must contain at least 1 lower case letter')
                .minUppercase(1, 'password must contain at least 1 upper case letter')
                .minNumbers(1, 'password must contain at least 1 number')
                .minSymbols(1, 'password must contain at least 1 special character')
                .required('Required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
});
const handlePassword = (value)=>{
    const err = [
        'Password must be 8 characters long',
        'password must contain at least 1 lower case letter',
        'password must contain at least 1 upper case letter',
        'password must contain at least 1 number',
        'password must contain at least 1 special character'
    ];
    return(
        <>
        {/* <Typography color="warning" variant='caption' >Password Must have at least</Typography> */}
        {/* <List dense={true}>
            {
                err.map((i,error)=>{
                    if(error === err[i]){
                        return(
                            <Typography color={error === err[0] && "error"} variant='caption' >{err[0]} { error === err[0] ? <ReportIcon/> : <CheckIcon/> }</Typography>
                        )
                    }
                })
            }
            <ListItem m={0}><Typography color={value === err[0] ? "error" : "green"} variant='caption' sx={{ display:'flex', alignItems:'center'}} >8 Characters { value === err[0] ? <ReportIcon/> : <CheckIcon/> }</Typography></ListItem>
            <ListItem m={0}><Typography color={value === err[1] ? "error" : "green"} variant='caption' >1 Lowercase letter{ value === err[1] ? <ReportIcon/>:<CheckIcon/>}</Typography></ListItem>
            <ListItem m={0}><Typography color={value === err[2] ? "error" : "green"} variant='caption' >1 Uppercase letter</Typography></ListItem>
            <ListItem m={0}><Typography color={value === err[3] ? "error" : "green"} variant='caption' >1 Number letter</Typography></ListItem>
            <ListItem m={0}><Typography color={value === err[4] ? "error" : "green"} variant='caption' >1 Special Character</Typography></ListItem>
        </List> */}
        </>
    )
    
}
const Register = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [option, setOption] = useState(null);


    const options = [];
  
    useEffect(() => {
        
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

    const handleBlur = async (values,actions)=>{
        console.log('data onBLur',values)
        console.log('data onBLur',actions)
        // console.log('data onBLur',data.password)
    }
    
  return (
    <UserBoxContainer>
            <UserContainerBg/>
            <UserBox >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Link to="/">
                            <img src="/img/logo.png" alt="" />
                        </Link>
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
                                onBlur={(values)=>{
                                    console.log('mksa', values)
                                }}
                                
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
                                            error={props.touched.merchantName && props.errors.merchantName && true}
                                            autoComplete='off'
                                            onBlur={props.handleBlur}

                                            // validate={validateEmail}
                                        />
                                        {props.touched.merchantName && props.errors.merchantName && (
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
                                            onBlur={props.handleBlur}
                                            error={ props.touched.firstName && props.errors.firstName && true}
                                            autoComplete='off'
                                            // validate={validateEmail}
                                        />
                                        {props.touched.firstName && props.errors.firstName && (
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
                                            error={props.touched.lastName && props.errors.lastName && true}
                                            autoComplete='off'
                                            onBlur={props.handleBlur}
                                            // validate={validateEmail}
                                        />
                                        {props.touched.lastName && props.errors.lastName && (
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
                                            error={props.touched.phone && props.errors.phone && true}
                                            autoComplete='off'
                                            onBlur={props.handleBlur}
                                            // validate={validatePhone}
                                        />
                                        {props.touched.phone && props.errors.phone && (
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
                                            error={ props.touched.email  && props.errors.email && true}
                                            autoComplete='off'
                                            onBlur={props.handleBlur}
                                            // validate={validateEmail}
                                        />
                                        {props.touched.email && props.errors.email && (
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
                                            error={ props.touched.password && props.errors.password && true}
                                            autoComplete='off'
                                            onBlur={props.handleBlur}

                                            // validate={validatePassword}
                                        />
                                        {props.touched.password && props.errors.password && (
                                            // <Typography color="warning" variant='caption' >
                                            //     {props.errors.password}
                                            // </Typography>
                                            <></>
                                        )}
                                        {
                                                <>
                                                    <Box sx-={{
                                                        background:"#f0f0f0"
                                                    }}>
                                                    <Typography sx={{fontSize: '12px'}} color="default" variant='caption'>Password must:</Typography>
                                                    <PasswordChecklist
                                                        rules={["minLength","lowercase","capital","number","specialChar"]}
                                                        minLength={5}
                                                        value={props.values.password}
                                                        messages={{
                                                            minLength: "Be a minimum of 8 Characters with",
                                                            lowercase:"Include at least one Lowercase letter (a-z)",
                                                            capital: "Include at least one Uppercase letter (A-Z)",
                                                            number: "Include at least one number (0-9)",
                                                            specialChar: "Include at least one Spaecial Character",
                                                        }}
                                                        iconSize="10"
                                                        style={{
                                                            padding:'5px 20px',
                                                            fontSize: '13px'
                                                        }}
                                                    />
                                                    </Box>
                                                </>
                                        }
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
                                        onBlur={props.handleBlur}
                                        // validate={validatePassword}
                                    />
                                    {props.touched.passwordConfirmation && props.errors.password && (
                                        <Typography color="warning" variant='caption' >
                                        {props.errors.passwordConfirmation}
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

                                                <Typography variant="caption">Already have an Account? <Typography sx={{
                                                    textDecoration: "underline",
                                                    textTransform: "uppercase"
                                                }} color="primary" component={Link} to="/user/login" variant="caption">Login</Typography></Typography>
                                                
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