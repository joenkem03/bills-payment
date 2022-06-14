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
  const {loading,getCat,category,getBillers,billerProducts,billloading} = useContext(appContext);


  useEffect(()=>{
      getCat();
      getBillers();
  },[])
  
  useEffect(()=>{
      if(billerProducts.lenght > 0){
        console.log(billerProducts);  
      }
  },[billerProducts])
  

  return (
    <>
      <Billsheader data={billerProducts} loading={billloading}/>  
      <Popular bills={category} loading={loading}/>
    </>
  )
}

export default Bills