import React from 'react'
import { Outlet } from 'react-router-dom';
import Navbar from "../Navbar/Navbar";

const layout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

export default layout