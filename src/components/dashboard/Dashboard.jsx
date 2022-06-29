import { useParams , useLocation} from "react-router-dom";
import { useState, useEffect,useCallback ,useMemo} from "react";
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
        Grid
    } from "@mui/material";
import PuffLoader from "react-spinners/PuffLoader"
import PaymentModal from './../modal/paymentType';
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
    const [billerCodeErr, setbillerCodeErr]=useState('');
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
    const [color, setColor] = useState(" #2C63EA");
    const [transactionRefId, setTransactionRefId] = useState(null);
    const [key, setKey] = useState(null);
    const [power, setpower] = useState(false);
    const [powerdata, setpowerdata] = useState(null);


    const params = useParams();

    // const { biller } = params;
    const search = useLocation().search;
    const amount = new URLSearchParams(search).get('amount');
    const ref = new URLSearchParams(search).get('ref');


    const handleValidation = useCallback( async ()=>{
        const payload ={
            billersCode: billerCode,
            serviceID: serviceId,
            type: type
        }
        const validation =await axios.post('https://app-service.icadpay.com/api/AltBiller/customerValidation',payload)
        const validationData = await validation.data;
        // console.log(payload);
        // console.log(validationData);

        setbillerCodevalid(true)
        setbillerCodeErr(validationData.error)
        setname(validationData.Customer_Name)
        // if(validationData.WrongBillersCode){
        //     setname(validationData.Customer_Name)
        // }
    },[billerCode,serviceId,type]);
 
    useEffect(()=>{
        const name = new URLSearchParams(search).get('status');
        console.log(name)
        if(name === 'SUCCESS'){
            getValue();
            // console.log('status: ',status);
            setmodal(true);
            console.log(fixed);
        }

    },[search,fixed])   

    useEffect(()=>{
        console.log(params)
        if(params.biller === 'airtime' || params.biller === 'data'){
            setname('Airtime Topup');
            setfirstname('Airtime')
            setlastname('Topup')
            setemail('AirtimeTopup@icadpay.com');
            setphone(billerCode);
        }
        if(params.biller === 'electricity-bill'){
            setpower(true);
        }
    },[billerCode,params])

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
        if(billerCode.length >= 10){
             handleValidation();
        }
    },[billerCode,handleValidation])


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
        const response = await axios.get('https://app-service.icadpay.com/api/Auth/key');
        setKey(response.data.kex);
        getStatus();
    }

    const getStatus = async ()=>{
        const payload ={
            transactionRefId : transactionRefId,
            key: key
        }
        const response = await axios.get('https://app-service.icadpay.com/api/query-status', payload);
        console.log(response.data);
    }

    useEffect(() => {
        if(transactionRefId !== null){
            getKey();
        }
    },[transactionRefId])

    const getValue = async()=>{
        const payload ={
            reqId:transactionRefId
        }
        const response = await axios.get('https://app-service.icadpay.com/api/AltBiller/getValue', payload);
        const data = await response.data;
        setpowerdata(data)
    }
    const handleSelectBiller = (bill)=>{
        
        setselectedBiller(bill)
    }
    
    const handlepaymentFull = async (data)=>{
        // console.log(data)
        setTransactionId(data)

        const namearr = name.split(" ");
        const fname = namearr[0] === ''? 'firstname':namearr[0]
        const lname = namearr[1] === ''? 'lastname':namearr[1]
        console.log(fname +'=='+ lname )
        setfirstname(fname)
        setlastname(lname)
        // let txn =  data;
        // console.log(txn)

        console.log({
            // key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', // this is a demo key.  
            email: email, // customer email 
            amount: amount_, // amount to be processed
            currency: "NGN", // currency
            first_name: fname,
            last_name: lname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: data, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            narration: 'something nice',
            isBill:true,
            callback_url: window.location.href,
        });

        const payload = {
            // key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key.  
            key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', // this is a demo key.  
            email: email, // customer email 
            amount: amount_, // amount to be processed
            currency: "NGN", // currency
            first_name: fname,
            last_name: lname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: data, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
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
        const variety = await axios.get('https://app-service.icadpay.com/api/AltBiller/serviceVariety?id='+id);
        // const variety = await axios.get('https://app-service.icadpay.com/api/Biller/billerProducts?billerId='+id);
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

            // filterArray?.filter((item)=>{
            //     if(item.billPaymentProductId === selectedVarietyId){
            //         arr.push(item);
            //         console.log('array values: ',arr);
            //         setSelectedVarietyId(item.billPaymentProductId);
            // }
        // })
        // console.log('array values: ',arr);

        // if(varietyData !== undefined){   
        //     setSelectedVariety(arr)
        //     console.log('selected Varity',selectedVariety)
        //     // eslint-disable-next-line array-callback-return
        //     arr.map(item => {
        //         console.log('selected Varity',item.metadata.customFields)
                
        //         setselectedVarietyFields(item.metadata.customFields)
        //         console.log('selected Varityw',selectedVarietyFields)
        //         if(item.isAmountFixed){
        //             setamount(item.amount);
        //             setType(item.variation_code);
        //             setfixed(true)
        //             // console.log(item)
        //         }else{
        //             setfixed(false)
        //         }
        //     })
        //     setselectedVarietyStatus(true);
        //     setLoading(false);
        //     console.log('array values:',selectedVariety);
        // }else{
        //     setSelectedVariety('')
        //     console.log('array values:',selectedVariety);
        // }
        // if(Object.keys(selectedVariety).length !== 0 ){
            
        //     // eslint-disable-next-line array-callback-return
        //     selectedVariety.map(item => {
        //         // console.log(item.fixedPrice)
        //         if(item.fixedPrice === "Yes"){
        //                 setamount(item.variation_amount);
        //                 setType(item.variation_code);
        //                 setfixed(true)
        //                 // console.log(item.variation_amount)
        //             }else{
        //                 setfixed(false)
        //             }
        //     })
        // }

        // handleValidation();
        // }
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
            variation_code: type
        }

        // const res = await axios.post('https://app-service.icadpay.com/api/Biller/initiatePayment',payload)
        const res = axios.post('https://app-service.icadpay.com/api/AltBiller/initiatePayment',payload)

        
        // console.log(res.data.transId);

        res.then((val) =>{
            const resData = val.data.transId;
            setTransactionId(resData);
            setTransactionRefId(resData)
            console.log('trans id: ', resData)
        }).catch((err)=>{
            
        })
        // handlepaymentFull(res.data.transId);
        setLoading(false);
        handlePaymentType();
        
    }

    const getProducts = async (context) => {
        setLoading(true);
        const bill = params.biller
        console.log(bill)
        
        const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/serviceByIdentifier?id='+bill);
        // const billers = await axios.get('https://app-service.icadpay.com/api/Biller/allBillersByCategory?category='+bill);
        const billsdata = billers.data;
        
        // console.log('data',billsdata.products[0]);
        console.log('data',billsdata);
        
        setBills(billsdata)
        setLoading(false);
        // return {
        //     props:{
        //         bills:billsdata,
        //         sidbar:billsdata
        //     }
        // }
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

    const onClick = (e, evt)=> {
        const prop = []
        const ArrLenght = selectedVarietyFields.length
        
        // selectedVarietyFields.map((item,i)=> {
            // });
            // const data = evt;
            console.log(ArrLenght)
            // console.log(evt,e.target.value)
            // console.log(evt)
    }
        
        
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
            key: "live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ",
            amount: amount_,
            subId: serviceId,
            uniqueId: "",
            paymentRef: transactionId
        }

        const Qr = await axios.post('https://app-service.icadpay.com/api/payWithQr',payload);
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

    const MyFormHelperText = () => {
        const { focused } = useFormControl() || {};
      
        const helperText = useMemo(() => {
          if(name !== ''){
              return name
          }
        }, [focused,name]);
      
        return <FormHelperText>{helperText}</FormHelperText>;
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
            <DashMainContent detail={proceed}>           
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
                                                loading={true}
                                                loadingText='Loading'
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
                            {/* {
                                selectedVarietyFields  && selectedVarietyFields?.map((fields,)=>{
                                    return(
                                        // <input type="text" className="" placeholder={fields.display_name} />
                                        fields.required &&
                                        <FormControl key={fields.variable_name} fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">{fields.display_name}</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                // startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                                label={fields.display_name}
                                                type={fields.type}
                                                name={fields.variable_name}
                                                placeholder={fields.display_name}
                                                onChange={event => onClick(event, fields.variable_name)}
                                            />
                                        </FormControl>   
                                    )
                                })
                                  
                            } */}
                            {
                                productExist && (
                                    <>
                                        <FormControl fullWidth sx={{ m: 1 }}>
                                         <InputLabel htmlFor="outlined-adornment-amount">Recipient</InputLabel>
                                         <OutlinedInput
                                             id="outlined-adornment-amount"
                                             value={ billerCode }
                                             onChange = {e=>setbillerCode(e.target.value)}
                                             label="Recipent"
                                            // startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                            //  error={billerCodeValid}
                                            //  type={selectedVariety[0].metadata.customFields[0].type}
                                            //  placeholder={selectedVariety[0].metadata.customFields[0].display_name}
                                         />
                                     </FormControl>
                                         {
                                            !billerCodeValid && (
                                                <Typography sx={{ m: 1 }} variant="caption">{billerCodeErr}</Typography>
                                            )
                                         }
                                         {
                                            billerCodeValid && (
                                                <Typography sx={{ m: 1 }} variant="caption">{name}</Typography>
                                            )
                                         }
                                    </>
                                )
                            }
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">₦</InputAdornment>}
                                    label="Amount"
                                    value={amount_}
                                    onChange={e => setamount(e.target.value)}
                                    // disabled={fixed}
                                />
                            </FormControl>
                            {
                                params.biller === 'airtime' || params.biller === 'data' ? (
                                    <></>
                                ):(
                                 <>
                                    <Grid container spacing={3}>
                                        <div className="subtext">
                                            <h3 className="">Enter your contact information </h3>
                                            <p>Your receipt would be sent to you via your contact details </p>
                                        </div>

                                        <Grid item xs={12}>
                                            <TextField variant="outlined" label="Full Name" fullWidth type="text" value={name} onChange={handleName} placeholder="Enter Full Name" />
                                        </Grid >
                                        <Grid item xs={12}>
                                            <TextField  variant="outlined" label="Email"fullWidth type="email" value={email} onChange={handleEmail} placeholder="Enter Email Address"/>
                                        </Grid>
                                        <Grid item xs={12}>
                                                <TextField variant="outlined" label="Phone Number" fullWidth type="tel" value={phone} onChange={handlephone} placeholder="Phone Number +234xxxxxxxxxxx"/>
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

export default Dashboard