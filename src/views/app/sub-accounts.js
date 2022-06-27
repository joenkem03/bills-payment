/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle,
  FormGroup,
  Label,
  Button,
} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  // ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/iReactTableCards';
import AlertNotice from 'components/common/alert';
import ModalActionStatus from 'components/common/ModalActionStatus';
import {
  GetMerchantSubAccounts,
  NewSubMerchant,
  GetBanksService,
  VerifyBeneficiaryService
} from 'services/ProtectedService';
import SubBccountBeneficiary from './sub-account-beneficiary'
import SearchSelect from '../../components/common/searchSelect';
import { UserRole } from '../../constants/defaultValues';
import { getCurrentUser } from '../../helpers/Utils';

const newSubMerAccountScheme = Yup.object().shape({
  name: Yup.string().required('Required'),
  // isSplit: Yup.bool().required(),
  // creditSub: Yup.bool().required(),
  // bankId: Yup.number("Please select a Bank").when('creditSub', {is: true, then: Yup.number().min(1, "Please select an MDA").required("Required"), otherwise: null}),
  bankId: Yup.number(),
  accountNumber: Yup.string().when('bankId', {
    is: (val) => val > 0,
    then: Yup.string().required('Required'),
    otherwise: null,
  }),
  // accountNumber: Yup.string().when('creditSub', {is: true, then: Yup.string().required("Required"), otherwise: null}),
  accountName: Yup.string().when('bankId', {
    is: (val) => val > 0,
    then: Yup.string().required('Required'),
    otherwise: null,
  }),
  // accountName: Yup.string().when('creditSub', {is: true, then: Yup.string().required("Required"), otherwise: null}),
});

const SubAccounts = ({ match }) => {
  const [modalRight, setModalRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [showBankDetails, setShowBankDetails] = useState(false);
  const [showBankDetailsAll, setShowBankDetailsAll] = useState(false);
  const [option, setOption] = useState(null);
  const [splitFormation, setSplitFormation] = useState(false);
  const [showSplit, setShowSplit] = useState(false);
  const [bebeficiaryData, setBeneficiaryData] = useState([]);
  const [rowData, setRowData] = useState([]);

  const [beneficiaryInputList, setBeneficiaryInputList] = useState([
    { accountNumber: "", bankId: "", accountName: "", splitValue: "" },
  ]);

  const [bankList, setBankList] = useState([]);


  const currentUser = getCurrentUser();
  const currentRole = currentUser.role;
  const isShowAdd = currentRole === UserRole.Merchant;

  const options = [];

  useEffect(() => {
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
        }

        // console.log(ret.data);
        setBankList(ret.data);
      });
    }
    // }
  }, []);

  // const handleFilterBy = async (e) => {
  //   setSelectedFilterOption(e);
  //   setIsLoading(true);
  //   const response = await api.getAllTransactions({
  //     pageSize: defaultPageSize,
  //     pageIndex: 1,
  //   });
  //   setData(response?.data ?? []);
  //   setPageCount(response?.pageCount ?? 0);
  //   setIsLoading(false);
  // };

  // const handleRefresh = async () => {
  //   setIsLoading(true);
  //   const response = await api.getAllTransactions({
  //     pageSize: defaultPageSize,
  //     pageIndex: 1,
  //   });
  //   setData(response?.data ?? []);
  //   setPageCount(response?.pageCount ?? 0);
  //   setIsLoading(false);
  // };
  
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

  // const VerifyBeneficiary = (bank, number) => {   
  //   const code = bankList.find(f => f.id === bank);
  //   console.log(code); 
  //   if (code === null || code === undefined) return; 
  //   const verify = {
  //     bankCode: code.code,
  //     accountNumber: number
  //   };

  //   VerifyBeneficiaryService(verify).then((res) => {
  //     let returnedName = '';
  //     try {
  //       returnedName = res.data.accountName !== null ? res.data.accountName : "Account Details not verified";
  //     } catch (error) {
  //       returnedName = "Account Details not verified";
  //     }
  //     setAccountName(returnedName);

  //   }).catch();
  // }
  

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

  // const verifyBeneficiary = async (request, index) => {
  //   const list = [...inputList];
  //   let response = await api.verifyBeneficiaries(request);
  //   // return response.data
  //   try {
  //     list[index].accountName = response.data.account_name;
  //   } catch (error) {
  //     list[index].accountName = "Account Details not verified";
  //   }
  //   setInputList(list);
  // };

  const onEdit = async (id) => {
    console.log(id);
  };

  const onDelete = async (row) => {
    console.log(row);
  };

  const onView = async (row) => {
    // console.log(row);
    GetMerchantSubAccounts({id: row.id}).then((res) => {
      // console.log(res);
      setBeneficiaryData(res.data);
      setRowData(row);
    })
  };

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

  const handleAddNew = async () => setModalRight(true);
  // handleAddNe handleOrderBy handleFilterBy handleRefresh

  const handleSubmit = async (inputData) => {
    setIsLoading(true);

    // const bankItem = inputData.bankId === '' ? '0' : inputData.bankId;

    try {
      // const req = {
      //   name: inputData.name,
      //   isSplit: inputData.isSplit,
      //   creditSub: inputData.creditSub,
      //   splitByPercent: inputData.splitByPercent,
      //   splitValue: inputData.splitValue,
      //   bankId: bankItem,
      //   accountName: inputData.accountName,
      //   accountNumber: inputData.accountNumber,
      // };

      // {
      //   splitValue: inputData.splitValue,
      //   bankId: bankItem,
      //   accountName: inputData.accountName,
      //   accountNumber: inputData.accountNumber,
      // };


      const req = {
        name: inputData.name,
        isSplit: inputData.isSplit,
        creditSub: inputData.creditSub,
        splitByPercent: inputData.splitByPercent,
        subAccountBeneficiaries: beneficiaryInputList
      };
      
      console.log(req);

      NewSubMerchant(req)
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setIsSuccess(true);
            setIsLoading(false);
          }
          if (response.status === 400) {
            setIsLoading(false);
            setIsError(true);
            setMessage(response.data.data);
          } else {
            setIsLoading(false);
            setIsError(true);
            console.log(response);
            setMessage('Error occured! ');
          }
        })
        .catch((et) => {
          console.log('error');
          console.log(et);
          setIsLoading(false);
          setIsError(true);
          setMessage(et.data);
        });
    } catch (e) {
      console.log('error');
      console.log(e);
      setIsLoading(false);
      setIsError(true);
      setMessage(e.data);
    }
  };

  const initialValues = {
    name: '',
    isSplit: false,
    creditSub: true,
    splitByPercent: false,
    // splitValue: 0,
    // bankId: '',
    // accountName: '',
    // accountNumber: '',
  };

  const closeModal = () => {
    setModalRight(false);
  };

  const fieldData = React.useMemo(
    () => [
      {
        Header: 'Sub-Account ID',
        accessor: 'subId',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Name',
        accessor: 'name',
        // cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Bank Details',
      //   accessor: 'bankDetails',
      //   // cellClass: 'text-muted  w-10',
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: 'Account No ',
      //   accessor: 'accountNumber',
      //   // cellClass: 'text-muted  w-10',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: 'Settlement Type',
        accessor: 'settlement',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Merchant Gets',
      //   accessor: 'merchantValue',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: 'Fee',
      //   accessor: 'fee',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: 'Account Status',
        accessor: 'isActive',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.sub-accounts" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.sub-accounts" />
          </p> */}
        </Colxx>
        {/* <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="menu.sub-accounts" /> List
          </h3>
        </Colxx> */}
        {/* 
        <Colxx xxs="12">
          <ReactTableWithPaginationCard />
        </Colxx> */}

        {/*         
  'sub-account.name': 'Sub-Account Name',
  'sub-account.credit-sub': 'All Payment to Sub-Account?',
  'sub-account.split-fund': 'Split Payments',
  'sub-account.split-by': 'Split by Percentate (%)',
  'sub-account.split-value': 'Split Value',
  'sub-account.bank': 'Bank',
  'sub-account.account-name': 'Account No',
  'sub-account.account-number': 'Account Name', */}

        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8">
          <ReactTableDivided
            // showAdd="false"
            showAdd={isShowAdd}
            handleAddNew={handleAddNew}
            // showOrderBy="true"
            // showFilterBy="true"
            // showRefresh="true"
            showSearch="true"
            searchButtonOutline="true"
            fetchService={GetMerchantSubAccounts}
            fieldList={fieldData}
            pagetitle={
              <>
                <IntlMessages id="menu.sub-accounts" /> List
              </>
            }
            hasActionMenu
            onDelete={onDelete}
            onView={onView}
            onEdit={onEdit}
            // onViewMore,
            // onSearch,
            // showSearch = false,
            showEdit
            showDelete
            showView
            // pagination = true,
          />{' '}
        </Colxx>
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="4" xl="4" xxl="4">
          <SubBccountBeneficiary transaction={bebeficiaryData} rowData={rowData} />
        </Colxx>
      </Row>

      <Modal
        isOpen={modalRight}
        toggle={() => setModalRight(!modalRight)}
        wrapClassName="modal-right"
      >
        <ModalHeader>
          New <IntlMessages id="menu.new-sub-accounts" />
        </ModalHeader>
        <ModalBody>
          {isSuccess && (
            <ModalActionStatus
              actionTitle="Success"
              actionMessage="Account created Successfully."
              closeModal={closeModal}
            />
          )}
          {!isSuccess && (
            <>
              <CardTitle className="mb-4">
                <IntlMessages id="user.register" />
              </CardTitle>
              <AlertNotice
                message={message}
                // isNotError={isNotError}
                isNotError=""
                isError={isError}
                classStyle="form-input"
              />
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={newSubMerAccountScheme}
              >
                {({ errors, touched, values }) => (
                  <Form>
                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="sub-account.name" />
                      </Label>
                      <Field
                        className="form-control"
                        name="name"
                        // validate={validateEmail}
                      />
                      {errors.name && touched.name && (
                        <div className="invalid-feedback d-block">
                          {errors.name}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      {/* <Label>
                        <IntlMessages id="sub-account.credit-sub" />
                      </Label> */}
                      <Row className="pt-3">
                        <div className="col-6">
                          <Label className="form-input">
                            <IntlMessages id="sub-account.credit-sub" /> :{' '}
                          </Label>
                        </div>
                        <div className="col-4">
                          <Label className="form-input">
                            <Field
                              type="checkbox"
                              name="creditSub"
                              id="creditSub"
                              {...setShowBankDetailsAll(values.creditSub)}
                              {...setShowSplit(values.creditSub)}
                            />{' '}
                          </Label>
                        </div>
                      </Row>
                    </FormGroup>
                    {!showSplit && (
                      <>
                        <FormGroup className="form-group has-float-label  mb-4">
                          {/* <Label>
                        <IntlMessages id="sub-account.split-fund" />
                      </Label> */}
                          <Row className="pt-3">
                            <div className="col-6">
                              <Label className="form-input">
                                <IntlMessages id="sub-account.split-fund" /> :{' '}
                              </Label>
                            </div>
                            <div className="col-4">
                              <Label className="form-input">
                                <Field
                                  type="checkbox"
                                  name="isSplit"
                                  id="isSplit"
                                  {...setShowBankDetails(values.isSplit)}
                                  {...setSplitFormation(values.isSplit)}
                                />{' '}
                              </Label>
                            </div>
                          </Row>
                        </FormGroup>

                        {splitFormation && (
                          <>
                            <FormGroup className="form-group has-float-label  mb-4">
                              {/* <Label>
                        <IntlMessages id="sub-account.split-by" />
                      </Label> */}
                              <Row className="pt-3 pb-3">
                                <div className="col-6">
                                  <Label className="form-input">
                                    <IntlMessages id="sub-account.split-by" /> :{' '}
                                  </Label>
                                </div>
                                <div className="col-4">
                                  <Label className="form-input">
                                    <Field
                                      type="checkbox"
                                      name="splitByPercent"
                                      id="splitByPercent"
                                    />{' '}
                                  </Label>
                                </div>
                              </Row>
                            </FormGroup>
                          </>
                        )}
                      </>
                    )}
                    {(showBankDetails || showBankDetailsAll) && (
                      <>
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
                      </>
                    )}

                    <div className="d-flex justify-content-end align-items-center">
                      <Button
                        color="primary"
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
                            <IntlMessages id="form.submit-button" />
                          </span>
                        )}
                        {/* <IntlMessages id="user.register-button" /> */}
                      </Button>
                      {'   '}
                      <Button
                        color="secondary"
                        onClick={() => setModalRight(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {/* <Button
                      color="primary"
                      onClick={() => setModalRight(false)}
                    >
                      Do Something
                    </Button>{' '}
                    <Button
                      color="secondary"
                      onClick={() => setModalRight(false)}
                    >
                      Cancel
                    </Button> */}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SubAccounts;
