/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Label,
  FormGroup,
} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import AlertNotice from 'components/common/alert';
import {
  // ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/iReactTableCards';
import {
  GetMerchantsService,
  ConfirmMerchant,
} from 'services/ProtectedService';
// import { UserRole } from '../../constants/defaultValues';
// import { getCurrentUser } from '../../helpers/Utils';

const Merchants = ({ match }) => {
  const [modalBack, setModalBack] = useState(false);
  // const [backdrop, setBackdrop] = useState('static');
  const [backdrop] = useState('static');
  const [viewData, setViewData] = useState([]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  // const currentUser = getCurrentUser();
  // const currentRole = currentUser.role;
  // const isShowAdd = currentRole === UserRole.Merchants;

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

  // const handleAddNew = async () => {};
  // handleAddNe handleOrderBy handleFilterBy handleRefresh

  const onEdit = async (id) => {
    console.log(id);
  };

  const onDelete = async (row) => {
    console.log(row);
  };

  const onView = async (row) => {
    // const viewArray = [];
    // Object.keys(row).forEach(key => {
    //     console.log(key);
    //     viewArray.push(<p>{key}</p>);
    // });
    // for (const key of Object.keys(row)) {
    //   console.log(key);
    //   viewArray.push(<p>{key}</p>);
    // };
    // for (const [key, value] of Object.entries(test)) {
    //   console.log(key, value);
    //   viewArray.push(<p>{key}</p>)
    // }

    // for (const property in row) {
    //   console.log(`${property}: ${row[property]}`);
    //   viewArray.push(<p>{property}</p>)
    // }
    setModalBack(true);
    setViewData(row);
    console.log(row);
  };

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
        Header: 'Fee',
        accessor: 'fee',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Business Reg No',
        accessor: 'regBusinessNo',
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

  const handleSubmit = async (inputData) => {
    setIsLoading(true);
    const req = {
      id: viewData.id,
      isBusinessCertConfirmed: inputData.business,
      isCacCertConfirmed: inputData.cac,
    };

    try {
      ConfirmMerchant(req)
        .then((response) => {
          console.log(response);
          console.log(response.status);
          if (response.status === 200) {
            setIsSuccess(true);
            setIsLoading(false);
          } else{
            // if (response.status === 400) {
            //   setIsLoading(false);
            //   setIsError(true);
            //   setMessage(response.data.data);
            // } else{
              setIsLoading(false);
              setIsError(true);
              console.log(response);
              setMessage('Error occured! ');
            // }
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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.merchants" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {/* <Colxx xxs="12" className="mb-4">
          <p>
            <IntlMessages id="menu.merchants" />
          </p>
        </Colxx> */}
        {/* <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="menu.merchants" /> List
          </h3>
        </Colxx> */}
        {/* 
        <Colxx xxs="12">
          <ReactTableWithPaginationCard />
        </Colxx> */}

        <Colxx xxs="12">
          <ReactTableDivided
            // showAdd="false"
            // showAdd={isShowAdd}
            // showOrderBy="true"
            // showFilterBy="true"
            // showRefresh="true"
            showSearch="true"
            searchButtonOutline="true"
            fetchService={GetMerchantsService}
            fieldList={fieldData}
            pagetitle={
              <>
                <IntlMessages id="menu.merchants" /> List
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
      </Row>
      
            <Modal
              isOpen={modalBack}
              toggle={() => setModalBack(!modalBack)}
              backdrop={backdrop}
            >
              <Formik
                initialValues={{business: viewData.businessStatus, cac: viewData.cacStatus}}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form>
              <ModalHeader>Merchant Details</ModalHeader>
              <ModalBody>
              
              <AlertNotice
                message={message}
                isNotError={isSuccess}
                // isNotError=""
                isError={isError}
                classStyle="form-input"
              />
                <Table borderless>
                  <tbody>
                    <tr>
                      <th scope="row">Name</th>
                      <td>{viewData.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contact Person</th>
                      <td>{viewData.contactName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Address</th>
                      <td>{viewData.address}</td>
                    </tr>
                    <tr>
                      <th scope="row">About Merchant</th>
                      <td>{viewData.about}</td>
                    </tr>
                    <tr>
                      <th scope="row">Fee</th>
                      <td>{viewData.fee}</td>
                    </tr>
                    <tr className="separator mb-5 mt-5" />
                    <tr>
                      <th scope="row">API Key Reset Count</th>
                      <td>{viewData.keyResetCount}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last Key Reset</th>
                      <td>{viewData.lastKeyReset}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last Key Reset By</th>
                      <td>{viewData.apiKeyResetBy}</td>
                    </tr>
                    <tr className="separator mb-5 mt-5" />
                    <tr>
                      <th scope="row">
                    <FormGroup className="form-group">
                      {/* <Label>
                        <IntlMessages id="sub-account.credit-sub" />
                      </Label> */}
                      <Row className="pt-1">
                        <div className="col-8">
                          <Label className="form-input">
                            Verify CAC File :{' '}
                          </Label>
                        </div>
                        <div className="col-2">
                          <Label className="form-input">
                            <Field
                              type="checkbox"
                              name="cac"
                              id="cac"
                              disabled={viewData.cacStatus}
                            />{' '}
                          </Label>
                        </div>
                        <div className="col-2">
                        <Link
                          to={`${
                            viewData.cacCertificate === null ||
                            viewData.cacCertificate === undefined
                              ? '#'
                              : viewData.cacCertificate
                          }`}
                          target="_blank"
                        >
                          {
                            viewData.cacCertificate === null ||
                            viewData.cacCertificate === undefined
                              ? ' '
                              : "File"}
                        </Link>
                        </div>
                      </Row>
                    </FormGroup>
                    <FormGroup className="form-group">
                      {/* <Label>
                        <IntlMessages id="sub-account.credit-sub" />
                      </Label> */}
                      <Row className="pt-1">
                        <div className="col-8">
                          <Label className="form-input">
                            Verify Business File :{' '}
                          </Label>
                        </div>
                        <div className="col-2">
                          <Label className="form-input">
                            <Field
                              type="checkbox"
                              name="business"
                              id="business"
                              disabled={viewData.businessStatus}
                            />{' '}
                          </Label>
                        </div>
                        <div className="col-2">
                        <Link
                          to={`${
                            viewData.businessCertificate === null ||
                            viewData.businessCertificate === undefined
                              ? '#'
                              : viewData.businessCertificate
                          }`}
                          target="_blank"
                        >
                          {viewData.businessCertificate === null ||
                            viewData.businessCertificate === undefined
                              ? ' '
                              : "File"}
                        </Link>
                        </div>
                      </Row>
                    </FormGroup>

                      </th>
                    </tr>
                    {/* <tr>
                      <th scope="row">CAC File</th>
                      <td>
                        <Link
                          to={`${
                            viewData.cacCertificate === null ||
                            viewData.cacCertificate === undefined
                              ? '#'
                              : viewData.cacCertificate
                          }`}
                          target="_blank"
                        >
                          {viewData.cacCertificate}
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Business File</th>
                      <td>
                        <Link
                          to={`${
                            viewData.businessCertificate === null ||
                            viewData.businessCertificate === undefined
                              ? '#'
                              : viewData.businessCertificate
                          }`}
                          target="_blank"
                        >
                          {viewData.BusinessCertificate}
                        </Link>
                      </td>
                    </tr> */}
                    <tr>
                      <th scope="row">Merchant Confirmation</th>
                      <td>{viewData.isMerchantConfirmed}</td>
                    </tr>

                    <tr>
                      <th scope="row">Confirmed By</th>
                      <td>{viewData.confirmedBy}</td>
                    </tr>
                    <tr>
                      <th scope="row">Merchant Status</th>
                      <td>{viewData.isActive}</td>
                    </tr>
                    </tbody>
                </Table>
              </ModalBody>
              <ModalFooter>
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
                      </Button>{' '}
                <Button color="secondary" onClick={() => setModalBack(false)}>
                  Cancel
                </Button>
              </ModalFooter>
                    
                    </Form>
                  )}
                </Formik>
            </Modal>
    </>
  );
};

export default Merchants;
