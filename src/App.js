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
            src="http://demo.icadpay.com/inline-pay.js"
            // src="https://pay-service.icadpay.com/inline-pay.js"
            async
          ></script>
      </Helmet>
      
      {loading && <TopBarProgress /> }
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='bills' element={<Bills/>}/>
          <Route path='/dashboard' element={<Dashboard load={setLoading}/>}>
            <Route path=':biller' element={<Dashboard/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
