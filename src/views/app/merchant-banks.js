
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter, CardTitle, FormGroup, Label, Button } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  // ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/iReactTableCards';
import {GetMerchantBanksService, NewMerchantBank, GetBanksService} from 'services/ProtectedService';
import AlertNotice from 'components/common/alert';
import ModalActionStatus from 'components/common/ModalActionStatus';
import SearchSelect from "../../components/common/searchSelect";
import { UserRole } from '../../constants/defaultValues';
import { getCurrentUser } from '../../helpers/Utils';

const MerchantBank = () => {
  const [modalRight, setModalRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [option, setOption] = useState(null);

  const currentUser = getCurrentUser();
  const currentRole = currentUser.role;
  const isShowAdd = currentRole === UserRole.Merchant;
  

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

  
  const options = [];
  
  useEffect(() => {
    if (option === null) {
      GetBanksService().then((ret) => {
        console.log(ret);
        if(ret.data.length > 0){
          ret.data.forEach(element => {
            // if (element !== "Admin" || element != "Individual" || element !== "Non-Individual") {
              options.push({ value: element.id, label: `${element.name}` });              
            // }
          });
          setOption(options);
        }
      });
    }
    // }
}, []);
  

const newBankScheme = Yup.object().shape({
  bankId: Yup.number(),
  accountNumber: Yup.string().when('bankId', {is: (val) => val > 0, then: Yup.string().required("Required"), otherwise: null}),
  // accountNumber: Yup.string().when('creditSub', {is: true, then: Yup.string().required("Required"), otherwise: null}),
  accountName: Yup.string().when('bankId', {is: (val) => val > 0, then: Yup.string().required("Required"), otherwise: null}),
  // accountName: Yup.string().when('creditSub', {is: true, then: Yup.string().required("Required"), otherwise: null}),
});

const handleIdChange = () => {
  //
};

  const handleAddNew = async () => setModalRight(true);
  // handleAddNe handleOrderBy handleFilterBy handleRefresh

  const handleSubmit = async (inputData) => {
    setIsLoading(true);

    try {
      const req = {
        bankId: inputData.bankId,
        accountName: inputData.accountName,
        accountNumber: inputData.accountNumber
      };
      console.log('signing up');
      console.log(req);

      NewMerchantBank(req).then((response) => {
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
          setMessage(
            'Error occured!'
          );
        }
      }).catch ((et) => {
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
    bankId: 0,
    accountName: '',
    accountNumber: ''
  };

  const closeModal = () => {
    setModalRight(false);
  }


  const fieldData = React.useMemo(
    () => [
      {
        Header: 'Account Name',
        accessor: 'accountName',
        // cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Account Number',
        accessor: 'accountNumber',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Bank',
        accessor: 'bank',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Date Registered',
      //   accessor: 'createdDate',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: 'Role',
      //   accessor: 'role',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      // {
      //   Header: 'Last Login',
      //   accessor: 'lastLoginDate',
      //   // cellClass: 'text-muted  w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: ' ',
        accessor: 'default',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  
  return (
    <>
      <Row>

        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
          <ReactTableDivided 
          // showAdd="false" 
          showAdd={isShowAdd} 
          // showOrderBy="true" 
          // showFilterBy="true" 
          // showRefresh="true" 
          showSearch="true" 
          searchButtonOutline="true" 
          fetchService={GetMerchantBanksService} 
          fieldList={fieldData}
          handleAddNew={handleAddNew}
          pagetitle={<><IntlMessages id="menu.app-users" /> List</>} />{' '}
        </Colxx>
      </Row>


                <Modal
                  isOpen={modalRight}
                  toggle={() => setModalRight(!modalRight)}
                  wrapClassName="modal-right"
                >
                  <ModalHeader>New <IntlMessages id="menu.user" /></ModalHeader>
                  <ModalBody>
            {isSuccess && (<ModalActionStatus
              actionTitle="Success"
              actionMessage="Bank added successfully"
              closeModal={closeModal}
            />)}
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
                validationSchema={newBankScheme}
              >
                {({ errors, touched }) => (
                  <Form>
                      <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="sub-account.bank" />
                      </Label>
                      <Field name="bankId" component={SearchSelect} options={option} handleIdChange={handleIdChange}/>
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
                        name="accountNumber"
                        // validate={validatePhone}
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
                        name="accountName"
                        // validate={validateEmail}
                      />
                      {errors.accountName && touched.accountName && (
                        <div className="invalid-feedback d-block">
                          {errors.accountName}
                        </div>
                      )}
                    </FormGroup>
                                        
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
                      </Button>{'   '}
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
                  <ModalFooter/>
                </Modal>

    </>
  );
};

export default MerchantBank;
