import React from 'react'
import { useParams } from 'react-router-dom'
import { ConfirmEmailService } from '../../services/AuthService';
import { useEffect } from 'react';
import { UserBox, UserBoxContainer, UserContainerBg } from './AuthElements';
import { useState } from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';

const Confirm = () => {
  const params = useParams();
  const [message, setMessage] = useState('something went wrong try again')
  const verifyEmail = async (id)=>{
    const payload ={
        code: id
    }
    const response = ConfirmEmailService(payload);
    response.then((res)=>{
        if(res.status === 400){
            setMessage('Email Has Been Confirmed')
        }
        if(res.status === 200){
            setMessage('Email Verified Succesfully Login too Continue');
        }

    })
  }
  useEffect(()=>{
    verifyEmail(params.id);
  },[params.id])
  const login = ()=>{
    console.log('login');
    // window.location.replace('https://icadpay.com/user/login')
    // window.open('https://icadpay.com/user/login', "_blank")
    window.open('https://portal.icadpay.com/user/login', "_blank")

  }
  return (
    <UserBoxContainer>
        <UserContainerBg/>
        <UserBox>
            <div
                style={{
                    width: '100%',
                    height:'60vh',
                    display:'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >

            <Typography variant="h6" sx={{
                textTransform: 'capitalize',
                marginBottom:'30px'
            }}>{message}</Typography>
            <Button variant="contained" onClick={login}>
                Login
            </Button>
            </div>
        </UserBox>
    </UserBoxContainer>
  )
}

export default Confirm