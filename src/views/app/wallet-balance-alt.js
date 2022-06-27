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

const WalletBalanceAlt = ({ match }) => {
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
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [benBank, setBenBank] = useState('');
  const [bankList, setBankList] = useState([]);
  
  const [beneficiaryInputList, setBeneficiaryInputList] = useState([
    { transactionAccountNumber: "", transactionBankId: "", transactionAccountName: "", amount: "", paymentDescription: "", beneficiaryEmail: "" },
  ]);

  const [bankList, setBankList] = useState([]);

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

//   select all settlements not paid
// foreach item in settlements not paid
// 	if subId is not null
// 		get transaction, sub beneficiary
// 		settle beneficiaries bank
// 		settle merchant to wallet
// 		update settlement
// 	else
// 		settle merchant to wallet
// 		update settlement


  
  
  const handleRemoveClick = (index) => {
    const list = [...beneficiaryInputList];
    list.splice(index, 1);
    setBeneficiaryInputList(list);
    // console.log(index);
  };

  const handleAddClick = () => {
    // setBankItems(createBankItems);
    setBeneficiaryInputList([
      ...beneficiaryInputList,
      { accountNumber: "", bankId: "", accountName: "", splitValue: "" },
    ]);
  };

  

  const handleInputChange = (e, index) => {
    console.log(e.target);
    const { id, value } = e.target;
    // const { name, value } = e.target;
    const list = [...beneficiaryInputList];
    list[index][id] = value;
    // list[index][name] = value;

    if (id === "accountNumber") {
    // if (name === "accountNumber" || name === "bankId") {
      if (
        list[index].accountNumber.length === 10 &&
        (list[index].bankId !== null || list[index].bankId !== null)
      ) {
        const code = bankList.find(f => f.id === list[index].bankId);
        if (code !== null && code !== undefined){
          const verify = {
            bankCode: code.code,
            accountNumber: list[index].accountNumber
          };

          VerifyBeneficiaryService(verify).then((res) => {
            try {
              list[index].accountName = res.data.accountName !== null ? res.data.accountName : "Account Details not verified";
            } catch (error) {
              list[index].accountName = "Account Details not verified";
            }        
            setBeneficiaryInputList(list);

          }).catch();
        }
      }
    } else{
      setBeneficiaryInputList(list);
      console.log(beneficiaryInputList);
    }
  };


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
  
  const handleIdChange = (e, index) => {
    //
    console.log(e);
    console.log(index);

    const list = [...beneficiaryInputList];
    
    list[index].bankId = e.value;
    
    // if (id === "accountNumber" || id === "bankId") {
      // if (e.field === "accountNumber" || e.field === "bankId") {
        if (list[index].accountNumber.length === 10)
        {
          
        const code = bankList.find(f => f.id === list[index].bankId);

          const verify = {
              bankCode: code.code,
              accountNumber: list[index].accountNumber
            };
  
          VerifyBeneficiaryService(verify).then((res) => {
            try {
              list[index].accountName = res.data.accountName !== null ? res.data.accountName : "Account Details not verified";
            } catch (error) {
              list[index].accountName = "Account Details not verified";
            }
            setBeneficiaryInputList(list);
  
          }).catch();
        }
      // }
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

  const handleFTSubmit = (e) => {
    
    setIsLoading(true);

    // const bankItem = inputData.bankId === '' ? '0' : inputData.bankId;

    try {
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
      
      console.log(req);

      NewPaymentService(req)
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

            } else{
              setIsError(true);
              setMessage(response.data.message);              
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
          <Button color="secondary" onClick={() => setModalBack(false)}>
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
                <Button color="secondary" onClick={() => setModalBack(false)}>
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
          {isSuccess && (
            <Table borderless>
              <tbody>
                <tr>
                  <th scope="row">Beneficiary</th>
                  <td className="pl-5">{payerName}</td>
                </tr>
                <tr>
                  <th scope="row">Email:</th>
                  <td className="pl-5">{payerEmail}</td>
                </tr>
                <tr>
                  <th scope="row">Bank:</th>
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
                <Button color="secondary" onClick={() => setModalBackAlt(false)}>
                  Close
                </Button>
                </td>
                </tr>
              </tbody>
            </Table>
          )}
          {!isSuccess && (
            <>
              <AlertNotice
                message={message}
                // isNotError={isNotError}
                isNotError=""
                isError={isError}
                classStyle="form-input"
              />
            <Formik
              initialValues={
                { paymentDescription: '', transactionAccountNumber: '', transactionBankId: 0, beneficiaryEmail: '', amount: ''}}
              onSubmit={handleFTSubmit}
              // validationSchema={payScheme}
            >
              {({errors, touched}) => (
                <Form>

                      {beneficiaryInputList.map((x, i) => {
                        return(
                        <>
                        <hr/>
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            <IntlMessages id="sub-account.bank" />
                          </Label>
                          <Field
                            id="bankId"
                            // name="bankId"
                            value={x.bankId}
                            component={SearchSelect}
                            options={option}
                            handleIdChange={(e) => handleIdChange(e, i)}
                            // handleIdChange={(e) => handleInputChange(e, i)}
                            // onChange={(e) => handleInputChange(e, i)}
                          />
                          {errors.bankId && touched.bankId ? (
                            <div>{errors.bankId}</div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            <IntlMessages id="sub-account.account-number" />
                          </Label>
                          <Field
                            className="form-control"
                            id="accountNumber"
                            // name="accountNumber"
                            value={x.accountNumber}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                          {errors.accountNumber && touched.accountNumber && (
                            <div className="invalid-feedback d-block">
                              {errors.accountNumber}
                            </div>
                          )}
                        </FormGroup>
                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            <IntlMessages id="sub-account.account-name" />
                          </Label>
                          <Field
                            className="form-control"
                            id="accountName"
                            // name="accountName"
                            value={x.accountName}
                            required
                            disabled
                          />
                          {errors.accountName && touched.accountName && (
                            <div className="invalid-feedback d-block">
                              {errors.accountName}
                            </div>
                          )}
                        </FormGroup>

                        <FormGroup className="form-group has-float-label  mb-4">
                          <Label>
                            <IntlMessages id="sub-account.split-value" />
                          </Label>
                          <Field
                            className="form-control"
                            id="splitValue"
                            // name="splitValue"
                            value={x.splitValue}
                            onChange={(e) => handleInputChange(e, i)}
                            required
                          />
                          {errors.splitValue && touched.splitValue && (
                            <div className="invalid-feedback d-block">
                              {errors.splitValue}
                            </div>
                          )}
                        </FormGroup>
                        
                        
                  <div className="row">
                    {beneficiaryInputList.length !== 1 && (
                      <div className="col-sm-1">
                        <span
                          className="glyph-icon simple-icon-minus"
                          style={{ "font-size": "20px" }}
                          onClick={() => handleRemoveClick(i)}
                        />
                      </div>
                    )}
                    {beneficiaryInputList.length - 1 === i && (
                      <div className="col-sm-1">
                        <span
                          className="glyph-icon simple-icon-plus"
                          style={{ "font-size": "20px" }}
                          onClick={handleAddClick}
                        />
                      </div>
                    )}
                  </div>
                  <hr/>
                      </>
                        )
                          })}
                  <Row>
                    <Colxx xxs="3">
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
                    </Colxx>{' '}
                    <Colxx xxs="3">
                      <Button color="secondary" onClick={() => setModalBackAlt(false)}>
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

export default WalletBalanceAlt;



// https://icadpay.com/app/wallet?status=SUCCESSFUL&amount=5&ref=%20458637273


// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIiLCJyb2xlIjoiTWVyY2hhbnQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9zaWQiOiIxIiwiYWN0b3J0IjoiVHJ1ZSIsIm5iZiI6MTY0OTEwMDUyMiwiZXhwIjoxNjQ5NzA1MzIyLCJpYXQiOjE2NDkxMDA1MjJ9.-2OyghIotiBZeRrvq0KQKgPJ7wvbP11-NzywT-i7B10


