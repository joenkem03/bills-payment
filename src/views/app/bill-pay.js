/* eslint-disable react/no-array-index-key, react/no-danger */
import React, { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row, FormGroup, Label, Card, CardBody, Button, Table, 
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle, } from 'reactstrap';
// import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { scroller } from 'react-scroll';
import Headroom from 'react-headroom';
import { adminRoot } from 'constants/defaultValues';
import { Colxx } from 'components/common/CustomBootstrap';
import DynamicQr from 'components/qr/dynamic-qr';
import {VerifyBillPaymentService} from '../services/ProtectedService';
// import {GetPaymentRef, ListServicesById, ListServicesCat} from '../services/AuthService';
import {ListServicesCat, ListServicesById, GetPaymentRef, ListServiceVarieties, ValidatePayer, PayWithQrService} from '../services/AuthService';
import pageLogo from "../assets/logos/black.png";
import SearchSelect from '../components/common/searchSelect';
// import UserCardBasic from 'components/cards/UserCardBasic';
// import IntlMessages from 'helpers/IntlMessages';
// import {Gust} from "http://icad-app.smadeandsmight.com/icad-pay-inline.js";



const BillPay = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const refRowHome = useRef(null);
  const refSectionHome = useRef(null);
  const refSectionFooter = useRef(null);
  // const [activeTab, setActiveTab] = useState(0);
  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [transRef, setTransRef] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [modalBack, setModalBack] = useState(false);
  const [services, setServices] = useState([]);
  const [serviceBills, setServiceBills] = useState([]);
  const [backdrop] = useState('static');
  const [serviceId, setServiceId] = useState([]);
  const [serviceCatId, setServiceCatId] = useState('');
  const [firstLastName, setFirstLastName] = useState([]);
  const [mpageLogo, setMpageLogo] = useState(pageLogo);
  const [showInput, setShowInput] = useState(0);
  const [discoServices, setDiscoServices] = useState('');
  const [meterAccount, setMeterAccount] = useState('');
  const [meterAccType, setMeterAccType] = useState('');
  const [showName, setShowName] = useState(false);
  const [showNameData, setShowNameData] = useState('');
  const [qrResponseStatus, setQrResponseStatus] = useState('');
  const [qrResponseCode, setQrResponseCode] = useState('');
  const [isQrPay, setIsQrPay] = useState(false);
  // const [minAmnt, setMinAmnt] = useState(0);
  // const [maxAmnt, setMaxAmnt] = useState(0);

  const onWindowResize = (event) => {
    const homeRect = refRowHome.current.getBoundingClientRect();

    const homeSection = refSectionHome.current;
    homeSection.style.backgroundPositionX = `${homeRect.x - 580}px`;

    const footerSection = refSectionFooter.current;
    footerSection.style.backgroundPositionX = `${
      event.target.innerWidth - homeRect.x - 2000
    }px`;

    if (event.target.innerWidth >= 992) {
      setShowMobileMenu(false);
    }
  };

  const onWindowClick = () => {
    setShowMobileMenu(false);
  };

  const onWindowScroll = () => {
    setShowMobileMenu(false);
  };

  useEffect(() => {    
    
    // const {search} = window.location.search;
    const {search} = window.location;
    // const search = window.location;
    const params = new URLSearchParams(search);
    console.log(search);
    console.log(params);
    console.log(params.has('status'));
    // status=successful&tx_ref=7120952605464543C1-S&transaction_id=2593245
    if (params.has('status')  && (params.get('status') !== null || params.get('status') !== undefined)) {  
      const payStatus = params.get('status');
      
      if (payStatus.toUpperCase() === "SUCCESS" || payStatus.toUpperCase() === "SUCCESSFUL") {     
        const txRef = params.get('ref');
        const txAmnt = params.get('amount');
        VerifyBillPaymentService(txRef).then((res) => {
          console.log(res);
          if (res.status === 200) {
            setPayerName(res.data.customerName);
            setPayerEmail(res.data.customerEmail);
            setPayerPhone(res.data.customerPhone);
            setAmountPaid(txAmnt);
            setTransRef(txRef);
            setPaymentStatus(payStatus); 
            setIsSuccess(true);           
          }
        }).catch(
          setIsSuccess(true)      
          // setPaymentConfirm("(PAYMENT PENDING)")
          );
      } else{
        setIsSuccess(true);          
        // setPaymentConfirm("(PAYMENT PENDING)");
      }
    } else{
      const script = document.createElement("script");
      // script.src = "http://icad-app.smadeandsmight.com/icad-pay-inline.js";  
      script.src = "https://pay-service.icadpay.com/inline-pay.js";
      // script.src = "https://demo.icadpay.com/inline-pay.js";
      script.async = true;
      // script.onload = () => handleSubmitAction(e);
      document.body.appendChild(script); 
      // setIsSuccess(true);          
      // setPaymentConfirm("");

      const serviceArr = [];
      if(serviceArr.length === 0){
        ListServicesCat().then((res) => {
          if (res.data.length > 0) {
            res.data.forEach((element) => {
              // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
              serviceArr.push({ value: element.identifier, label: `${element.name}` });
              // }
            });
            setServices(serviceArr);
          }
  
        }).catch((el) => {
          console.log(el);
        });
      }

    };


    window.addEventListener('scroll', onWindowScroll);
    window.addEventListener('resize', onWindowResize);
    window.addEventListener('click', onWindowClick);

    document.body.classList.add('no-footer');
    return () => {
      window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('click', onWindowClick);
      document.body.classList.remove('no-footer');
    };
  }, []);

  const scrollTo = (event, target) => {
    event.preventDefault();
    scroller.scrollTo(target, {
      duration: 500,
      delay: 0,
      smooth: 'easeInOutQuart',
      offset: -100,
    });
    return false;
  };

  const payWithQr = () => {
    const qrPayReq = {
      // "key": "live_MTllZWJmMjU0YTgzODYxOGNmZDQ4NWMzMjgzNzgxNDYyMzE1MjQ1MjI1ODM3MTExMWFlODk0NTQwN2JiNjkyMQ",
      "key": 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', 
      "amount": "100.00",
      "subId": "",
      "uniqueId": "1122334455",
      "paymentRef": `${Math.floor((Math.random() * 1000000000) + 1)}`
    }
    PayWithQrService(qrPayReq).then((resQr) => {
      if(resQr.status === 200 && resQr.data.returnCode === "Success"){
        // <DynamicQr value={resQr.data.codeUrl}/>
        setIsQrPay(true);
        setQrResponseStatus(resQr.data.returnCode);
        setQrResponseCode(resQr.data.codeUrl);
      }
    });
  }


  const handleServiceIdChange = (e) => {//
    console.log(e);

    // {serviceID: "airtel", name: "Airtel Airtime VTU", minimium_amount: "50", maximum_amount: "8000",…}
    // {id: element.serviceID, min: element.minimium_amount, max: element.maximum_amount, productType: element.product_type}
    
    const serviceBillArr = [];

    if(e.value !==null && e.value !== "" && e.value !== undefined){
       ListServicesById(e.value).then((resBill) =>{
        if (resBill.data.length > 0) {
          resBill.data.forEach((element) => {
            // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
            serviceBillArr.push({ value: {id: element.serviceID, min: element.minimium_amount, max: element.maximum_amount, productType: element.product_type, charge: element.convinience_fee, logoSub: element.image}, 
              // label: `${element.name} <img className='footer-logo' alt='footer logo' src=${element.image}/>` });
              label: element.name });
            // }
          });
          setServiceCatId(e.value);
          setServiceBills(serviceBillArr)
          // showServiceBills(true);

        }
      })
    }
  };

  const handleMeterChange = (e) => {
    setMeterAccType(e.value);
    const req = {
      billersCode: meterAccount,
      serviceID: serviceId.id,
      type: e.value
    };//

    console.log(req);

    if(meterAccount.length > 10){
      ValidatePayer(req).then((res) => {
        console.log(res.data)
        if(res.status === 200){
          setShowName(true);
          setShowNameData(res.data.Customer_Name);
          
        
        const namesElect = {
          firstName: res.data.Customer_Name,
          lastName: serviceId.id
        }
        setFirstLastName(namesElect);
        }
      }).catch();
    }
  }

  const handleMeterAccChange = (e) => {
    setMeterAccount(e.target.value)
    const req = {
      billersCode: e.target.value,
      serviceID: serviceId.id,
      type: meterAccType
    }

    console.log(req);

    if(e.target.value.length > 10){
      ValidatePayer(req).then((res) => {
        console.log(res.data)
        if(res.status === 200){
          setShowName(true);
          setShowNameData(res.data.Customer_Name);
              
        
        const namesElect = {
          firstName: res.data.Customer_Name,
          lastName: serviceId.id
        }
        setFirstLastName(namesElect);
        }
      }).catch()
    }
  }

  

  const handleBillsIdChange = (e) => {
    console.log(e);
    
    const names = {
      firstName: "Airtime",
      lastName: "Topup"
    }

    const discArr = [];
    setServiceId(e.value);

     switch (serviceCatId) {
       case 'airtime':

        // setPayerEmail(`${firstLastName.firstName}${firstLastName.lastName}@icadpay.com`);
         setFirstLastName(names)
         setServiceId(e.value);
         setMpageLogo(e.value.logoSub);
        //  setShowInput(1);
         break;
         
         case 'data':
         case 'tv-subscription':
         case 'electricity-bill':
          ListServiceVarieties(e.value.id).then((res) => {
            console.log(res.data);
            if (res.data.varations.length > 0) {
              res.data.varations.forEach((element) => {
                // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
                  discArr.push({ value: element.variation_code, label: `${element.name}` });
                // }
              });
              setDiscoServices(discArr);
            }
          }).catch()
          setShowInput(1);
          break;
         
        //  case 'tv-subscription':
        //   setShowInput(3);
        //   break;
         
        //  case 'data':
        //   setShowInput(1);

          // break;
     
       default:
         break;
     }

  };

  // const handleSubmitAction = (e) => {
  const handleSubmit = (e) => {
    let emailPayer = payerEmail;
    if(payerEmail === null || payerEmail === undefined || payerEmail === ""){
      emailPayer = `${firstLastName.firstName}${firstLastName.lastName}@icadpay.com`;
    }
    const initPayReq = {
      "billPaymentProductId": serviceId.id,
      "amount": e.amount,
      "name": `${firstLastName.firstName} ${firstLastName.lastName}`,
      "email": emailPayer,
      "phoneNumber": e.phone,
      "customerId": "",
      "billersCode": meterAccount,
      "variation_code": meterAccType
      }

    console.log(initPayReq);

    GetPaymentRef(initPayReq).then((resInit) => {
      if(resInit.status === 200 && (resInit.data.transId !== null && resInit.data.transId !== undefined)){
        
        const handler = window.IcadPay.setup({ 
          key: 'live_YzM1ODg3YzY5MWVjZjFlYzhkOTQxMDU3NmMzM2NlYjc4YzQwYTU1M2ZkZjRmNjI5ZjQzOGQzZmM4ZmY3NzZmYQ', 
          // key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key. 
          // key: 'live_MTllZWJmMjU0YTgzODYxOGNmZDQ4NWMzMjgzNzgxNDYyMzE1MjQ1MjI1ODM3MTExMWFlODk0NTQwN2JiNjkyMQ',  
          email: emailPayer, // customer email where invoice will be sent to
          amount: resInit.data.payingAmount, // amount to be processed
          currency: "NGN", // currency
          first_name: firstLastName.firstName,
          last_name: firstLastName.lastName,
          // phone_number: "+2348012345678", // customer's phone number
          phone_number: e.phone, // customer's phone number
          // ref: `${Math.floor((Math.random() * 1000000000) + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          ref: resInit.data.transId, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
          redirect_url: "", // where do we redirect your customers to?
          due_date: "31/12/2021",
          fee_bearer: "",
          items: "",
          payment_methods: "",
          isBill: true,
          invoice: "false",
          invoiceID: "",
          narration: `${firstLastName.firstName} ${firstLastName.lastName}`,
          // callback_url: "https://icadpay.com/demo",
          // callback_url: "http://localhost:3000/demo",
          callback_url: "",
          // sub_account: "cVYtMVhDUGcxLzEvMTk3MCAxMjowMDowMCBBTQ==",
          sub_account: "",
          callback: (response) => {
            console.log(response);
          },
          onSuccess: (response) => {
            console.log(response);
            // alert(`success. transaction ref is ${response.paymentReference}`);
            // alert('Success');
            
            VerifyBillPaymentService(response.paymentReference).then((res) => {
              console.log(res);
              if (res.status === 200) {
                setPayerName(res.data.customerName);
                setPayerEmail(res.data.customerEmail);
                setPayerPhone(res.data.customerPhone);
                setAmountPaid(res.data.amountPaid);
                setTransRef(response.paymentReference);
                setPaymentStatus(res.data.status); 
                setIsSuccess(true);           
              }
            }).catch(
              setIsSuccess(true)      
              // setPaymentConfirm("(PAYMENT PENDING)")
              );
          },
          onError: (response) => {
            console.log(response);
            alert('Error');
          },
          onClose: () => {
            console.log('window closed');
            // alert('window closed');
          }
        });
        handler.openIframe();
      }
    }).catch(() => {
      
    })

  }

  // const handleSubmit = (e) => {
  //   // const scriptx = document.createElement("script");
  //   // scriptx.src = "https://login.remita.net/payment/v1/remita-pay-inline.bundle.js";
  //   // scriptx.async = true;

  //   const script = document.createElement("script");
  //   script.src = "http://icad-app.smadeandsmight.com/icad-pay-inline.js";
  //   script.async = true;
  //   script.onload = () => handleSubmitAction(e);    

  //   document.body.appendChild(script);
  // }

  
  const payScheme = Yup.object().shape({
    // firstName: Yup.string().required('Required'),
    // lastName: Yup.string().required('Required'),
    // email: Yup.string().required('Required').email('Invalid email'),
    // // address: Yup.string().required(),
    phone: Yup.string().required('Required'),
    amount: Yup.number().min(serviceId.min).max(serviceId.max).required('Required'),
  });

  return (
    <div
      className={classnames('landing-page', {
        'show-mobile-menu': showMobileMenu,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      

      <div className="mobile-menu" >
        <a
          className="logo-mobile c-pointer"
          href="/"
        >
          <span />
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="/pay-bills"
            >
              PAY BILLS
            </a>
          </li>
          <li className="nav-item">
            <div className="separator" />
          </li>
          <li className="nav-item">
            <a
              className="c-pointer"
              href="/"
            >
              FEATURES
            </a>
          </li>
        </ul>
      </div>
      <div className="main-container">
        <Headroom className="landing-page-nav">
          <nav>
            <div className="container d-flex align-items-center justify-content-between">
              <a
                className="navbar-logo pull-left c-pointer"
                href="/"
              >
                <span className="white" />
                <span className="dark" />
              </a>
              <ul className="navbar-nav d-none d-lg-flex flex-row">
                <li className="nav-item ">
                  <a
                    className="c-pointer btn-outline-semi-light btn-sm pr-4 pl-4"
                    href="/pay-bills"
                  >
                    PAY BILLS
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="c-pointer"
                    href="/"
                  >
                    HOME
                  </a>
                </li>
              </ul>
              {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
              <span
                className="mobile-menu-button"
                onClick={(event) => {
                  setShowMobileMenu(!showMobileMenu);
                  event.stopPropagation();
                }}
              >
                <i className="simple-icon-menu" />
              </span>
            </div>
          </nav>
        </Headroom>
        
        <div className="content-container" id="home">
          
        <div className="section home" ref={refSectionHome}>
            <div className="container">
              <div className="row home-row" ref={refRowHome}>

                <div className="col-12 col-xl-6 col-lg-6 col-md-6">
                  <div className="home-text"><Card className="pt-5">
                    <CardBody>
                      <CardTitle>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      style={{maxWidth:100}}
                      // src="/assets/logos/white-full.png"
                      src={mpageLogo}
                    />
                  </a>
                </div>
                </CardTitle>
                    
                    {/* <p style={{"font-color":"white"}}><a href="https://icadpay.com/developers/index.html#documenter-5" target="_blank" rel="noreferrer" style={{"font-color":"white"}}> test card</a></p> */}
                    {/* <p style={{ color: 'red' }}><a href="https://icadpay.com/developers/index.html#documenter-5" target="_blank" rel="noreferrer" > test card</a></p> */}
                    {/* <p style={{ color: 'red' }}>Card PAN: 5399 8300 0000 0008;  Expiry Date: 05/30;  CVV: 000 or 123</p> */}
                            
                    {console.log(isSuccess)}
                      {isSuccess && (
                          <Table borderless>
                  <tbody>
                    <tr>
                      <th scope="row" span="2" align="center">{payerName}</th>
                      {/* <td className="pl-5">{payerName}</td> */}
                    </tr>
                    {/* <tr>
                      <th scope="row">Email:</th>
                      <td className="pl-5">{payerEmail}</td>
                    </tr> */}
                    <tr>
                      <th scope="row">Phone:</th>
                      <td className="pl-5">{payerPhone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Amount Paid:</th>
                      <td className="pl-5">{amountPaid} NGN</td>
                    </tr>
                    <tr>
                      <th scope="row">Trans Ref:</th>
                      <td className="pl-5">{transRef}</td>
                    </tr>
                    <tr>
                      <th scope="row">Status:</th>
                      <td className="pl-5">{paymentStatus}</td>
                    </tr>
                    </tbody>
                    </Table>
                        
                      )}
                      {!isSuccess && (
                        <Formik
                        initialValues={{ phone: '', amount: 0 }}
                        onSubmit={handleSubmit}
                        validationSchema={payScheme}
                      >
                        {({errors, touched}) => (
                          <Form>
                            <Row>
                              <Colxx xxs="12">
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            Bill Category
                          </Label>
                          <Field
                            // id="services_category"
                            name="services_category"
                            // value={x.bankId}
                            component={SearchSelect}
                            options={services}
                            handleIdChange={(e) => handleServiceIdChange(e)}
                            // handleIdChange={(e) => handleInputChange(e, i)}
                            // onChange={(e) => handleInputChange(e, i)}
                          />
                          {errors.services_category && touched.services_category ? (
                            <div>{errors.services_category}</div>
                          ) : null}
                        </FormGroup>
                              </Colxx>
                              </Row>
                            <Row>
                              <Colxx xxs="12">                                
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            Bill
                          </Label>
                          <Field
                            // id="services"
                            name="services"
                            // value={x.bankId}
                            component={SearchSelect}
                            options={serviceBills}
                            handleIdChange={(e) => handleBillsIdChange(e)}
                            // handleIdChange={(e) => handleInputChange(e, i)}
                            // onChange={(e) => handleInputChange(e, i)}
                          />
                          {errors.services && touched.services ? (
                            <div>{errors.services}</div>
                          ) : null}
                        </FormGroup>
                                </Colxx>
                              </Row>
                              <Row>
                              <Colxx xxs="12">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.email" /> */}
                                    Phone
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="phone"
                                    placeholder="Phone"
                                  />
                                  {errors.phone && touched.phone ? (
                                      <div>{errors.phone}</div>
                                    ) : null}
                                </FormGroup>
                              </Colxx>
                            </Row>
                            {showInput === 1 && (
                              <>
                              <Row>
                                <Colxx xxs="12">  
                                {console.log(discoServices)}                              
                          <FormGroup className="form-group has-float-label  mb-4">
                            <Label>
                              Bill
                            </Label>
                            <Field
                              // id="services"
                              name="meter_account_type"
                              // value={x.bankId}
                              component={SearchSelect}
                              // options={{value: 'prepaid', label: 'PREPAID'}, {value: 'postpaid', label: 'POSTPAID'}}
                              options={discoServices}
                              handleIdChange={(e) => handleMeterChange(e)}
                              // handleIdChange={(e) => handleInputChange(e, i)}
                              // onChange={(e) => handleInputChange(e, i)}
                            />
                            {errors.services && touched.services ? (
                              <div>{errors.services}</div>
                            ) : null}
                          </FormGroup>
                                  </Colxx>
                                </Row>
                                
                              <Row>
                              <Colxx xxs="12">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.email" /> */}
                                    Meter/Account No
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="meter_acc"
                                    value={meterAccount}
                                    onChange={(e) => handleMeterAccChange(e)}
                                  />
                                  {/* {errors.phone && touched.phone ? (
                                      <div>{errors.phone}</div>
                                    ) : null} */}
                                </FormGroup>
                              </Colxx>
                            </Row>
                            {showName && (                              
                            <Row>
                            <Colxx xxs="12">
                              <FormGroup className="form-group has-float-label mb-4">
                                <Label>
                                  {/* <IntlMessages id="user.first-name" /> */}
                                  Amount
                                </Label>
                                <Field
                                  className="form-control"
                                  name="cName"
                                  enabled={false}
                                  value={showNameData}
                                />
                                {errors.amount && touched.amount ? (
                                    <div className="invalid-feedback d-block">{errors.amount}</div>
                                  ) : null}
                              </FormGroup>
                            </Colxx>
                          </Row>
                            )}
                              </>
                            )}
                            <Row>
                              <Colxx xxs="12">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.first-name" /> */}
                                    Amount
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="amount"
                                    placeholder="amount"
                                  />
                                  {errors.amount && touched.amount ? (
                                      <div className="invalid-feedback d-block">{errors.amount}</div>
                                    ) : null}
                                </FormGroup>
                              </Colxx>
                            </Row>
                              <Row>
                              <Colxx xxs="12">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.email" /> */}
                                    Email (Optional)
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                    value={payerEmail}
                                    onChange={(e) => setPayerEmail(e.target.value)}
                                  />
                                  {errors.email && touched.email ? (
                                      <div>{errors.email}</div>
                                    ) : null}
                                </FormGroup>
                              </Colxx>
                            </Row>
                            
                            <Row>
                              {/* <Colxx xxl="4"> */}
                                <div className="text-center mb-3 pr-2">
                                <Button
                        color="primary"
                        type="submit"
                        // onClick={() => onUserRegister()}
                      >
                        
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        
                          <span>
                            PAY WITH CARD
                          </span>
                      </Button>
                                </div>{'    '} 
                                {/* </Colxx>{'      '} */}
                                {/* <Colxx xxl="4"> */}
                                <div className="text-center mb-3">
                                
                   
          
            {/* <a
              className="btn btn-outline-primary btn mobile-menu-cta"
              target="_blank"
              rel="noopener noreferrer"
              // href={buyUrl}
              // href="/user/register"
              href="https://icadpay.com/developers/index.html#documenter-5"
            >
              VIEW TEST CARD
            </a> */}
                                </div>
                                {/* </Colxx> */}
                                <div className="text-center mb-3">
                                <Button
                        color="primary"
                        onClick={() => payWithQr()}
                      >
                        
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        
                          <span>
                            PAY WITH QR
                          </span>
                      </Button>
                                </div>
                              {/* </Colxx> */}
                            </Row>
                          </Form>
                        )}
                      </Formik>
                      )}
                      {isQrPay && qrResponseStatus === "Success" && (<DynamicQr qrMessage={qrResponseCode} /> )}
                    </CardBody>
                  </Card> 
                  </div>
                </div>
                <div className="col-12 col-xl-5 offset-xl-1 col-lg-5 col-md-6  d-none d-md-block">
                  {/* eslint-disable-next-line react/jsx-no-target-blank */}
                  <a href={adminRoot} target="_blank">
                    <img
                      alt="hero"
                      src="/assets/img/landing-page/home-hero.png"
                    />
                    {/* <DynamicQr qrMessage="jddddd sjsjs"/> */}
                  </a>
                </div>
              </div>

            </div>
          </div>


          <div className="section footer mb-0" ref={refSectionFooter}>
            <div className="container">
              <div className="row footer-row">
                <div className="col-12 text-right">
                  <a
                    className="btn btn-circle btn-outline-semi-light footer-circle-button c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <i className="simple-icon-arrow-up" />
                  </a>
                </div>
                <div className="col-12 text-center footer-content">
                  <a
                    className="c-pointer"
                    href="#scroll"
                    onClick={(event) => scrollTo(event, 'home')}
                  >
                    <img
                      className="footer-logo"
                      alt="footer logo"
                      src="/assets/logos/white-full.png"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="container copyright pt-5 pb-5">
              <div className="row">
                <div className="col-12" />
                <div className="col-12 text-center">
                  <p className="mb-0">2022 © ICARD</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

<Modal
  isOpen={modalBack}
  toggle={() => setModalBack(!modalBack)}
  backdrop={backdrop}
>
  <ModalHeader>Pay With QR</ModalHeader>
  <ModalBody>
  <Row>
    <div className="col-10 container-fluid">
      {/* <DynamicQr qrMessage="jddddd sjsjs"/> */}
    </div>
  </Row>
  </ModalBody>
  <ModalFooter />
</Modal>

    </div>
    
  );
};

export default BillPay