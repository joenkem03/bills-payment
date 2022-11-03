// import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Bills from './components/Bills';
import Layout from './components/Layout/layout';
import Dashboard from './components/dashboard/Dashboard';
import { Helmet } from "react-helmet"
import TopBarProgress from "react-topbar-progress-indicator";
import { useState } from 'react';
import UserLayout from './layout/UserLayout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BillerDash from './components/dashboard/BillerDash';
import Confirm from './components/Auth/Confirm';

function App() {

  const [loading,setLoading]= useState(false);

  TopBarProgress.config({
    barColors: {
      "0": "blue",
      "1.0": "red"
    },
    shadowBlur: 5
  });
  return (
    <>
      <Helmet>
          <script
            src="https://demo.icadpay.com/inline-stage-pay.js"
            // src="https://demo.icadpay.com/inline-stage-pay.js"
            async
          ></script>
      </Helmet>
      
      {loading && <TopBarProgress /> }
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='bills' element={<Bills/>}/>
          <Route path='*' element={<Home/>}/>
          
          <Route path='/dashboard' element={<Dashboard load={setLoading}/>}>
            <Route path=':biller' element={<Dashboard/>} />
          </Route>
          <Route path='/dashboard/nipost' element={<BillerDash load={setLoading}/>}>
          </Route>
        </Route>
        <Route path='/user' element={<UserLayout/>}>
          <Route path='/user/login' element={<Login/>}/>
          <Route path='/user/register' element={<Register/>}/>
          <Route path='/user/confirm-account/:id' element={<Confirm/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
