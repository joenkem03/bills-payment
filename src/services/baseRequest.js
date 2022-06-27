
// import axios from "axios";
import { getCurrentUser } from '../helpers/Utils';

const axios = require('axios');


const currentUser = getCurrentUser();


const config = {
    headers: {
      Authorization: `Bearer ${currentUser?.token}`,
    //   "Content-Type": "application/json",
    },
  };

  const configz = {
      headers: {
      contentType: 'application/json; charset=utf-8', 
      },
    };

export const postRequest = async(url, data) => {
    // let res = axios.post(url, data);
    // axios.post(url, data).then((res) => {
    //     return res;
    // }).catch((er) => {
    //     console.log(er.response);
    //     console.log(er.response.data);
    //     return er.response;
    // });

    try {
        const res = await axios.post(url, data);
        console.log(res);
        return res;
    } catch (er) {
        console.log(er.response);
        console.log(er.response.data);
        return er.response.data;        
    }
};

export const getRequest = async(url) => {
    // // let res = axios.post(url, data);
    // axios.post(url).then((res) => {
    //     return res;
    // }).catch((er) => {
    //     return er;
    // });
    
    try {
        const res = await axios.get(url);
        console.log(res, configz);
        return res;
    } catch (er) {
        console.log(er.response);
        console.log(er);
        return er.response;        
    }
};

export const postAuthRequest = async(url, data) => {
    // let res = axios.post(url, data);
    // axios.post(url, data, config).then((res) => {
    //     return res;
    // }).catch((er) => {
    //     return er;
    // });
    

    try {
        const res = await axios.post(url, data, config);
        console.log(res);
        return res;
    } catch (er) {
        console.log(er.response);
        console.log(er);
        return er.response.data;        
    }
};

export const getAuthRequest = async(url) => {
    try {
        const res = await axios.get(url, config);
        console.log(res);
        return res;
    } catch (er) {
        console.log(er.response);
        console.log(er);
        return er.response;        
    }
} 