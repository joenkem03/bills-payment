/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import {
  Row,
  Card,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Label,
  FormGroup,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import { ReactTableDivided } from 'containers/ui/iReactTableCards';
// import AlertNotice from 'components/common/alert';
import IconCard from 'components/cards/IconCard';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  GetWalletHistory,
  GetWalletBalance,
  VerifyWalletTopupService,
  GetBanksService,
  NewPaymentService,
  VerifyBeneficiaryService
} from 'services/ProtectedService';
import AlertNotice from 'components/common/alert';
import IncomeCategoriesDoughnut from 'containers/dashboards/IncomeCategoriesDoughnut';
import { UserRole } from '../../constants/defaultValues';
import { getCurrentUser } from '../../helpers/Utils';
import SearchSelect from '../../components/common/searchSelect';

const WalletBalance = ({ match }) => {
  const [modalBack, setModalBack] = useState(false);
  const [modalBackAlt, setModalBackAlt] = useState(false);
  const [backdrop] = useState('static');
  const [balance, setBalance] = useState(0);
  const [lastTransDate, setLastTransDate] = useState('');
  const [lastTransAmnt, setLastTransAmnt] = useState(0);
  const [previousBalance, setPreviousBalance] = useState(0);
  const [transType, setTransType] = useState("");
  const [option, setOption] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  // const [viewData, setViewData] = useState([]);

  // // const [isSuccess, setIsSuccess] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [message, setMessage] = useState('');

  const [payerName, setPayerName] = useState('');
  const [payerEmail, setPayerEmail] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [transRef, setTransRef] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [benBank, setBenBank] = useState('');
  const [bankList, setBankList] = useState([]);
  const [ftReq, setFtReq] = useState(null);
  const [payDesc, setPayDesc] = useState('');
  const [tAccountNum, setTAccountNum] = useState('');
  const [tBankId, setTBankId] = useState('');
  const [benEmail, setBenEmail] = useState('');
  const [payAmnt, setPayAmnt] = useState('');

  
  // const [beneficiaryInputList, setBeneficiaryInputList] = useState([
  //   { accountNumber: "", bankId: "", accountName: "", splitValue: "" },
  // ]);

  const currentUser = getCurrentUser();
  const currentRole = currentUser.role;
  const isShowAdd = currentRole === UserRole.Merchant;

  const options = [];
  
    const { search } = window.location;
    const params = new URLSearchParams(search);

  useEffect(() => {
    // // const {search} = window.location.search;
    // const { search } = window.location;
    // // const search = window.location;
    // const params = new URLSearchParams(search);
    
    if (option === null) {
      GetBanksService().then((ret) => {
        // console.log(ret);
        if (ret.data.length > 0) {
          ret.data.forEach((element) => {
            // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
            options.push({ value: element.id, label: `${element.name}` });
            // }
          });
          setOption(options);
          setBankList(ret.data);
        }
      });
    }

    console.log(search);
    console.log(params);
    console.log(params.has('status'));
    // status=successful&tx_ref=7120952605464543C1-S&transaction_id=2593245
    if (
      params.has('status') &&
      (params.get('status') !== null || params.get('status') !== undefined)
    ) {
      const payStatus = params.get('status');
      setModalBack(true);

      if (
        payStatus.toUpperCase() === 'SUCCESS' ||
        payStatus.toUpperCase() === 'SUCCESSFUL'
      ) {
        const txRef = params.get('ref');
        const txAmnt = params.get('amount');
        VerifyWalletTopupService(txRef)
          .then((res) => {
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
          })
          .catch(
            setIsSuccess(true)
            // setPaymentConfirm("(PAYMENT PENDING)")
          );
      } else {
        setIsSuccess(true);
        // setPaymentConfirm("(PAYMENT PENDING)");
      }
    } else {
      const script = document.createElement('script');
      // script.src = "http://icad-app.smadeandsmight.com/icad-pay-inline.js";
      script.src = 'https://pay-service.icadpay.com/inline-pay.js';
      // script.src = "https://demo.icadpay.com/inline-pay.js";
      script.async = true;
      // script.onload = () => handleSubmitAction(e);
      document.body.appendChild(script);
      // setIsSuccess(true);
      // setPaymentConfirm("");
    }

    

    if(!modalBack){      
      GetWalletBalance(0).then((res) => {
        console.log(res);
        if (res?.data) {
          // {"balance":1.00,"previousBalance":0.00,"lastTransactionAmount":1.00,"lastTransactionDate":"2022-01-25T23:38:16"}
          setBalance(res.data.balance);
          setPreviousBalance(res.data.previousBalance);
          setLastTransAmnt(res.data.lastTransactionAmount);
          setLastTransDate(res.data.lastTransactionDate);
          setTransType(res.data.transactionType)
        }
      }).catch();
    }

    // window.addEventListener('scroll', onWindowScroll);
    // window.addEventListener('resize', onWindowResize);
    // window.addEventListener('click', onWindowClick);

    // document.body.classList.add('no-footer');
    // return () => {
    //   window.removeEventListener('scroll', onWindowScroll);
    //   window.removeEventListener('resize', onWindowResize);
    //   window.removeEventListener('click', onWindowClick);
    //   document.body.classList.remove('no-footer');
    // };
  }, [params.has('status'), modalBack]);

  
  // const handleRemoveClick = (index) => {
  //   const list = [...beneficiaryInputList];
  //   list.splice(index, 1);
  //   setBeneficiaryInputList(list);
  //   // console.log(index);
  // };

  // const handleAddClick = () => {
  //   // setBankItems(createBankItems);
  //   setBeneficiaryInputList([
  //     ...beneficiaryInputList,
  //     { accountNumber: "", bankId: "", accountName: "", splitValue: "" },
  //   ]);
  // };

  const VerifyBeneficiary = (bank, number) => {   
    const code = bankList.find(f => f.id === bank);
    console.log(code); 
    if (code === null || code === undefined) return; 
    const verify = {
      bankCode: code.code,
      accountNumber: number
    };

    VerifyBeneficiaryService(verify).then((res) => {
      let returnedName = '';
      try {
        returnedName = res.data.accountName !== null ? res.data.accountName : "Account Details not verified";
      } catch (error) {
        returnedName = "Account Details not verified";
      }
      setAccountName(returnedName);

    }).catch();
  }
  
  const handleIdChange = (e) => {
    //
    console.log(e);
    setBenBank(e.value);
    VerifyBeneficiary(e.value, accountNumber);
  };
  
  const handleAccChange = (e) => {
    //
    setAccountNumber(e.target.value);    
    VerifyBeneficiary(benBank, e.target.value);
  };

  // {[{"transactionId":"64c255405fee4c38a9b7278fc793032a","transactionRef":"270008270467","transactionType":null,"source":"UBA","destination":"WALLET","amount":1.00,"transactionDate":"2022-01-25T21:42:59"}]}
  const fieldData = React.useMemo(
    () => [
      {
        Header: 'Transaction Date',
        accessor: 'transactionDate',
        // cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{
          moment(props.value).format('MMMM Do YYYY, h:mm:ss A')}</>,
      },
      {
        Header: 'Transaction Ref',
        accessor: 'transactionRef',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Transaction Type',
        accessor: 'transactionType',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <><NumberFormat
        value={parseFloat(props.value)}
        displayType="text"
        thousandSeparator
        fixedDecimalScale
        decimalScale={2}
        prefix="NGN"
      /></>,
      },
      // {
      //   Header: 'Status',
      //   accessor: 'createdDate',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: 'Balance',
      //   accessor: 'role',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: 'Source/Destination',
        accessor: 'flow',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Account Status',
      //   accessor: 'isActive',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
    ],
    []
  );

  const doWalletTopUp = () => {
    console.log('topuped');
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
    setModalBack(true);
    // setViewData(row);
    // console.log(row);
  };
  const doPayOut = () => {
    console.log('out');
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
    setModalBackAlt(true);
    // setViewData(row);
    // console.log(row);
  };

  

  const closeWalletTopUp = () => {
    console.log('topuped');
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
    setModalBack(false);
    setPayerName('');
    setPayerEmail('');
    setPayerPhone('');
    setAmountPaid('');
    setTransRef('');
    setPaymentStatus('');
    // setViewData(row);
    // console.log(row);
  };
  const closePayOut = () => {
    console.log('out');
    setIsSuccess(false);
    setIsError(false);
    setIsLoading(false);
    setModalBackAlt(false);
    setFtReq(null);
    setPayDesc('');
    setTAccountNum('');
    setTBankId('');
    setBenEmail('');
    setPayAmnt('');
    setTransRef('');
    setPaymentStatus('');
    // setViewData(row);
    // console.log(row);
  };

  const editPaymentReq = () => {
    setIsConfirm(false);
  };

  const verifyPaymentReq = () => {
    setIsConfirm(true);
  };

  const sendFTSubmit = () => {
    
    setIsLoading(true);

    // const bankItem = inputData.bankId === '' ? '0' : inputData.bankId;

    try {
      // const req = {
      //   "beneficiaryList": [
      //     {
      //       "amount": parseFloat(e.amount),
      //       "paymentDescription": e.paymentDescription,
      //       "transactionAccountName": accountName,
      //       "transactionAccountNumber": accountNumber,
      //       "transactionBankId": e.transactionBankId,
      //       "beneficiaryEmail": e.beneficiaryEmail
      //     }
      //   ],
      //   "transactionSummary": {
      //     "debitNarration": e.paymentDescription,
      //     "isSourceBankAccount": false,
      //     "debitAccountId": 0,
      //     "channelId": 1
      //   },
      //   "paymentPin": "string"
      // }
      
      console.log(ftReq);

      NewPaymentService(ftReq)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setIsLoading(false);
          //   {
          //     "responseCode": "38",
          //     "message": "Unauthorized debit account",
          //     "status": false
          // }
            if (response.data.responseCode === "00"){
              setIsSuccess(true);
              // const successMessage = JSON.parse(response.data.status) ? "SUCCESS" : "FAILED";
              // `${successMessage}  ${response.data.message}`;
              // setPaymentStatus(`${successMessage}  ${response.data.message}`);
              setPaymentStatus(response.data.message);
              setTransRef(response.data.transactionRef);

            } else{
              setIsError(true);
              // const failedMessage = JSON.parse(response.data.status) ? "SUCCESS" : "FAILED";
              // `${failedMessage}  ${response.data.message}`;
              setMessage(response.data.message);      
              setPaymentStatus(response.data.status);
              // setPaymentStatus(`${failedMessage}  ${response.data.message}`);
              setTransRef(response.data.transactionRef);        
            }

          }
          // if (response.status === 400) {
          //   setIsLoading(false);
          //   setIsError(true);
          //   setMessage(response.data.data);
          // } 
          else {
            setIsLoading(false);
            setIsError(true);
            console.log(response);
            setMessage(response.message);
          }
        })
        .catch((et) => {
          console.log('error');
          console.log(et);
          setIsLoading(false);
          setIsError(true);
          setMessage(et.data);
        });
    } catch (er) {
      console.log('error');
      console.log(er);
      setIsLoading(false);
      setIsError(true);
      setMessage(er.data);
    }
  }

  const handleFTSubmit = (e) => {
    
    // setIsLoading(true);

    // const bankItem = inputData.bankId === '' ? '0' : inputData.bankId;

      const req = {
        "beneficiaryList": [
          {
            "amount": parseFloat(e.amount),
            "paymentDescription": e.paymentDescription,
            "transactionAccountName": accountName,
            "transactionAccountNumber": accountNumber,
            "transactionBankId": e.transactionBankId,
            "beneficiaryEmail": e.beneficiaryEmail
          }
        ],
        "transactionSummary": {
          "debitNarration": e.paymentDescription,
          "isSourceBankAccount": false,
          "debitAccountId": 0,
          "channelId": 1
        },
        "paymentPin": "string"
      }

      setFtReq(req);
      setTAccountNum(accountNumber);
      setTBankId(e.transactionBankId);
      setPayAmnt(e.amount);
      setPayDesc(e.paymentDescription);
      setBenEmail(e.beneficiaryEmail);
      verifyPaymentReq();
      
    //   console.log(req);

    //   NewPaymentService(req)
    //     .then((response) => {
    //       console.log(response);
    //       if (response.status === 200) {
    //         setIsLoading(false);
    //       //   {
    //       //     "responseCode": "38",
    //       //     "message": "Unauthorized debit account",
    //       //     "status": false
    //       // }
    //         if (response.data.responseCode === "00"){
    //           setIsSuccess(true);

    //         } else{
    //           setIsError(true);
    //           setMessage(response.data.message);              
    //         }

    //       }
    //       // if (response.status === 400) {
    //       //   setIsLoading(false);
    //       //   setIsError(true);
    //       //   setMessage(response.data.data);
    //       // } 
    //       else {
    //         setIsLoading(false);
    //         setIsError(true);
    //         console.log(response);
    //         setMessage(response.message);
    //       }
    //     })
    //     .catch((et) => {
    //       console.log('error');
    //       console.log(et);
    //       setIsLoading(false);
    //       setIsError(true);
    //       setMessage(et.data);
    //     });
    // } catch (er) {
    //   console.log('error');
    //   console.log(er);
    //   setIsLoading(false);
    //   setIsError(true);
    //   setMessage(er.data);
    // }
  }

  const handleWalletTopUpSubmit = (e) => {
    setModalBack(false);
    // window.load = "http://icad-app.smadeandsmight.com/icad-pay-inline.js";
    const handler = window.IcadPay.setup({
      // key: 'test_ZTgxNTYxMzUwODYyODU3NzM5MmI4OTdjZmZmMGYyY2FkNGU5Nzc5ZDAwM2NlOWIyZTE3YzEwMTQwNDIwNTA0OA', // this is a demo key.
      key: 'live_ZmMxMzJiOGQ4MjZkODc4Y2ZiYjk5NTYxMTE5ODNkYjE5NzRiNjQzNTI4MmFiNGU4YTRkMzE0NzIwNDVhYzhmMQ', 
      email: e.email, // customer email where invoice will be sent to
      amount: e.amount, // amount to be processed
      currency: 'NGN', // currency
      first_name: e.firstName,
      last_name: e.lastName,
      // phone_number: "+2348012345678", // customer's phone number
      phone_number: e.phone, // customer's phone number
      ref: ` ${Math.floor(Math.random() * 1000000000 + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      redirect_url: '', // where do we redirect your customers to?
      due_date: '31/12/2021',
      fee_bearer: '',
      items: '',
      payment_methods: '',
      invoice: 'false',
      invoiceID: '',
      narration: `${currentUser.organisation} topup`,
      callback: (response) => {
        console.log(response);
      },
      onSuccess: (response) => {
        setModalBack(true);
        console.log(response);
        // alert(`success. transaction ref is ${response.paymentReference}`);
        // alert('Success');

        
        VerifyWalletTopupService(response.paymentReference)
          .then((res) => {
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
          })
          .catch(
            setIsSuccess(true)
            // setPaymentConfirm("(PAYMENT PENDING)")
          );
         
        // VerifyPaymentService(response.paymentReference).then((res) => {
        //   console.log(res);
        //   if (res.status === 200) {
        //     setPayerName(res.data.customerName);
        //     setPayerEmail(res.data.customerEmail);
        //     setPayerPhone(res.data.customerPhone);
        //     setAmountPaid(res.data.amountPaid);
        //     setTransRef(response.paymentReference);
        //     setPaymentStatus(res.data.status); 
        //     setIsSuccess(true);           
        //   }
        // }).catch(
        //   setIsSuccess(true)      
        //   // setPaymentConfirm("(PAYMENT PENDING)")
        //   );
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
  };  
  
  const payScheme = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string().required('Required').email('Invalid email'),
    // address: Yup.string().required(),
    phone: Yup.string().required('Required'),
    amount: Yup.number().min(1).max(100000).required('Required. Between 1 and 100000'),
  });

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.wallet" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {/* <Colxx xxs="8" className="container-fluid mb-4"> */}
        <Colxx
          xxs="12"
          md="12"
          sm="12"
          xs="12"
          lg="8"
          xl="8"
          xxl="8"
          className="mb-4"
        >
          {/* <p>
            <IntlMessages id="menu.wallet" />
          </p> */}
          <Row>
            <Colxx xxs="12">
              <IconCard
                icon="large-icon simple-icon-wallet"
                title="menu.wallet-balance"
                value={
        <NumberFormat
          value={parseFloat(balance)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        />}
                className="mb-4"
              />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12">
              <ReactTableDivided
                // showAdd="false"
                // showAdd={isShowAdd}
                // showOrderBy="true"
                // showFilterBy="true"
                // showRefresh="true"
                showSearch="true"
                searchButtonOutline="true"
                fetchService={GetWalletHistory}
                fieldList={fieldData}
                // handleAddNew={handleAddNew}
                pagetitle={
                  <>
                    <IntlMessages id="menu.wallet" /> History
                  </>
                }
              />{' '}
            </Colxx>
          </Row>
        </Colxx>
        {/* <Colxx xxs="4" lg="4" md="6"> */}
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="4" xl="4" xxl="4">
          <Row className="mb-4">
            <Colxx xxs="12">
              <Card>
                <CardBody>
                  {/* <CardTitle>
            <IntlMessages id="dashboards.logs" />
          </CardTitle> */}
                  <div className="dashboard-list-with-user">
                    <table className="table table-sm table-borderless mb-3 pb-3 border-bottom">
                      <tbody className="mb-5 pb-5">
                        <tr className="mb-5 pb-5">
                          <td>
                            <span />
                          </td>
                          <td>
                            <span className="list-item-heading">
                              Last Transaction
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="lead text-center"> {transType}</span>
                          </td>
                        </tr>
                        <tr className="mb-5 pb-5">
                          <td>
                            <span />
                          </td>
                          <td>
                            <span className="text-muted">
                              Previous Balance
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="list-item-heading">
        <NumberFormat
          value={parseFloat(previousBalance)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        />
                            </span>
                          </td>
                        </tr>
                        <tr className="mb-5 pb-5">
                          <td>
                            <span />
                          </td>
                          <td>
                            <span className="text-muted">
                              Last Transaction Amount
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="list-item-heading">
        <NumberFormat
          value={parseFloat(lastTransAmnt)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        /></span>
                          </td>
                        </tr>
                        <tr className="mb-5 pb-5">
                          <td>
                            <span />
                          </td>
                          <td>
                            <span className="text-muted">
                              Last Transaction Date
                            </span>
                          </td>
                          <td className="text-right">
                            <span className="list-item-heading">{
        moment(lastTransDate).format('MMMM Do YYYY, h:mm:ss A')}</span>
                          </td>
                        </tr>
                        <tr className="mb-5 pb-5">
                          <td>
                            <span />
                          </td>
                          <td>
                            <span className="list-item-heading"/> 
                          </td>
                          <td className="text-right">
                            <span className="text-muted"/>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {isShowAdd && (
                    <Row className="m-2 p-2">
                      <Colxx xxs="6" className="pl-2">
                        <Button color="primary" size="lg"
                          onClick={() => doPayOut()}>
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            {/* <IntlMessages id="user.reset-password-button" /> */}
                            Payout
                          </span>
                        </Button>
                      </Colxx>
                      <Colxx xxs="6" className="pr-2">
                        <Button
                          color="primary"
                          size="lg"
                          onClick={() => doWalletTopUp()}
                        >
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                          <span className="label">
                            {/* <IntlMessages id="user.reset-password-button" /> */}
                            Topup
                          </span>
                        </Button>
                      </Colxx>
                    </Row>
                  )}
                </CardBody>
              </Card>
            </Colxx>
          </Row>

          <Row>
            <Colxx xxs="12" className="mb-4">
              <IncomeCategoriesDoughnut />
            </Colxx>
          </Row>
        </Colxx>
      </Row>

<Modal
  isOpen={modalBack}
  toggle={() => setModalBack(!modalBack)}
  backdrop={backdrop}
>
  <ModalHeader>Merchant Wallet Topup</ModalHeader>
  <ModalBody>
    {/* <Card className="pt-5">
              <CardBody> */}
    {console.log(isSuccess)}
    {isSuccess && (
      <Table borderless>
        <tbody>
          <tr>
            <th scope="row">Name:</th>
            <td className="pl-5">{payerName}</td>
          </tr>
          <tr>
            <th scope="row">Email:</th>
            <td className="pl-5">{payerEmail}</td>
          </tr>
          <tr>
            <th scope="row">Phone:</th>
            <td className="pl-5">{payerPhone}</td>
          </tr>
          <tr>
            <th scope="row">Amount Paid:</th>
            <td className="pl-5"><NumberFormat
    value={parseFloat(amountPaid)}
    displayType="text"
    thousandSeparator
    fixedDecimalScale
    decimalScale={2}
    prefix="NGN"
  /></td>
          </tr>
          <tr>
            <th scope="row">Trans Ref:</th>
            <td className="pl-5">{transRef}</td>
          </tr>
          <tr>
            <th scope="row">Status:</th>
            <td className="pl-5">{paymentStatus}</td>
          </tr>
          <tr>
          <td span="2">
          <Button color="secondary" onClick={() => closeWalletTopUp()}>
            Close
          </Button>
          </td>
          </tr>
        </tbody>
      </Table>
    )}
    {!isSuccess && (
      <Formik
        initialValues={{
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          phone: currentUser.phone,
          amount: 0,
        }}
        onSubmit={handleWalletTopUpSubmit}
        validationSchema={payScheme}
      >
        {({errors, touched}) => (
          <Form>
            <Row>
              <Colxx xxs="12">
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    {/* <IntlMessages id="user.first-name" /> */}
                    First Name
                  </Label>
                  <Field
                    className="form-control"
                    name="firstName"
                    placeholder="First Name"
                    // enable={false}
                    disabled
                  />
                  {errors.firstName && touched.firstName ? (
                    <div>{errors.firstName}</div>
                  ) : null}
                </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <FormGroup className="form-group has-float-label  mb-4">
                  <Label>
                    {/* <IntlMessages id="user.first-name" /> */}
                    Last Name
                  </Label>
                  <Field
                    className="form-control"
                    name="lastName"
                    placeholder="Last Name"
                    // enable={false}
                    disabled
                  />
                  {errors.lastName && touched.lastName ? (
                    <div>{errors.lastName}</div>
                  ) : null}
                </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="12">
                <FormGroup className="form-group has-float-label mb-4">
                  <Label>
                    {/* <IntlMessages id="user.email" /> */}
                    Email
                  </Label>
                  <Field
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    // enable={false}
                    disabled
                  />
                  {errors.email && touched.email ? (
                    <div>{errors.email}</div>
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
                    // enable={false}
                    disabled
                  />
                  {errors.phone && touched.phone ? (
                    <div>{errors.phone}</div>
                  ) : null}
                </FormGroup>
              </Colxx>
            </Row>
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
                  ): null }
                </FormGroup>
              </Colxx>
            </Row>
            <Row>
              <Colxx xxs="3">
                <div className="text-center mb-3">
                  <Button
                    color="primary"
                    // type="button"
                    type="submit"
                    // onClick={() => onUserRegister()}
                  >
                    <span className="spinner d-inline-block">
                      <span className="bounce1" />
                      <span className="bounce2" />
                      <span className="bounce3" />
                    </span>

                    <span>LOAD</span>
                  </Button>
                </div>
              </Colxx>{' '}
              <Colxx xxs="3">
                <Button color="secondary" onClick={() => closeWalletTopUp()}>
                  Close
                </Button>
          </Colxx>

            </Row>
          </Form>
        )}
      </Formik>
    )}
    {/* </CardBody>
            </Card>  */}
  </ModalBody>
  <ModalFooter />
  {/* </ModalFooter> */}
</Modal>


      <Modal
        isOpen={modalBackAlt}
        toggle={() => setModalBackAlt(!modalBackAlt)}
        backdrop={backdrop}
      >
        <ModalHeader>Funds Transfer</ModalHeader>
        <ModalBody>
          {/* <Card className="pt-5">
                    <CardBody> */}
          {console.log(isSuccess)}
          {isSuccess && isConfirm && (
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">Beneficiary</th>
                  {/* <td className="pl-3">{ftReq.beneficiaryList[0].transactionAccountName}({ftReq.beneficiaryList[0].transactionAccountNumber})</td> */}
                  <td className="pl-3">{accountName}({tAccountNum})</td>
                </tr>
                <tr>
                  <th scope="row">Bank:</th>
                  <td className="pl-3">{(bankList.find(f => f.id === tBankId))?.name}</td>
                </tr>
                <tr>
                  <th scope="row">Email:</th>
                  <td className="pl-3">{benEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Amount Paid:</th>
                  <td className="pl-3"><NumberFormat
          value={parseFloat(payAmnt)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        /></td>
                </tr>
                <tr>
                  <th scope="row">Payment Desc:</th>
                  <td className="pl-3">{payDesc}</td>
                </tr>
                <tr>
                  <th scope="row">Trans Ref:</th>
                  <td className="pl-3">{transRef}</td>
                </tr>
                <tr>
                  <th scope="row">Status:</th>
                  <td className="pl-3">{paymentStatus}</td>
                </tr>
                <tr>
                <td span="2">
                {/* <Button color="secondary" onClick={() => setModalBackAlt(false)}>
                  Close
                </Button> */}
                
                <Row>
                    {/* <Colxx xxs="3">
                      <div className="text-center mb-3">
                        <Button
                          color="primary"
                          // type="button"
                          type="submit"
                          // onClick={() => onUserRegister()}
                        disabled={isLoading}
                        >
                        {isLoading && (
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        )}
                        {isLoading && <span>&nbsp;&nbsp;Waiting...</span>}
                        {!isLoading && (
                          <span>
                            Pay
                          </span>
                        )}
                        </Button>
                      </div>
                    </Colxx>{' '} */}
                    <Colxx xxs="3">
                      {/* <Button color="secondary" onClick={() => setModalBackAlt(false)}> */}
                      <Button color="secondary" onClick={() => closePayOut()}>
                        Close
                      </Button>
                </Colxx>

                  </Row>                
                </td>
                </tr>
              </tbody>
            </Table>
          )}
          {console.log(ftReq)}
          {isConfirm && !isSuccess && (
            <>
            <AlertNotice
              message={message}
              // isNotError={isNotError}
              isNotError=""
              isError={isError}
              classStyle="form-input"
            />
            
            <Formik
            initialValues={{paymentPin: ''}}
            onSubmit={sendFTSubmit}
          >
          {({errors, touched}) => (
              <Form>
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">Beneficiary</th>
                  {/* <td className="pl-3">{ftReq.beneficiaryList[0].transactionAccountName}({ftReq.beneficiaryList[0].transactionAccountNumber})</td> */}
                  <td className="pl-3">{accountName}({tAccountNum})</td>
                </tr>
                <tr>
                  <th scope="row">Bank:</th>
                  <td className="pl-3">{(bankList.find(f => f.id === tBankId))?.name}</td>
                </tr>
                <tr>
                  <th scope="row">Email:</th>
                  <td className="pl-3">{benEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Amount Paid:</th>
                  <td className="pl-3"><NumberFormat
          value={parseFloat(payAmnt)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        /></td>
                </tr>
                <tr>
                  <th scope="row">Payment Desc:</th>
                  <td className="pl-3">{payDesc}</td>
                </tr>
                {/* <tr>
                  <th scope="row">Trans Ref:</th>
                  <td className="pl-5">{transRef}</td>
                </tr> */}
                {/* <tr>
                  <th scope="row">Status:</th>
                  <td className="pl-5">{paymentStatus}</td>
                </tr> */}
                <tr>
                  
                <Row>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          {/* <IntlMessages id="user.first-name" /> */}
                          Authorization PIN
                        </Label>
                        <Field
                          className="form-control"
                          name="paymentPin"
                          type="password"
                          placeholder="******"
                          // value={accountName}
                          // disabled
                        />
                        {errors.paymentPin && touched.paymentPin ? (
                          <div>{errors.paymentPin}</div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                </tr>
                <tr>
                <td span="2">
                {/* <Button color="secondary" onClick={() => setModalBackAlt(false)}>
                  Close
                </Button> */}
                
                <Row>
                    <Colxx xxs="3">
                      <div className="text-center mb-3">
                        <Button
                          color="primary"
                          // type="button"
                          type="submit"
                          // onClick={() => sendFTSubmit()}
                        disabled={isLoading}
                        >
                        {isLoading && (
                          <span className="spinner d-inline-block">
                            <span className="bounce1" />
                            <span className="bounce2" />
                            <span className="bounce3" />
                          </span>
                        )}
                        {isLoading && <span>&nbsp;&nbsp;Waiting...</span>}
                        {!isLoading && (
                          <span>
                            Pay
                          </span>
                        )}
                        </Button>
                      </div>
                    </Colxx>{' '}
                    <Colxx xxs="3" className="pl-5">
                      {/* <Button color="secondary" onClick={() => setModalBackAlt(false)}> */}
                      <Button color="secondary" onClick={() => editPaymentReq()}>
                        Back
                      </Button>
                </Colxx>

                  </Row>                
                </td>
                </tr>
              </tbody>
            </Table>
                    
                    </Form>
                  )}
                </Formik>
           </>
          )}
          {!isConfirm && !isSuccess && (
            <>
              <AlertNotice
                message={message}
                // isNotError={isNotError}
                isNotError=""
                isError={isError}
                classStyle="form-input"
              />
            <Formik
              // initialValues={
              //   { paymentDescription: '', transactionAccountNumber: '', transactionBankId: 0, beneficiaryEmail: '', amount: ''}}
              initialValues={
                { paymentDescription: payDesc, transactionAccountNumber: tAccountNum, transactionBankId: tBankId, beneficiaryEmail: benEmail, amount: payAmnt}}
              onSubmit={handleFTSubmit}
              // validationSchema={payScheme}
            >
              {({errors, touched}) => (
                <Form>
                  <Row>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          {/* <IntlMessages id="user.first-name" /> */}
                          Account Number
                        </Label>
                        <Field
                          className="form-control"
                          name="transactionAccountNumber"
                          placeholder="Account Number"
                          onChange={(e) => handleAccChange(e)}
                          value={accountNumber}
                          // disabled
                        />
                        {errors.transactionAccountNumber && touched.transactionAccountNumber ? (
                          <div>{errors.transactionAccountNumber}</div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                <Row>
                  <Colxx xxs="12">
                    <FormGroup className="form-group has-float-label mb-4">
                        <Label>
                          <IntlMessages id="sub-account.bank" />
                        </Label>
                        <Field
                          name="transactionBankId"
                          component={SearchSelect}
                          options={option}
                          // value={benBank}
                          handleIdChange={handleIdChange}
                          // onChange={VerifyBeneficiaryService}
                        />
                        {errors.transactionBankId && touched.transactionBankId ? (
                          <div>{errors.transactionBankId}</div>
                        ) : null}
                    </FormGroup>
                  </Colxx>
                </Row>
                  <Row>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          {/* <IntlMessages id="user.first-name" /> */}
                          Beneficiary Name
                        </Label>
                        <Field
                          className="form-control"
                          name="transactionAccountName"
                          placeholder="Beneficiary Account"
                          value={accountName}
                          disabled
                        />
                        {errors.transactionAccountName && touched.transactionAccountName ? (
                          <div>{errors.transactionAccountName}</div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
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
                        ): null }
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label  mb-4">
                        <Label>
                          {/* <IntlMessages id="user.first-name" /> */}
                          Payment Description
                        </Label>
                        <Field
                          className="form-control"
                          name="paymentDescription"
                          placeholder="Payment Description"
                          // enable={false}
                          // disabled
                        />
                        {errors.paymentDescription && touched.paymentDescription ? (
                          <div>{errors.paymentDescription}</div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xxs="12">
                      <FormGroup className="form-group has-float-label mb-4">
                        <Label>
                          {/* <IntlMessages id="user.email" /> */}
                          Email
                        </Label>
                        <Field
                          className="form-control"
                          name="beneficiaryEmail"
                          placeholder="Email"
                          // disabled
                        />
                        {errors.beneficiaryEmail && touched.beneficiaryEmail ? (
                          <div>{errors.beneficiaryEmail}</div>
                        ) : null}
                      </FormGroup>
                    </Colxx>
                  </Row>
                  <Row>
                    <Colxx xxs="3">
                      <div className="text-center mb-3">
                        <Button
                          color="primary"
                          // type="button"
                          type="submit"
                          // onClick={() => verifyPaymentReq()}
                        // disabled={isLoading}
                        >
                          Proceed
                        </Button>
                      </div>
                    </Colxx>{' '}
                    {/* <Colxx xxs="3">
                      <Button color="secondary" onClick={() => verifyPaymentReq()}>
                        Proceed
                      </Button>
                </Colxx>{' '} */}
                    <Colxx xxs="3">
                      <Button color="secondary" onClick={() => closePayOut()}>
                        Close
                      </Button>
                </Colxx>

                  </Row>
                </Form>
              )}
            </Formik>
            </>
          )}
          {/* </CardBody>
                  </Card>  */}
        </ModalBody>
        <ModalFooter />
        {/* </ModalFooter> */}
      </Modal>
    </>
  );
};

export default WalletBalance;



// https://icadpay.com/app/wallet?status=SUCCESSFUL&amount=5&ref=%20458637273


// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiTWVyY2hhbnQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxIiwiYWN0b3J0IjoiVHJ1ZSIsIm5iZiI6MTY0OTEwMDUyMiwiZXhwIjoxNjQ5NzA1MzIyLCJpYXQiOjE2NDkxMDA1MjJ9.-2OyghIotiBZeRrvq0KQKgPJ7wvbP11-NzywT-i7B10


