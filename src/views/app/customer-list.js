
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */

import React from 'react';
import { Row, } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import {
  // ReactTableWithPaginationCard,
  ReactTableDivided,
} from 'containers/ui/iReactTableCards';
import {GetAllCustomers} from 'services/ProtectedService';
// import { UserRole } from '../../constants/defaultValues';
// import { getCurrentUser } from '../../helpers/Utils';

const CustomerList = ({ match }) => {

  // const currentUser = getCurrentUser();
  // const currentRole = currentUser.role;
  // const isShowAdd = currentRole === UserRole.Merchant;
  

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
          <Breadcrumb heading="menu.customers" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          {/* <p>
            <IntlMessages id="menu.customers" />
          </p> */}
        </Colxx>
        {/* <Colxx xxs="12">
          <h3 className="mb-4">
            <IntlMessages id="menu.customers" /> List
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
          fetchService={GetAllCustomers} 
          fieldList={fieldData}
          // handleAddNew={handleAddNew}
          pagetitle={<><IntlMessages id="menu.customers" /> List</>} />{' '}
        </Colxx>
      </Row>

    </>
  );
};

export default CustomerList;
