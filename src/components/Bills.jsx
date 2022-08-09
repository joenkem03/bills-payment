import React,{ useContext,useEffect } from 'react'
import Billsheader from './bills/header';
import Popular from './bills/popular';
// import { useState } from 'react';
// import axios from 'axios';
// import LoadingContext from '../hooks/loadingContextontext';
import appContext from '../hooks/appHook';
const Bills = () => {
  // const [billers,setbillers] = useState();
  // const [category,setcategory] = useState();
  const {
    loading,
    getCat,
    getBillers,
    getNpps,
    altcategory,
    billerProducts,
    altbillerProducts,
    billloading,
    isloaded
  } = useContext(appContext);


  useEffect(()=>{
      getCat();
      getBillers();
      getNpps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(()=>{
      if(billerProducts.lenght > 0){
        // console.log(billerProducts);  
      }
  },[billerProducts])
  
  

  return (
    <>
      <Billsheader data={billerProducts} loading={billloading}/>  
      <Popular bills={altcategory} loading={loading}/>
    </>
  )
}

export default Bills