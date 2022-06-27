
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React, {useState} from 'react';
import moment from "moment";
import NumberFormat from 'react-number-format';
import { Row} from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  // ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/tReactTableCards';
import {GetTransactions, GetTransactionDetails} from 'services/ProtectedService';
import TransactionDetails from './transaction-details';
// import { UserRole } from '../../constants/defaultValues';
// import { getCurrentUser } from '../../helpers/Utils';

const InwardTransactionList = ({ match }) => {

  const [tableDiv, setTableDiv] = useState("12");
  const [detailDiv, setDetailDiv] = useState("0");
  const [transactionData, setTransactionData] = useState(null);
  const [detailDisplay, setDetailDisplay] = useState("none");

  // const currentUser = getCurrentUser();
  // const currentRole = currentUser.role;
  // const isShowAdd = currentRole === UserRole.Merchant;
  

  const handleFilterBy = async (e) => {
    // setSelectedFilterOption(e);
    // setIsLoading(true);
    // const response = await api.getAllTransactions({
    //   pageSize: defaultPageSize,
    //   pageIndex: 1,
    // });
    // setData(response?.data ?? []);
    // setPageCount(response?.pageCount ?? 0);
    // setIsLoading(false);
    console.log(`filterer ${e}`);
  };
  

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

const doGetTransactionDetails = (e) => {
  console.log(e);
  setTableDiv("8");
  setDetailDiv("4");
  GetTransactionDetails({tId: 0, sId: 0, zId: e, status: true}).then((res) => {
    console.log(res);
    setTransactionData(res.data);
    setDetailDisplay("block");
  });
}


  const fieldData = React.useMemo(
    () => [
      {
        Header: 'Amount Paid',
        accessor: 'amountPaid',
        // cellClass: 'list-item-heading w-40',
        // Cell: (props) => <>{props.value}</>,
        Cell: (props) => <><NumberFormat value={parseFloat(props.value)} displayType='text' thousandSeparator fixedDecimalScale decimalScale={2} prefix='₦' /></>,
        // Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Name',
      //   accessor: 'name',
      //   // cellClass: 'list-item-heading w-40',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: 'Payment From',
        accessor: 'customerEmail',
        // cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: 'Phone',
      //   accessor: 'phone',
      //   // cellClass: 'text-muted  w-10',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: 'Payment Reference',
        accessor: 'transactionRef',
        // cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Payment Date',
        accessor: 'transactionDate',
        // cellClass: 'text-muted  w-40',
        // Cell: (props) => <>{moment(props.value).format('MMMM d, YYYY')}</>,
        Cell: (props) => <>{moment(props.value).format('MMMM Do YYYY, h:mm:ss A')}</>,
      },
      {
        Header: 'Payment Status',
        accessor: 'status',
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
  
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.transactions" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        {/* <Colxx xxs="12" className="mb-4">
          <p>
            <IntlMessages id="menu.transactions" />
          </p>
        </Colxx> */}
        {/* <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="menu.transactions" /> List
          </h3>
        </Colxx> */}
{/* 
        <Colxx xxs="12">
          <ReactTableWithPaginationCard />
        </Colxx> */}
        {console.log(tableDiv)}
        <Colxx xxs="12" md="12" sm="12" xs="12" lg={tableDiv} xl={tableDiv} xxl={tableDiv}>
          <ReactTableDivided 
          // showAdd="false" 
          // showAdd={isShowAdd} 
          // showOrderBy="true" 
          showFilterBy="true" 
          // showRefresh="true" 
          showSearch="true" 
          searchButtonOutline="true" 
          fetchService={GetTransactions} 
          fieldList={fieldData}
          handleFilterBy={handleFilterBy}
          // handleAddNew={handleAddNew}
          pagetitle={<><IntlMessages id="menu.transactions" /> List</>}
          doGetTransactionDetails={doGetTransactionDetails} />{' '}
        </Colxx>
        <Colxx xxs="12" md="12" sm="12" xs="12" lg={detailDiv} xl={detailDiv} xxl={detailDiv} style={{ display: detailDisplay }}>
          <TransactionDetails transaction={transactionData} />
        </Colxx>
      </Row>

    </>
  );
};

export default InwardTransactionList;
