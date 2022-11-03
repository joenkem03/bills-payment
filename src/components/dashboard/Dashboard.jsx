import React, { useState, useEffect,useCallback ,useMemo} from "react";
import { useParams , useLocation} from "react-router-dom";
import {  DashMain, DashMainContent, DListimg,Loader } from "../bills/billsElements";
import Sidebar from "../bills/Sidebar";
import Modal from "../modal/modal";
// import { useRouter } from 'next/router'
import axios from "axios";
// import Script from 'next/script'
import { isBrowser } from "react-device-detect";

import Skeleton from 'react-loading-skeleton'

// import Box from '@mui/material/Box';
import FormControl,{ useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import { 
        MenuItem, 
        Select, 
        TextField, 
        Typography,
        Grid,
        CircularProgress,
        circularProgressClasses
    } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader"
import PaymentModal from './../modal/paymentType';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon   from '@mui/icons-material/Close';


const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  });
NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

// function ValidateRecipient() {
//     const { focused, onChange  } = useFormControl() || {};
//     // const [error, setError] = useState('');
//     // const [value, setValue] = useState('');
//     // const [isValid, setIsValid] = useState(false);

//     // const helperText = React.useMemo(() => {
//     //     if (focused) {
//     //         return 'This field is being focused';
//     //     }
    
//     //     return 'Helper text';
//     // }, [focused]);
//     const validate = React.useMemo(() => {
//         onChange(value =>{
//             if (value.length < 3) {
//                 return 'Name must be at least 3 characters';
//                 console.log(value.target.value);
//             }
//             console.log(value.target.value);
//             return null;
//         });
//     },[onChange])

//     return <FormHelperText>{validate}</FormHelperText>;
// }
const Dashboard = (props) => {

    const [bills,setBills]=useState('');
    const [selectedBiller,setselectedBiller]=useState('');
    const [amount_,setamount]=useState(0);
    const [email,setemail]=useState('');
    const [phone,setphone]=useState('');
    const [name,setname]=useState('');
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [modal,setmodal]=useState(false);
    const [fixed,setfixed]=useState(false);
    const [active,setactive]=useState(false);
    const [variety, setVariety]=useState(false);
    const [varietyData, setVarietyData]=useState();
    const [type, setType]=useState('');
    const [serviceId, setServiceId]=useState({});

    const [billerCode, setbillerCode]=useState('');
    
    const [billerCodeValid, setbillerCodevalid]=useState(false);
    const [billerCodeValidMsg, setbillerCodeValidMsg]=useState('');
    const [tvPlan, settvPlan]=useState('');
    const [tvPlanAmount, settvPlanAmount]=useState(0);
    const [validCustomerTvData, setvalidCustomerTvData]=useState(false);
    const [isTvPlanRenew, setisTvPlanRenew]=useState(false);
    const [serviceBiller, setserviceBiller]=useState('');
    const [subType, setsubType]=useState('renew');

    const [billerCodeErr, setbillerCodeErr]=useState(false);
    const [billerCodeErrMsg, setbillerCodeErrMsg]=useState('');

    // eslint-disable-next-line no-unused-vars
    const [transactionId,setTransactionId]=useState('');
    const [proceed,setProceed]=useState(false);
    
    const [selectedVariety, setSelectedVariety]=useState({});
    const [selectedVarietyFields, setselectedVarietyFields]=useState([]);
    const [selectedVarietyStatus, setselectedVarietyStatus]=useState(false);
    const [selectedVarietyId, setSelectedVarietyId] = useState(null);


    const [productExist,setProductExist] = useState(false);
    const [paymentType,setPaymentType] = useState(false);

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const [color, setColor] = useState(" #2C63EA");
    const [transactionRefId, setTransactionRefId] = useState(null);
    const [key, setKey] = useState(null);
    const [power, setpower] = useState(false);
    const [powerdata, setpowerdata] = useState(null);
    const [ amountErr, SetAmountErr] = useState(false)
    const [ amountSuccess, SetAmountSuccess] = useState(false)

    const params = useParams();
    console.log(params)

    // const { biller } = params;
    const search = useLocation().search;
    const amount = new URLSearchParams(search).get('amount');
    const ref = new URLSearchParams(search).get('ref');

    const [steps, setSteps] = useState({});
    const [showqr,setshowqr] = useState(false);
    const [qr,setqr] = useState('');

    const handleValidation = useCallback( async ()=>{
        const payload ={
            billersCode: billerCode,
            serviceID: serviceId,
            type: type
        }
        const validation =await axios.post('https://staging-api.icadpay.com/api/AltBiller/customerValidation',payload)
        const validationData = await validation.data;
        // console.log(payload);
        // console.log(validationData);

        
        if(validationData.hasOwnProperty("error")){
            if(validationData.error === null){
                setbillerCodeErr(false);
                setbillerCodevalid(true)
            }else{
                setbillerCodeErr(true)
                setbillerCodevalid(false)
                setbillerCodeErrMsg(validationData.error)
                console.log('error in validation: ',validationData.error);
            }
        }

        if(validationData.hasOwnProperty("Customer_Name")){
            console.log('success in validation: ',validationData.hasOwnProperty("Customer_Name"));
            setbillerCodeErr(false)
            setbillerCodevalid(true)
            setbillerCodeValidMsg(validationData.Customer_Name); 
            setname(validationData.Customer_Name);
        }

        if(validationData.hasOwnProperty("Current_Bouquet")){
            settvPlan(validationData.Current_Bouquet);  
            setvalidCustomerTvData(true); 
        }

        if(validationData.hasOwnProperty("Renewal_Amount")){
            settvPlanAmount(validationData.Renewal_Amount);
            setamount(validationData.Renewal_Amount);
        }

        if(params.biller === 'airtime' || params.biller === 'data'){
            setname('Airtime Topup');
            setfirstname('Airtime')
            setlastname('Topup')
            setemail('AirtimeTopup@icadpay.com');
            setphone(billerCode);
            console.log("airtime OR data");
        }
        if(params.biller === 'electricity-bill'){
            setpower(true);
            setname(validationData.Customer_Name)
            console.log("Not airtime OR data");
        }
        if(params.biller === 'tv-subscription'){
            if(serviceBiller === 'dstv' || serviceBiller === 'gotv'){
                setisTvPlanRenew(true);
            }
        }
        
        setLoading2(false);
        // if(validationData.WrongBillersCode){
        //     setname(validationData.Customer_Name)
        // }
    },[billerCode, params.biller, serviceId, type]);
 
    useEffect(()=>{
        const name = new URLSearchParams(search).get('status');
        const ref = new URLSearchParams(search).get('ref');
        console.log(name)
        if(name === 'SUCCESS'){
            setTransactionRefId(ref);
            getValue(ref);
            // console.log('status: ',status);
            setmodal(true);
            console.log(fixed);
        }

    },[search,fixed])   


    useEffect(()=>{
        //console.log(selectedBiller.maximum_amount)
        //  || (parseInt(amount_) > parseInt(selectedBiller.maximum_amount)) Why is the maximum amount reading Zero. 
        if((phone.length <= 10) || (parseInt(amount_) < parseInt(selectedBiller.minimium_amount))) {
        // if((email.length < 3) || (phone.length <= 10) || (parseInt(amount_) < parseInt(selectedBiller.minimium_amount))) {
            setactive(false)
            // console.log('active: ',active);
        }else{
            setactive(true)
        }
     },[email,phone,active,selectedBiller,amount_])   

    useEffect(()=>{
        if(Object.keys(selectedBiller).length !== 0 ){
            
            // setamount(selectedBiller.amount)

            // if(selectedBiller.isAmountFixed == "true"){
            //     setfixed(true)
            // }else{
            //     setfixed(false)
            // }
            handleVariety(selectedBiller.serviceID);
            setServiceId(selectedBiller.serviceID);
        }

        if(Object.keys(selectedVariety).length !== 0){
                // eslint-disable-next-line array-callback-return
                selectedVariety.map(item => {
                    // console.log(item.fixedPrice)
                    if(item.fixedPrice === "Yes"){
                            setamount(item.variation_amount);
                            setType(item.variation_code);
                            setfixed(true)
                            // console.log(item.variation_amount)
                        }else{
                            setfixed(false)
                        }
                })
        }
    },[selectedBiller,selectedVariety])


    useEffect(()=>{
        if(selectedBiller.fixedPrice === "Yes"){
            SetAmountErr(false)
            SetAmountSuccess(true);

        }else{

            if(amount_ < parseInt(selectedBiller.minimium_amount) ){
                SetAmountErr(true)
                console.log( 'value < ',parseInt(selectedBiller.minimium_amount))
            }else{
                SetAmountErr(false)
                SetAmountSuccess(true);
            }
            
            if(amount_ >  parseInt(selectedBiller.maximum_amount) ){
                SetAmountErr(true)
            }else{
                SetAmountErr(false)
                SetAmountSuccess(true);
            }
        }
        
    },[amount_, selectedBiller])
    
    useEffect(()=>{
        if(billerCode === ''){
            setbillerCodeErr(false)
            setbillerCodevalid(false)
        }else{
            // if(billerCode.length <= 10){
            //     setbillerCodeErr(true)
            //     setbillerCodeErrMsg('Biller Code Error.. Check Again');
            //     console.log('biller code error')
            // }
            if (billerCode.length >= 5){
                setLoading2(true);
                console.log('biller code valid')
                handleValidation();
            }
        }
    },[billerCode])


    useEffect(()=>{
        if(isBrowser){
            setProceed(true)
        }else{
            setProceed(false)
        }
        
        getProducts();

     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getKey = async ()=>{
        const response = await axios.get('https://staging-api.icadpay.com/api/Auth/key');
        setKey(response.data.kex);
        getStatus();
    }

    const getStatus = async (ref)=>{
        const payload ={
            transactionRefId : ref,
            key: key
        }
        const response = await axios.get('https://staging-api.icadpay.com/api/query-status', payload);
        console.log(response.data);
    }

    useEffect(() => {
        if(transactionRefId !== null){
            getKey();
        }
    },[transactionRefId])

    const getValue = async(ref)=>{
        getStatus(ref)
        const payload ={
            reqId:ref
        }
        console.log(payload);
        const response = await axios.get('https://staging-api.icadpay.com/api/AltBiller/getValue', payload);
        const data = await response.data;
        setpowerdata(data)//
    }

    const handleSelectBiller = (bill)=>{
        const billData = {
            ...bill,
            minimium_amount : bill.minimium_amount === "" ? "0" : bill.minimium_amount
            }
        setselectedBiller(billData)
        console.log(bill)
    }
    
    const handlepaymentFull = async (data)=>{
        
        // setTransactionId(data)
        setPaymentType(false)

        console.log('handle full payment: ', name)
        const namearr = name.split(" ");
        const fname = namearr[0] === ''? 'firstname':namearr[0]
        const lname = namearr[1] === ''? 'lastname':namearr[1]
        
        console.log(fname +''+ lname )

        setfirstname(fname)
        setlastname(lname)
        // let txn =  data;
        // console.log(txn)

        console.log({
            email: email, // customer email 
            amount: amount_, // amount to be processed
            currency: "NGN", // currency
            first_name: fname,
            last_name: lname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: transactionId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            narration: 'something nice',
            isBill:true,
            callback_url: window.location.href,
        });

        // key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key.  
        // key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', // this is a demo key.  
        const payload = {
            key: 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', // this is not a demo key. 
            // key: 'test_MDE0OTY1Y2NjNDI0MjIyZjY1ZWYwOWQ1YzkyMmJjZTZkYzlhZDBiZDVkOTg5ZDBmZjllYTMyMzVjNTI4MmJmMQ', // this is a demo key.  
            // key: 'test_YzA1MmNmYzE0OTc1Y2QyM2ViNWUwNTIxOGMzZjA2MjI5N2M4ZDU3YmY5ZDg1ZmU1OWIwNWE1NDU0YjkzYTZkOQ', // this is a demo key.     
            email: email, // customer email 
            amount: parseFloat(amount_), // amount to be processed
            currency: "NGN", // currency
            first_name: fname,
            last_name: lname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: transactionId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            narration: fname + lname,
            isBill:true,
            // callback_url: window.location.href, // specified redirect URL (potional)
            callback_url: '', // specified redirect URL (potional)
            callback: (response) => {
                console.log(response);
            },
            onSuccess: (response) => {
              console.log(response);
                // const ref = response
                // localStorage.set('transactionResponse',response )

                if(setpower && type === 'prepaid'){
                    doGetElectricValue(transactionId)                    
                } else{
                    // console.log(name)
                    // if(name === 'SUCCESS'){
                    //     setTransactionRefId(ref);
                    //     getValue(ref);
                        // console.log('status: ',status);
                        setmodal(true);
                    //     console.log(fixed);
                    // }
                    
                }
                
            },
            onError: (response) => {
              console.log(response);
            },
            onClose: () => {
                // alert('window closed');
            }
        }
        
        console.log('window closed');
        const handler = window.IcadPay.setup(payload);
        handler.openIframe();
        props.load(false);
    }

    const doGetElectricValue = async (reqId) => {

        const powerToken = await axios.get('https://staging-api.icadpay.com/api/AltBiller/getValue?reqId='+reqId);
        
        console.log(powerToken);
        
        setpowerdata(powerToken.data)//
        setmodal(true);
    }

    const handleVariety = async (id)=>{
        console.log(id);
        setserviceBiller(id);
        const variety = await axios.get('https://staging-api.icadpay.com/api/AltBiller/serviceVariety?id='+id);
        // const variety = await axios.get('https://staging-api.icadpay.com/api/Biller/billerProducts?billerId='+id);
        // const varietyData = variety.data.products;
        const varietyData = variety.data.varations;
    
        console.log('varietyData: ',varietyData);
        if(varietyData === undefined){
            console.log('no data returned: ' , selectedBiller);
            setSelectedVarietyId(selectedBiller.serviceID);
            // setSelectedVarietyId(selectedBiller.billerId);
            setVariety(false);
            setProductExist(true)
            setVarietyData(null)
            setselectedVarietyFields([])
        }else{
            console.log('data',varietyData);
            console.log('selectedBiller: ' , selectedBiller);
            setProductExist(true)
            setVariety(true);
            // setProductExist(false)
            setVarietyData(varietyData)
        }
    }
    
    const handleSelectChange= (e)=>{
        // setLoading(true);
        setSelectedVarietyId(e.target.value);
        console.log(selectedVarietyId);
        const id = e.target.value; 
        // if(selectedVarietyId !== null){
            console.log('selectedVarietyId______',selectedVariety);
            // console.log(selectedVarietyId);
            const arr =[];
            const filterArray = varietyData;
            // eslint-disable-next-line array-callback-return
            filterArray.filter((e)=>{
                if(e.variation_code === id){
                    arr.push(e);
                }
            })
    
        console.log('array values: ',arr);
        setSelectedVariety(arr);

        
         
        
    }

    const handlemodal= ()=>{
        setmodal(false)
    }

    const handleEmail= (e)=>{
        setemail(e.target.value)
    }

    const handlephone= (e)=>{
        setphone(e.target.value)
    }

    const handleName= (e)=>{
        setname(e.target.value)
    }

    const handleProceed= ()=>{
        setProceed(!proceed)
    }

    const handlePaymentType = () => {

        setPaymentType(true);
        // console.log('payment type')
    }

    const handlePayment = async () => {
        if (email === undefined || email.trim() === '' ) {
            setemail(serviceId+'@icadconcord.com.ng')                
        }
        // const ref = Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('');

        // props.load(true);
        setLoading(true);
        const payload ={
            billPaymentProductId: serviceId,
            amount: amount_,
            name:name,
            email: email,
            phoneNumber: phone,
            customerId: '',
            billersCode:billerCode,
            variation_code: type,
            subscription_type: subType,
            quantity: 1,
        }

        const res = axios.post('https://staging-api.icadpay.com/api/AltBiller/initiatePayment',payload)
        res.then((val) =>{
            const resData = val.data.transId;
            setTransactionId(resData);
            setTransactionRefId(resData)
            console.log('trans id: ', resData)
        }).catch((err)=>{
            console.log(err);  
        })
        setLoading(false);
        handlePaymentType();
        
        
        // const res = await axios.post('https://staging-api.icadpay.com/api/Biller/initiatePayment',payload)
        // console.log(res.data.transId);

        // handlepaymentFull(res.data.transId);
    }

    const getProducts = async (context) => {

        setLoading(true);
        const bill = params.biller
        console.log(bill)
        
        const billers = await axios.get('https://staging-api.icadpay.com/api/AltBiller/serviceByIdentifier?id='+bill);
        const billsdata = billers.data;
        
        console.log('data',billsdata);
        
        setBills(billsdata)
        setLoading(false);
    }


    const DashIcon = ({value}) => {
        let arrrr = '';
        const Arr = value.billerName.split(' ');
        Arr.map((item)=> arrrr += item.charAt(0))
        // console.log(arrrr);
        return(
            <>
                <DListimg>
                    {
                        arrrr.split('(')[0]
                    }
                </DListimg>
            </>
        )
    }
        

    const handleQr = ()=>{
        setshowqr(true)
        handleQrReq();
    }

    const back = ()=>{
        setshowqr(false)
        // handleQrReq();
    }

    const handleQrReq = async ()=>{

        const payload ={
            key: "live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ",
            amount: amount_,
            subId: serviceId,
            uniqueId: "",
            paymentRef: transactionId
        }

        const Qr = await axios.post('https://staging-api.icadpay.com/api/payWithQr',payload);
        const QrData = Qr.data;
        setqr(QrData.codeUrl)
       
        console.log(QrData);

    }

    const handleOther = ()=>{
        handlepaymentFull();
    }

    const handleClose = ()=>{
        setPaymentType(false)
        setqr('');
        setshowqr(false)
    }

    const handleChangeBuquet = () => {
        setisTvPlanRenew(false);
        setamount(0);
        setsubType('change');
    }

    const handleRenewBuquet = () => {
        setisTvPlanRenew(true);
        setamount(tvPlanAmount);
        setsubType('renew');
    }

    const BillerValidation = (e)=>{

        const biller = e.target.value;
        setbillerCode(e.target.value);
        
    }
  return (
    <DashMain>
           { loading && <Loader>
                            <PuffLoader 
                                color={color} 
                                loading={loading} 
                                size={150} 
                            />
                        </Loader>   
            }

            <Modal 
                show={modal} 
                close={handlemodal} 
                amount={amount} 
                TxnRef={ref} 
                name={selectedBiller.billPaymentProductName}
                val = {powerdata}
                ifPower = { power }
            />
            <PaymentModal 
                back={back} 
                close={handleClose} 
                show={paymentType} 
                handleQr={handleQr} 
                handleOther={handleOther} 
                sendQr={showqr} 
                qrvalue={qr}
            />

            <Sidebar 
                data={bills} 
                setBiller={handleSelectBiller} 
                biller={selectedBiller} 
                proceed={handleProceed}
            />
            
            <DashMainContent detail={proceed} >           
                <div className="dashheader">

                    <div className="imgcontainer">
                        {
                            selectedBiller ? <DListimg src={selectedBiller.image}/> : <Skeleton circle width={100} height={100}/>
                        }
                    </div>
                    <div className="namecontainer">
                        
                        <div className="">
                            <h3 className="">{selectedBiller.name}</h3>
                            <p className="">{selectedBiller.serviceID}</p>
                        </div>
                        <div className="backbtn" onClick={handleProceed}>
                            <img src="/img/arrow_left.png" alt="" className="" />
                        </div>
                    </div>
                </div>
                    { Object.keys(selectedBiller).length !== 0 ? (
                        <>
                        <div className="dashcontent">
                        <div className="dashcontent_left">
                            <h3 className="">Enter Your Details</h3>
                            
                            {
                                productExist && (serviceBiller === 'dstv' || serviceBiller === 'gotv' || serviceBiller === 'startimes') && (
                                    <>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                         <TextField
                                            id="outlined-adornment-amount"
                                            value={ billerCode }
                                            onChange = {e=> setbillerCode(e.target.value)}
                                            label="Smartcard No"
                                            autocomplete="none"
                                            helperText={ 
                                                 (billerCodeErr && billerCodeErrMsg) || (billerCodeValid && billerCodeValidMsg)
                                            }
                                            color={ (billerCodeErr && 'secondary') || (billerCodeValid && 'success')}
                                            error ={billerCodeErr}
                                            success= {billerCodeValid}
                                            InputProps={{
                                                endAdornment: loading2 && <CircularProgress  color="inherit" size={24}/> ,
                                            }}
                                         />
                                        {/* <ValidateRecipient/> */}
                                    </FormControl>
                                        {validCustomerTvData && (
                                            <>
                                        <div className="subtext">
                                            <h3 className="">Current Buquet & Renewal Amount </h3>
                                            <p>`${tvPlan} =>  NGN${tvPlanAmount}`</p>                                            
                                        </div>
                                        <div className="dashpay">
                                            {/* <button className='paybtn btn col-4' onClick={handleRenewBuquet}>Renew Buquet</button> {' '} */}
                                            {isTvPlanRenew ? 
                                                 <button className='paybtn_not btn col-4' onClick={() => handleChangeBuquet()}>Change Buquet</button>
                                                 :
                                                 <button className='paybtn btn col-4' onClick={() => handleRenewBuquet()}>Renew Current Buquet</button>}
                                        </div>
                                        </>
                                        )}              
                                    </>
                                )
                            }
                                
                            {
                                (variety && !isTvPlanRenew) && (
                                    <>
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                            <InputLabel id="demo-simple-select-label">Products</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                label="Products"
                                                value={selectedVarietyId}
                                                onChange={handleSelectChange}
                                            >
                                                 <MenuItem value={'personal'}> personal </MenuItem>
                                                {
                                                      varietyData && varietyData?.map((item,i)=>{
                                                        return(
                                                                <MenuItem key={i} value={item.variation_code}>{item.name}</MenuItem>
                                                            )
                                                      })
                                                }
                                            </Select>
                                        </FormControl>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                                    </>
                                ) 
                                

                            }
                            
                            {
                                (productExist && (serviceBiller !== 'dstv' && serviceBiller !== 'gotv' && serviceBiller !== 'startimes')) && (
                                    <>
                                    <FormControl fullWidth sx={{ m: 1 }}>
                                         <TextField
                                            id="outlined-adornment-amount"
                                            value={ billerCode }
                                            onChange = {e=> setbillerCode(e.target.value)}
                                            label="Recipent"
                                            autocomplete="none"
                                            helperText={ 
                                                 (billerCodeErr && billerCodeErrMsg) || (billerCodeValid && billerCodeValidMsg)
                                            }
                                            color={ (billerCodeErr && 'secondary') || (billerCodeValid && 'success')}
                                            error ={billerCodeErr}
                                            success= {billerCodeValid}
                                            InputProps={{
                                                endAdornment: loading2 && <CircularProgress  color="inherit" size={24}/> ,
                                            }}
                                         />
                                        {/* <ValidateRecipient/> */}
                                    </FormControl>
                                    </>
                                )
                            }
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <TextField
                                    // type={'number'}
                                    id="outlined-adornment-amount"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                                        inputComponent: NumberFormatCustom,
                                        inputProps: { min: selectedBiller.minimium_amount, max: selectedBiller.maximum_amount }
                                    }}
                                    label="Amount"
                                    value={amount_}
                                    onChange={e => setamount(e.target.value)}
                                    // placeholder={`Minimum Amount is ${selectedBiller.minimium_amount}`}
                                    autocomplete="none"
                                    // color={ (amountErr && 'secondary') || (amountSuccess && 'success')}
                                    error={
                                        selectedVariety[0]?.fixedPrice === "Yes" ?
                                            false :
                                            amount_ < parseInt(selectedBiller.minimium_amount) || amount_ > parseInt(selectedBiller.maximum_amount )
                                    }
                                    helperText={ 
                                        selectedVariety[0]?.fixedPrice === "Yes" ?
                                        '': 
                                        (amount_ < parseInt(selectedBiller.minimium_amount) && `Minimum Amount is ${selectedBiller.minimium_amount}`) || (amount_ > parseInt(selectedBiller.maximum_amount) && `Maximun Amount is ${selectedBiller.minimium_amount}`)
                                    }
                                    // disabled={fixed}
                                />
                            </FormControl>
                            {
                                params.biller === 'airtime' || params.biller === 'data' ? (
                                    <></>
                                ):(
                                 <>
                                    <Grid container spacing={2}>
                                        <div className="subtext">
                                            <h3 className="">Enter your contact information </h3>
                                            <p>Your receipt would be sent to you via your contact details </p>
                                        </div>

                                        <Grid item xs={12} sx={{ m: 1 }}>
                                            <TextField variant="outlined" label="Full Name" fullWidth type="text" value={name} onChange={handleName} autocomplete="none" placeholder="Enter Full Name" />
                                        </Grid >
                                        <Grid item xs={12} sx={{ m: 1 }}>
                                                <TextField variant="outlined" label="Phone Number" fullWidth type="tel" value={phone} onChange={handlephone} autocomplete="none" placeholder="Phone Number +234xxxxxxxxxxx"/>
                                        </Grid>
                                        {/* {params.biller === 'electricity-bill' && ( */}
                                        <Grid item xs={12} sx={{ m: 1 }}>
                                            <TextField  variant="outlined" label="Email"fullWidth type="email" value={email} onChange={handleEmail} autocomplete="none" placeholder="Enter Email Address"
                                            helperText={ 
                                                 params.biller === 'electricity-bill' && 'Electric Token will be sent to email (if provided)'
                                            }/>
                                        </Grid>
                                        {/* ) */}
                                        {/* } */}
                                    </Grid>
                                </>
                                )
                            }
                        </div>
                        <div className="dashcontent_right">
                            {
                                proceed && (
                                    <>
                                    <div className="dashpay">
                                
                                        <h3 className="">Total price </h3>
                                        <div className="price">
                                            <h2><span>NGN</span> {amount_}</h2>
                                            {/* <h2><span>{selectedBiller.currency}</span> {amount_}</h2> */}
                                        </div>
                                        <button className={ active ? 'paybtn btn':'paybtn_not btn'} onClick={handlePayment}>Pay</button>
                                    </div>
                                    </>
                                )
                            }
                            
                        </div>

                            
                        </div>
                        </>
                        ):(
                            <>
                                <div className="" style={{ height:'50vh',width:'100%',display:"flex", justifyContent:'center',alignItems:'center' }}>
                                    <h3>Select Biller Product</h3>
                                </div>
                            </>
                        )
                        
                    }
            </DashMainContent>
        </DashMain>
  )
}

export default Dashboard