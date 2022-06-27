/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable no-plusplus */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  Card,
  CardBody,
  CardTitle,
  Button,
  Row,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Collapse,
  Input,
  InputGroup,
  InputGroupAddon,
  UncontrolledButtonDropdown,
  Label,
  FormGroup,
  Table
} from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
// import classnames from 'classnames';
import LoadingOverlay from 'react-loading-overlay';
import BounceLoader from 'react-spinners/BounceLoader';

import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';
import { Colxx } from 'components/common/CustomBootstrap';

import products from 'data/products';

// function TableR({ columns, data, divided = false, defaultPageSize = 10, fetchData, 
  function TableR({ columns, data, defaultPageSize = 10, fetchData, 
    pageCount: controlledPageCount,
  // showPageSizeOptions = true,
  // showPageJump = false,
  hasActionMenu,
  onDelete,
  onView,
  onEdit,
  // onViewMore,
  // onSearch,
  // showSearch = false,
  showEdit,
  showDelete,
  showView,
  onViewMore,
  doGetTransactionDetails,
  pagination = true,
 }) {
  const {
    // getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      manualPagination: true,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
      pageCount: controlledPageCount,
      autoResetPage: false,
    },
    useSortBy,
    usePagination
  );
  
  useEffect(() => {
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  return (
    <>
      {/* <table 
        {...getTableProps()}
        className={`r-table table ${classnames({ 'table-hover': true, 'table-divided': divided,  })}`}
      > */}
      
      <Table responsive hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()} className="table-hover">
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} onClick={() => doGetTransactionDetails(row.original.id)}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
                
                {hasActionMenu && (
                  <td>
                    {/* <UncontrolledButtonDropdown
                      size="xs"
                      isOpen={false}
                      toggle={() => setDropdownSplitOpen(!dropdownSplitOpen)}
                    > */}
                    <UncontrolledButtonDropdown
                      size="xs"
                      >
                      <div className="btn btn-primary btn-lg pl-4 pr-0">
                        Action
                      </div>
                      <DropdownToggle
                        size="xs"
                        caret
                        color="primary"
                        className="dropdown-toggle-split btn-lg"
                      />
                      <DropdownMenu right>
                        {showView && (
                          <DropdownItem onClick={() => onView(data[rowIndex])}>
                            View
                          </DropdownItem>
                        )}
                        {showEdit && (
                          <DropdownItem onClick={() => onEdit(data[rowIndex].id)}>
                            Activate/Deactivate
                          </DropdownItem>
                        )}
                        {showDelete && (
                          <DropdownItem
                            // onClick={() => onDelete(data[rowIndex])}
                            onClick={() => onDelete(data[rowIndex].id)}
                          >
                            Delete
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      {/* </table> */}
      </Table>

      {pagination && (
      <DatatablePagination
        page={pageIndex}
        pages={pageCount}
        canPrevious={canPreviousPage}
        canNext={canNextPage}
        pageSizeOptions={[4, 10, 20, 30, 40, 50]}
        showPageSizeOptions
        showPageJump
        defaultPageSize={pageSize}
        onPageChange={(p) => gotoPage(p)}
        onPageSizeChange={(s) => setPageSize(s)}
        paginationMaxSize={pageCount}
      />
      )}
      {!pagination && (
        <Row>
          <Colxx xxs="12">
            <Button
              color="primary"
              size="s"
              className="mb-2"
              onClick={() => {
                if (onViewMore != null) onViewMore();
              }}
            >
              View More Transactions
            </Button>
          </Colxx>
        </Row>
      )}
    </>
  );
}

export const ReactTableWithPaginationCard = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );

  return (
    <Card className="mb-4">
      <CardBody>
        <CardTitle>
          <IntlMessages id="table.react-pagination" />
        </CardTitle>
        <Table columns={cols} data={products} />
      </CardBody>
    </Card>
  );
};

export const ReactTableDivided = ({
  showAdd,
  handleAddNew,
  showOrderBy,
  showFilterBy,
  showRefresh,
  showSearch,
  searchButtonOutline,
  handleOrderBy,
  // handleFilterBy,
  handleRefresh,
  handleChangeSearch,
  handleSearch,
  fetchService,
  fieldList,
  pagetitle,
  hasActionMenu = false,
  onDelete,
  onView,
  onEdit,
  // onViewMore,
  // onSearch,
  // showSearch = false,
  showEdit = false,
  showDelete = false,
  showView,
  // pagination = true,
  doGetTransactionDetails
}) => {
  const [displayOptionsIsOpen, setDisplayOptionsIsOpen] = useState(false);
  // const [orderOptions, setOrderOptions] = useState([
  //   { label: "Transaction Date -ASC" },
  //   { label: "Transaction Date -DSC" },
  // ]);
  const [orderOptions] = useState([
    { label: 'Transaction Date -ASC' },
    { label: 'Transaction Date -DSC' },
  ]);
  // const [selectedOrderOption, setSelectedOrderOption] = useState({
  //   label: "Transaction Date -ASC",
  // });
  const [selectedOrderOption] = useState({
    label: 'Transaction Date -ASC',
  });
  // const [filterOptions, setFilterOptions] = useState([
  //   { label: "Batch Number" },
  //   { label: "Status" },
  // ]);
  // const [filterOptions] = useState([
  //   { label: 'Batch Number' },
  //   { label: 'Status' },
  // ]);
  // const [selectedFilterOption, setSelectedFilterOption] = useState({
  //   label: "Batch Number",
  // });
  const [selectedFilterOption] = useState({
    label: 'Batch Number',
  });

  const [pageCount, setPageCount] = useState(0);
  const fetchIdRef = useRef(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  
  const start = new Date();
  const threeMonths = start.getMonth() - 3;

  const threeMonthsBack = start;
  threeMonthsBack.setMonth(threeMonths);
  threeMonthsBack.setDate(1);


  const fetchData = useCallback(async ({ pageSize, pageIndex }) => {
  // useCallback(async ({ pageSize, pageIndex }) => {
    const fetchId = ++fetchIdRef.current;
    setIsLoading(true);
    if (fetchId === fetchIdRef.current) {
      const response = await fetchService({
        pageSize,
        pageIndex: pageIndex + 1,
        id: 0,
        startDate: threeMonthsBack,
        endDate: new Date(),
        // token: token,
        // status: parcelStatus
      });
      setData(response?.data?.data ?? []);
      // setPageCount(response?.pageCount ?? 0);
      setPageCount(response?.data?.totalPages ?? 0);
      setIsLoading(false);
    }
  }, []);


  // const cols = React.useMemo(
  //   () => [
  //     {
  //       Header: 'Name',
  //       accessor: 'title',
  //       cellClass: 'list-item-heading w-40',
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: 'Sales',
  //       accessor: 'sales',
  //       cellClass: 'text-muted  w-10',
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: 'Stock',
  //       accessor: 'stock',
  //       cellClass: 'text-muted  w-10',
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //     {
  //       Header: 'Category',
  //       accessor: 'category',
  //       cellClass: 'text-muted  w-40',
  //       Cell: (props) => <>{props.value}</>,
  //     },
  //   ],
  //   []
  // );

  
  
  const cols = fieldList;

  // const [filterOptions] = useState([cols]);

  return (
    <div className="mb-4">
      <Card>
        <CardBody>
          <CardTitle className="d-block d-md-inline-block pt-1">
            {/* <IntlMessages id="table.divided" /> */}
            {/* <h1>{pagetitle}</h1> */}
            <h3>{pagetitle}</h3>
          </CardTitle>
          <CardTitle>
            <Row>
              <Colxx xxs="12">
                <div className="d-block d-md-inline-block pt-1">
                  {/* <h1>ccccccccc</h1> */}
                </div>
                {showAdd && (
                  <div className="float-md-right pt-1">
                    <Button
                      color="primary"
                      className="mb-2"
                      onClick={handleAddNew}
                    >
                      Add New
                    </Button>
                  </div>
                )}
              </Colxx>
            </Row>
            {(showOrderBy || showFilterBy || showRefresh) && (
              <Row>
                <Colxx xxs="12">
                  <div>
                    <Button
                      color="empty"
                      className="pt-0 pl-0 d-inline-block d-md-none"
                      onClick={() =>
                        setDisplayOptionsIsOpen(!displayOptionsIsOpen)
                      }
                    >
                      Table Menu
                      <i className="simple-icon-arrow-down align-middle" />
                    </Button>
                    <Collapse
                      isOpen={displayOptionsIsOpen}
                      className="d-md-block"
                      id="displayOptions"
                    >
                      {showOrderBy && (
                        <div className="d-block d-md-inline-block pt-1">
                          <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                            <DropdownToggle
                              caret
                              color="outline-dark"
                              size="xs"
                            >
                              orderby:&nbsp;
                              {selectedOrderOption.label}
                            </DropdownToggle>
                            <DropdownMenu>
                              {orderOptions.map((order, index) => {
                                return (
                                  <DropdownItem
                                    key={index}
                                    onClick={() => handleOrderBy(order)}
                                  >
                                    {order.label}
                                  </DropdownItem>
                                );
                              })}
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      )}
                      {showFilterBy && (
                        <div className="d-block d-md-inline-block pt-1">
                          <UncontrolledDropdown className="mr-1 float-md-left btn-group mb-1">
                            <DropdownToggle
                              caret
                              color="outline-dark"
                              size="xs"
                            >
                              filterby:&nbsp;
                              {selectedFilterOption.label}
                            </DropdownToggle>
                            <DropdownMenu>
                              {/* {filterOptions.map((filter, index) => {
                                return (
                                  <DropdownItem
                                    key={index}
                                    onClick={() => handleFilterBy(filter)}
                                  >
                                    {filter.label}
                                  </DropdownItem>
                                );
                              })} */}

                              

                  <Card>
                    <CardBody>
                      <Formik
                        initialValues={{ name: '', email: '', message: '' }}
                        onSubmit={() => console.log('submit')}
                        // validationSchema={registerScheme}
                      >
                        {() => (
                          <Form>
                            <Row>
                              <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label  mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.first-name" /> */}
                                    Full Name
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="name"
                                    placeholder="Full Name"
                                  />
                                </FormGroup>
                              </Colxx>
                              <Colxx xxs="6">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.email" /> */}
                                    Email
                                  </Label>
                                  <Field
                                    className="form-control"
                                    name="email"
                                    placeholder="Email"
                                  />
                                </FormGroup>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx xxs="12">
                                <FormGroup className="form-group has-float-label mb-4">
                                  <Label>
                                    {/* <IntlMessages id="user.first-name" /> */}
                                    Message
                                  </Label>
                                  <Field
                                    as="textarea"
                                    className="form-control"
                                    name="message"
                                    placeholder="Message"
                                  />
                                </FormGroup>
                              </Colxx>
                            </Row>
                            <Row>
                              <Colxx xxs="12">
                                <div className="text-center mb-3">
                                  <a
                                    className="btn btn-secondary btn-xl"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href="{buyUrl}"
                                  >
                                    SUBMIT
                                  </a>
                                </div>
                              </Colxx>
                            </Row>
                          </Form>
                        )}
                      </Formik>
                    </CardBody>
                  </Card>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </div>
                      )}
                      {showRefresh && (
                        <div className="float-md-right pt-1">
                          <Button
                            outline
                            color="primary"
                            size="xs"
                            className="mb-2"
                            onClick={handleRefresh}
                          >
                            Refresh
                          </Button>
                        </div>
                      )}
                    </Collapse>
                  </div>
                </Colxx>
              </Row>
            )}
          </CardTitle>
          {showSearch && (
            <div className="row">
              <div className="col-12">
                <InputGroup className="mb-3">
                  <Input
                    placeholder="...Search..."
                    style={{ fontSize: '20px' }}
                    onChange={handleChangeSearch}
                  />
                  <InputGroupAddon addonType="append">
                    <Button
                      outline={searchButtonOutline}
                      color="secondary"
                      onClick={handleSearch}
                    >
                      <i className="simple-icon-magnifier" />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          )}

          <LoadingOverlay
            active={isLoading}
            spinner={<BounceLoader />}
            // spinner
            // text='..Loading data Please wait...'
            // styles={{
            //   overlay: (base) => ({
            //     ...base,
            //     background:
            //       theme === 'dark'
            //         ? 'rgba(0, 0, 0, 0.7)'
            //         : 'rgba(255, 255, 255, 0.7)',
            //   }),
            //   content: (base) => ({
            //     ...base,
            //     color:
            //       theme === 'dark'
            //         ? 'rgba(255, 255, 255, 1)'
            //         : 'rgba(0, 0, 0, 1)',
            //   }),
            //   spinner: (base) => ({
            //     ...base,
            //     width: '100px',
            //     '& svg circle': {
            //       stroke: '#1d477a',
            //     },
            //   }),
            // }}
            // 
            // styles={{
            //   overlay: (base) => ({
            //     ...base,
            //     background: 'rgba(255, 0, 0, 0.5)'
            //   })
            // }}
            styles={{
              overlay: (base) => ({
                ...base,
                background: "rgba(255, 255, 255, 0.7)",
              }),
              content: (base) => ({
                ...base,
                color: "rgba(0, 0, 0, 1)",
              }),
              // spinner: (base) => ({
              //   ...base,
              //   width: "100px",
              //   "& svg circle": {
              //     stroke: "#1d477a",
              //   },
              // }),              
              // spinner: <BounceLoader />
            }}
          >
            <TableR columns={cols} data={data} fetchData={fetchData} divided pageCount={pageCount}
  // showPageSizeOptions = true,
  // showPageJump = false,
  hasActionMenu = {hasActionMenu}
  onDelete = {onDelete}
  onView = {onView}
  onEdit = {onEdit}
  // onViewMore,
  // onSearch,
  // showSearch = false,
  showEdit = {showEdit}
  showDelete = {showDelete}
  showView = {showView}
  // pagination = {true}
  doGetTransactionDetails={doGetTransactionDetails}
   />
          </LoadingOverlay>
        </CardBody>
      </Card>
    </div>
  );
};
