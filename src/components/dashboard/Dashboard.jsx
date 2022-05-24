import { useParams } from "react-router-dom";
import { useState, useEffect,useCallback } from "react";
import {  DashMain, DashMainContent, DListimg } from "../bills/billsElements";
import Sidebar from "../bills/Sidebar";
import Modal from "../modal/modal";
// import { useRouter } from 'next/router'
import axios from "axios";
// import Script from 'next/script'
import { isBrowser } from "react-device-detect";


const Dashboard = (props) => {

    const [bills,setBills]=useState('');
    const [selectedBiller,setselectedBiller]=useState('');
    const [amount_,setamount]=useState('');
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
    const [selectedVariety, setSelectedVariety]=useState({});
    const [type, setType]=useState('');
    const [serviceId, setServiceId]=useState({});
    const [billerCode, setbillerCode]=useState('');
    const [transactionId,setTransactionId]=useState('');
    const [proceed,setProceed]=useState(false);
    let params = useParams();
    const { status,amount,ref } = params;


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
        if(validationData.WrongBillersCode){
            setname(validationData.Customer_Name)
        }
    },[billerCode,serviceId,type]);
 
    useEffect(()=>{
        if(status === 'SUCCESS'){
            // console.log('status: ',status);
            setmodal(true)
            console.log(fixed);
        }
    },[status,fixed])   
    useEffect(()=>{
        console.log(params)
        if(params.biller === 'airtime' || params.biller === 'data'){
            setname('Airtime Topup');
            setfirstname('Airtime')
            setlastname('Topup')
            setemail('AirtimeTopup@icadpay.com');
            setphone(billerCode);
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
        if(Object.keys(selectedVariety).length !== 0 ){
            
            
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
     
    const handleSelectBiller = (bill)=>{
        setselectedBiller(bill)
    }
    
    const handlepaymentFull = async ()=>{
        console.log(name)
        const namearr = name.split(" ");
        const fname = namearr[0] === ''? 'firstname':namearr[0]
        const lname = namearr[1] === ''? 'lastname':namearr[1]
        console.log(fname +'=='+ lname )
        setfirstname(fname)
        setlastname(lname)
        const txn =  transactionId;
        console.log({
            key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', // this is a demo key.  
            email: email, // customer email 
            amount: amount_, // amount to be processed
            currency: "NGN", // currency
            first_name: fname,
            last_name: lname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: txn, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
            narration: 'something nice',
            isBill:true,
            callback_url: window.location.href,
        });

        const payload = {
            key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key.  
            // key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', // this is a demo key.  
            email: email, // customer email 
            amount: amount_, // amount to be processed
            currency: "NGN", // currency
            first_name: firstname,
            last_name: lastname,
            phone_number: phone, // customer's phone number (optional)
            customerId: email,
            ref: txn, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
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
        const variety = await axios.get('https://app-service.icadpay.com/api/AltBiller/serviceVariety?id='+id);
        const varietyData = await variety.data;
    
        // console.log('data',billsdata.products[0]);
        if(varietyData === ''){
            // console.log('no data returned');
            setVariety(false);
        }else{
            // console.log('data',varietyData.varations);
            setVariety(true);
            setVarietyData(varietyData)
        }
    }

    const handleSelectChange= (id)=>{
        let arr =[];
        let filterArray = varietyData.varations;
        // eslint-disable-next-line array-callback-return
        filterArray.filter((e)=>{
            if(e.variation_code === id){
                arr.push(e);
            }
        })
        // console.log('array values: ',arr);
        setSelectedVariety(arr);
        handleValidation();
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


    const handlePayment = async ()=>{
        props.load(true);
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
        const res = await axios.post('https://app-service.icadpay.com/api/AltBiller/initiatePayment',payload)
        const resData = await res.data.transId;

        setTransactionId(resData);
        console.log('trans id: ', resData)
        handlepaymentFull();
    }

    const getProducts = async (context) => {
    
        const bill = params.biller
        console.log(bill)
        
        const billers = await axios.get('https://app-service.icadpay.com/api/AltBiller/serviceByIdentifier?id='+bill);
        const billsdata = await billers.data;
        
        // console.log('data',billsdata.products[0]);
        console.log('data',billsdata);
        setBills(billsdata)
        // return {
        //     props:{
        //         bills:billsdata,
        //         sidbar:billsdata
        //     }
        // }
    }

  return (
    <DashMain>
            

            <Modal show={modal} close={handlemodal} amount={amount} TxnRef={ref} name={selectedBiller.billPaymentProductName}/>
            <Sidebar data={bills} setBiller={handleSelectBiller} biller={selectedBiller} proceed={handleProceed}/>
            <DashMainContent detail={proceed}>           
                <div className="dashheader">

                    <div className="imgcontainer">
                        <DListimg
                            src={selectedBiller.image}
                        />
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
                                <h3 className="">Enter Your Detials</h3>
                                {
                                    Object.keys(selectedBiller).length !== 0  && (
                                        <>
                                            {
                                                variety && (
                                                    <>
                                                        <div className="input_container">
                                                            <select onChange={e => handleSelectChange(e.target.value)}>
                                                                <option value={''} default>{varietyData.serviceName}</option>
                                                                {
                                                                    varietyData.varations.map((val,ii)=>{
                                                                        return(
                                                                            <>
                                                                                <option key={ii} value={val.variation_code}>{val.name}</option>
                                                                            </>
                                                                        )
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            {/* {
                                                Object.keys(selectedVariety).length !== 0 && (
                                                    <>   
                                                    
                                                    </>
                                                )
                                            } */}
                                            {
                                                selectedBiller && (
                                                    <>   
                                                        <div className="input_div">

                                                            <label htmlFor="">Amount</label>  
                                                            <div className='input_container'>
                                                                <input type={'numeric'} value={amount_} placeholder='Amount' onChange={(e)=> setamount(e.target.value)}   />
                                                            </div>
                                                        </div>
                                                        <div className="input_div">
                                                            <label htmlFor="">Recipient</label>  
                                                            <div className='input_container '>
                                                                <input type={'text'} value={billerCode} placeholder='Smart card no, meter/account no, phone/email (for data), etc.' onChange={(e)=> setbillerCode(e.target.value)}   />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            }
                                            
                                            {/* {
                                                selectedBiller.isAmountFixed && (
                                                    <>   
                                                        <div className="input_div">

                                                            <label htmlFor="">Amount</label>  
                                                            <div className={fixed === true ? 'input_container disabled':'input_container'}>
                                                                <input type={'numeric'} value={amount_} placeholder='Amount' onChange={(e)=> setamount(e.target.value)}  required={selectedBiller.required} />
                                                            </div>
                                                        </div>
                                                    </>
                                                )
                                            } */}
                                        </>
                                    )
                                    
                                }
                                {
                                    // Object.keys(selectedBiller).length !== 0  ? (
                                    //     <>
                                    //         {
                                    //             selectedBiller.metadata.customFields.map((opt)=>{
                                    //                 if(opt.type == 'multiselect'){
                                    //                     return(
                                    //                         <>            
                                    //                         <div className="input_container">
                                    //                             <select type={opt.type} placeholder={opt.display_name} required={opt.required} >
                                    //                                 <option value={''} default>{opt.display_name}</option>
                                    //                                 {
                                    //                                     opt.selectOptions.map((val,ii)=>{
                                    //                                         return(
                                    //                                             <>
                                    //                                                 <option key={ii} value={val.VALUE}>{val.DISPLAY_NAME}</option>
                                    //                                             </>
                                    //                                         )
                                    //                                     })
                                    //                                 }
                                    //                             </select>
                                    //                         </div>
                                    //                         </>
                                    //                     )
                                    //                 }
                                                    
                                    //                 return(
                                    //                     <>            
                                    //                     <div className="input_container">
                                    //                         <input type={opt.type} placeholder={opt.display_name} required={opt.required} />
                                    //                     </div>
                                    //                     </>
                                    //                 )
                                    //             })
                                    //         }
                                    //     </>
                                    // ):(
                                    //     <>
                                        
                                    //     </>
                                    // )
                                }
                                
                                {
                                    params.biller === 'airtime' || params.biller === 'data' ? (
                                        <></>
                                    ):(
                                        <>
                                        <div className="subtext">
                                            <h3 className="">Enter your contact information </h3>
                                            <p>Your receipt would be sent to you via your contact details </p>
                                        </div>

                                        <div className="input_container">
                                            <input type="email" value={name} onChange={handleName} placeholder="Enter Full Name"/>
                                        </div>
                                        <div className="input_container">
                                            <input type="email" value={email} onChange={handleEmail} placeholder="Enter Email Address xxx@mail.com "/>
                                        </div>
                                        <div className="input_container">
                                            <input type="tel" value={phone} onChange={handlephone} placeholder="Phone Number +234xxxxxxxxxxx"/>
                                        </div>

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