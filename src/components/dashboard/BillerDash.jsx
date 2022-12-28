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

// import { uuid } from 'uuidv4';
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
const BillerDash = (props) => {

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
    const [serviceId, setServiceId]=useState('');

    const [billerCode, setbillerCode]=useState('');
    
    const [billerCodeValid, setbillerCodevalid]=useState(false);
    const [billerCodeValidMsg, setbillerCodeValidMsg]=useState('');

    const [billerCodeErr, setbillerCodeErr]=useState(false);
    const [billerCodeErrMsg, setbillerCodeErrMsg]=useState('');

    // eslint-disable-next-line no-unused-vars
    const [transactionId,setTransactionId]=useState('');
    const [proceed,setProceed]=useState(false);
    
    const [selectedVariety, setSelectedVariety]=useState({});
    const [selectedVarietyFields, setselectedVarietyFields]=useState();
    const [selectedFields, setselectedFields]=useState();
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
    const [metafields, setMetafields ] = useState([]);

    const params = useParams();

    // const { biller } = params;
    const search = useLocation().search;
    const amount = new URLSearchParams(search).get('amount');
    const ref = new URLSearchParams(search).get('ref');


    const handleValidation = useCallback( async ()=>{
        const payload ={
            billPaymentProductId: serviceId,
            customerId: billerCode,
        }
        // const validation =await axios.post('https://staging-api.icadpay.com/api/AltBiller/customerValidation',payload)
        const validation =await axios.post('https://staging-api.icadpay.com/api/Biller/customerValidation',payload)
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
        
        setLoading2(true);
        // if(validationData.WrongBillersCode){
        //     setname(validationData.Customer_Name)
        // }
    },[billerCode, params.biller, serviceId, type]);
 
    useEffect(()=>{
        const name = new URLSearchParams(search).get('status');
        if(name === 'SUCCESS'){
            getValue();
            // console.log('status: ',status);
            setmodal(true);
            console.log(fixed);
        }

    },[search,fixed])   


    useEffect(()=>{
        if(email.length < 3 || phone.length <= 10){
            setactive(false)
            // console.log('active: ',active);
        }else{
            setactive(true)
        }
     },[email,phone,active])   

    useEffect(()=>{
        if(Object.keys(selectedBiller).length !== 0 ){
            handleVariety(selectedBiller.billerId);
            setServiceId(selectedBiller.billerId);
        }

        if(Object.keys(selectedVariety).length !== 0){
                // eslint-disable-next-line array-callback-return
                selectedVariety.map(item => {
                    if(item.fixedPrice === "Yes"){
                            setamount(item.variation_amount);
                            setType(item.variation_code);
                            setfixed(true)
                        }else{
                            setfixed(false)
                        }
                })
        }
    },[ selectedBiller, selectedVariety])

    useEffect(()=>{
        
    },[billerCode])

    useEffect(()=>{
        if(billerCode === ''){
            setbillerCodeErr(false)
            setbillerCodevalid(false)
        }else{
            if(billerCode.length <= 10){
                setbillerCodeErr(true)
                setbillerCodeErrMsg('Biller Code must be at least 11 characters');
                console.log('biller code error')
            }
        }
        if (billerCode.length >= 11){
            setLoading2(true);
            console.log('biller code valid')
            handleValidation();
        }
    },[billerCode])


    useEffect(()=>{
        if(isBrowser){
            setProceed(true)
        }else{
            setProceed(false)
        }
        
        getNpps();
     // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getKey = async ()=>{
        const response = await axios.get('https://staging-api.icadpay.com/api/Auth/key');
        setKey(response.data.kex);
        getStatus();
    }

    const getStatus = async ()=>{
        const payload ={
            transactionRefId : transactionRefId,
            key: key
        }
        const response = await axios.get('https://staging-api.icadpay.com/api/query-status', payload);
        console.log(response.data);
    }

    // useEffect(() => {
    //     if(transactionRefId !== null){
    //         getKey();
    //     }
    // },[transactionRefId])
    
    const getValue = async()=>{
        const payload ={
            reqId:transactionRefId
        }
        const response = await axios.get('https://staging-api.icadpay.com/api/AltBiller/getValue', payload);
        const data = await response.data;
        setpowerdata(data)
    }

    const handleSelectBiller = (bill)=>{
        
        setselectedBiller(bill)
    }
    
    const handlepaymentFull = async (data)=>{
        
        setTransactionId(data)
        
        console.log('handle full payment: ', name)
        const namearr = name.split(" ");
        const fname = namearr[0] === ''? 'firstname':namearr[0]
        const lname = namearr[1] === ''? 'lastname':namearr[1]
        console.log(fname +'=='+ lname )
        setfirstname(fname)
        setlastname(lname)
        // let txn =  data;
        // console.log(txn)

        console.log({
            // key: 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', // this is a demo key.  
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

        const payload = {
            // key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key.  
            // key: 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', // this is a demo key.  
            key: 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', // this is a demo key.  
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
            callback_url: window.location.href, // specified redirect URL (potional)
            callback: (response) => {
                // console.log(response);
            },
            onSuccess: (response) => {
            //   console.log(response);
                
            },
            onError: (response) => {
            //   console.log(response);
            },
            onClose: () => {
            //   console.log('window closed');
              // alert('window closed');
            }
        }

        window.IcadPay.setup(payload);
        props.load(false);
    }

    const handleVariety = async (id)=>{
        console.log(id);
        // const variety = await axios.get('https://staging-api.icadpay.com/api/AltBiller/serviceVariety?id='+id);
        const variety = await axios.get('https://staging-api.icadpay.com/api/Biller/billerProducts?billerId='+id);
        const varietyData = variety.data.products;
        // const varietyData = variety.data.varations;
    
        console.log('varietyData: ',varietyData);
        if(varietyData === undefined){
            console.log('no data returned: ' , selectedBiller);
            // setSelectedVarietyId(selectedBiller.serviceID);
            setSelectedVarietyId(selectedBiller.billerId);
            setVariety(false);
            setProductExist(true)
            setVarietyData(null)
            setselectedVarietyFields('')
        }else{
            console.log('data',varietyData);
            setProductExist(true)
            setVariety(true);
            // setProductExist(false)
            setVarietyData(varietyData)
        }
    }
    
    const handleSelectChange = (e) => {
        // setLoading(true);
        const id = e.target.value; 
        setSelectedVarietyId(id);
        const arr =[];
        const filterArray = varietyData;
        // eslint-disable-next-line array-callback-return
        filterArray.filter((e)=>{
            if(e.billPaymentProductId === id){
                arr.push(e);
            }
        })
    
        console.log('array values: ',arr);
        setSelectedVariety(arr);

        const fields = arr.map((e)=>{
            return e.metadata.customFields;
        })
        console.log('Fields', fields);

        const mutatedFields = fields[0].map(item=>{
            console.log('mutated item', item);
            return {
                variable_name: item.variable_name,
                value: ''
            }
        })
        console.log('selected fields: ',mutatedFields)
        setselectedFields(mutatedFields);
        setselectedVarietyFields(fields);

        setselectedVarietyStatus(true);
        
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
        console.log('payment type')
    }

    const handlePayment = async () => {
        const ref = Array.from(Array(20), () => Math.floor(Math.random() * 36).toString(36)).join('');



        // props.load(true);
        setLoading(true);
        const payload ={
            billPaymentProductId: selectedVarietyId,
            amount: amount_,
            transactionRef: ref ,
            name:name,
            email: email,
            phoneNumber: phone,
            customerId: billerCode,
            metadata: {
              customFields:selectedFields
            }
        }

        const res = await axios.post('https://staging-api.icadpay.com/api/Biller/initiatePayment',payload)
        // const res = axios.post('https://staging-api.icadpay.com/api/AltBiller/initiatePayment',payload)

        
        // console.log(res.data.transId);

        const resData = res.data.rrr;
        setTransactionId(resData);
        setTransactionRefId(resData)
        console.log('trans id: ', resData)
        
        // handlepaymentFull(res.data.transId);
        setLoading(false);
        handlePaymentType();
       //handleOther();
        
    }

    const getProducts = async (context) => {
        setLoading(true);
        const bill = params.biller
        console.log(bill)
        
        const billers = await axios.get('https://staging-api.icadpay.com/api/AltBiller/serviceByIdentifier?id='+bill);
        // const billers = await axios.get('https://staging-api.icadpay.com/api/Biller/allBillersByCategory?category='+bill);
        const billsdata = billers.data;
        
        // console.log('data',billsdata.products[0]);
        console.log('data',billsdata);
        
        setBills(billsdata)
        setLoading(true);
    }

    const getNpps = async ()=>{
        const billers = await axios.get('https://staging-api.icadpay.com/api/Biller/allBillers');
        if(billers.status === 200){
            const billsdata = await billers.data;
            const biller = billsdata.filter( (bill) => {
                if( bill.billerId !== null){
                    return bill
                }
            });
            const gvbillers = biller.filter( (bill) => {
                if( bill.categoryId === "7"){
                    if (bill.billerId.includes("NIPOST")){
                        return bill
                    }
                }
            });
            setBills(gvbillers);
            // console.log(biller);
            // console.log(gvbillers);
        }
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

    const [steps, setSteps] = useState({});
        
    const onClick = (index , event) => {
       
        console.log(index, event.target.name);

            const values =  [...selectedFields];
            values[index]['value']= event.target.value;
            setselectedFields(values);
            // console.log('new values', selectedFields);
      };

    const [showqr,setshowqr] = useState(false);
    const [qr,setqr] = useState('');

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
            key: "live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ",
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
        setPaymentType(false)
    }

    const handleClose = ()=>{
        setPaymentType(false)
        setqr('');
        setshowqr(false)
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
            <PaymentModal back={back} close={handleClose} show={paymentType} handleQr={handleQr} handleOther={handleOther} sendQr={showqr} qrvalue={qr}/>

            <Sidebar data={bills} setBiller={handleSelectBiller} biller={selectedBiller} proceed={handleProceed}/>
            <DashMainContent detail={proceed} >           
                <div className="dashheader">

                    <div className="imgcontainer">
                        {
                            selectedBiller ? <DListimg src={'../../assets/logos/nipost.png'}/> : <Skeleton circle width={100} height={100}/>
                            // selectedBiller ? <DListimg src={selectedBiller.billerLogoUrl}/> : <Skeleton circle width={100} height={100}/>
                        }
                    </div>
                    <div className="namecontainer">
                        
                        <div className="">
                            <h3 className="">{selectedBiller.billerName}</h3>
                            <p className="">{selectedBiller.billerId}</p>
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
                                variety && (
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
                                                 {/* <MenuItem value={'personal'}> personal </MenuItem> */}
                                                {
                                                      varietyData && varietyData?.map((item,i)=>{
                                                        return(
                                                                <MenuItem key={i} value={item.billPaymentProductId}>{item.billPaymentProductName}</MenuItem>
                                                            )
                                                      })
                                                }
                                            </Select>
                                        </FormControl>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                                    </>
                                )
                            }
                            {
                                selectedVarietyStatus && (
                                    <>
                                        {
                                            selectedFields.map((fields,index)=>{
                                                return(
                                                    <FormControl key={fields.variable_name} fullWidth sx={{ m: 1 }}>
                                                        <InputLabel htmlFor="outlined-adornment-amount">{fields.variable_name}</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-amount"
                                                            // startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                                            label={fields.variable_name}
                                                            // type={fields.type}
                                                            name={fields.variable_name}
                                                            placeholder={fields.variable_name}
                                                            value={fields.value}
                                                            onChange={event => onClick(index,event)}
                                                        />
                                                    </FormControl>  
                                                )
                                            })
                                        }
                                    </>
                                    // selectedVarietyFields?.map((fields,)=>{
                                    //     return(
                                    //         // <input type="text" className="" placeholder={fields.display_name} />
                                    //         fields.required &&
                                    //         <FormControl key={fields.variable_name} fullWidth sx={{ m: 1 }}>
                                    //             <InputLabel htmlFor="outlined-adornment-amount">{fields.display_name}</InputLabel>
                                    //             <OutlinedInput
                                    //                 id="outlined-adornment-amount"
                                    //                 // startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    //                 label={fields.display_name}
                                    //                 type={fields.type}
                                    //                 name={fields.variable_name}
                                    //                 placeholder={fields.display_name}
                                    //                 onChange={event => onClick(event, fields.variable_name)}
                                    //             />
                                    //         </FormControl>   
                                    //     )
                                    // })
                                )
                            } 
                            {
                                productExist && (
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
                                    id="outlined-adornment-amount"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                                        inputComponent: NumberFormatCustom,
                                    }}
                                    label="Amount"
                                    value={amount_}
                                    onChange={e => setamount(e.target.value)}
                                    autocomplete="none"
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
                                            <TextField  variant="outlined" label="Email"fullWidth type="email" value={email} onChange={handleEmail} autocomplete="none" placeholder="Enter Email Address"/>
                                        </Grid>
                                        <Grid item xs={12} sx={{ m: 1 }}>
                                                <TextField variant="outlined" label="Phone Number" fullWidth type="tel" value={phone} onChange={handlephone} autocomplete="none" placeholder="Phone Number +234xxxxxxxxxxx"/>
                                        </Grid>
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

export default BillerDash