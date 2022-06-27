
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, { useState } from 'react';
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
import {GetAllUsers, NewSubAccount} from 'services/ProtectedService';
import AlertNotice from 'components/common/alert';
import ModalActionStatus from 'components/common/ModalActionStatus';
import { UserRole } from '../../constants/defaultValues';
import { getCurrentUser } from '../../helpers/Utils';

const UserListAlt = () => {
  const [modalRight, setModalRight] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

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

  

const registerScheme = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  // individualOrNon: Yup.string().required("Required"),
  email: Yup.string().required('Required').email('Invalid email'),
  // address: Yup.string().required(),
  phone: Yup.string().required('Required'),
  // mdaId: Yup.number("Please select an MDA").when('role', {is: true, then: Yup.number().min(1, "Please select an MDA").required("Required"), otherwise: null})
  // password: Yup.string().min(6).required(),
});

  const handleAddNew = async () => setModalRight(true);
  // handleAddNe handleOrderBy handleFilterBy handleRefresh

  const handleSubmit = async (inputData) => {
    setIsLoading(true);

    try {
      const req = {
        firstName: inputData.firstName,
        lastName: inputData.lastName,
        phone: inputData.phone,
        email: inputData.email,
      };
      console.log('signing up');
      console.log(req);

      NewSubAccount(req).then((response) => {
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
            'Error occured! Kindly check that email and phone number are not previously registered'
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
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
  };

  const closeModal = () => {
    setModalRight(false);
  }


  const fieldData = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        // cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Email',
        accessor: 'email',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Date Registered',
        accessor: 'createdDate',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Role',
        accessor: 'role',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Last Login',
        accessor: 'lastLoginDate',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
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

        <Colxx xxs="12" md="12" sm="12" xs="12" lg="8" xl="8" xxl="8" className="container-fluid">
          <ReactTableDivided 
          // showAdd="false" 
          showAdd={isShowAdd} 
          // showOrderBy="true" 
          // showFilterBy="true" 
          // showRefresh="true" 
          showSearch="true" 
          searchButtonOutline="true" 
          fetchService={GetAllUsers} 
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
              actionMessage="Account created Successfully. A confirmation link has been sent to your email"
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
                validationSchema={registerScheme}
              >
                {({ errors, touched }) => (
                  <Form>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.first-name" />
                      </Label>
                      <Field
                        className="form-control"
                        name="firstName"
                        // validate={validateEmail}
                      />
                      {errors.firstName && touched.firstName && (
                        <div className="invalid-feedback d-block">
                          {errors.firstName}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.last-name" />
                      </Label>
                      <Field
                        className="form-control"
                        name="lastName"
                        // validate={validateEmail}
                      />
                      {errors.lastName && touched.lastName && (
                        <div className="invalid-feedback d-block">
                          {errors.lastName}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.phone" />
                      </Label>
                      <Field
                        className="form-control"
                        name="phone"
                        // validate={validatePhone}
                      />
                      {errors.phone && touched.phone && (
                        <div className="invalid-feedback d-block">
                          {errors.phone}
                        </div>
                      )}
                    </FormGroup>

                    <FormGroup className="form-group has-float-label  mb-4">
                      <Label>
                        <IntlMessages id="user.email" />
                      </Label>
                      <Field
                        className="form-control"
                        name="email"
                        // validate={validateEmail}
                      />
                      {errors.email && touched.email && (
                        <div className="invalid-feedback d-block">
                          {errors.email}
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

export default UserListAlt;
