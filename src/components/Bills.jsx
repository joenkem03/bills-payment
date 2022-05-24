import React from 'react'
import Billsheader from './bills/header';
import Popular from './bills/popular';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
const Bills = () => {
  const [billers,setbillers] = useState();
  const [category,setcategory] = useState();


  useEffect(()=>{
      getCat();
  },[])
  
  
  const getCat = async ()=>{

    const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/servicesCategory');
    const billsdata = await billers.data;
    console.log(billsdata);
    setbillers(billsdata);

  }
  

  return (
    <>
      <Billsheader data={billers}/>  
      <Popular bills={billers}/>
    </>
  )
}

export default Bills