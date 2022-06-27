import React, { useEffect, useState } from 'react';
import moment from "moment";
// import NumberFormat from 'react-number-format';
// import { CardBody, Row, Card, CardTitle, Progress  } from 'reactstrap';
import { CardBody, Row, Card, CardTitle, Table } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';

const SubBccountBeneficiary = ({ transaction, rowData }) => {
  const [beneficiaryListItem, setBeneficiaryListItem] = useState('');

  useEffect(() => {
    const benBo = [];
    if(transaction.length > 0) {
      transaction.forEach(element => { 
        console.log(element);                       
        benBo.push(
        <tr>
          <th scope="row">{element.accountName}</th>
          <td>{element.accountNumber}</td>
          <td>{element.bank}</td>
          <th scope="row">{element.splitValue}</th>
        </tr>)
      })
      setBeneficiaryListItem(benBo);
    }
  }, [transaction])

//   [
//     {
//         "bank": "Remita Demo Bank",
//         "accountName": "Joe James",
//         "accountNumber": "4589652044",
//         "splitValue": 20
//     },
//     {
//         "bank": "Remita Demo Bank",
//         "accountName": "Joe James",
//         "accountNumber": "4589652044",
//         "splitValue": 30
//     }
// ]

// {
//   "id": 1,
//   "subId": "b0x1eUJDeE0xLzEvMTk3MCAxMjowMDowMCBhbQ==",
//   "createdDate": "2022-04-24T12:04:54.6884114",
//   "name": "Go fund me",
//   "settlement": "SPLIT",
//   "merchantId": 1,
//   "isActive": "ACTIVE",
//   "merchantValue": null,
//   "subAccountValue": null,
//   "bankDetails": null,
//   "createdBy": 2,
//   "modifiedBy": 0,
//   "modifiedDate": "0001-01-01T00:00:00"
// }
  
  return (
    <>
      {/* <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.blank-page" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row> */}
      <Row>
        <Colxx xxs="12" className="mb-4 container-fluid">
          <Card>
            <CardBody>
              <CardTitle>{rowData?.name}</CardTitle>
              
              {/* <AlertNotice
                message={message}
                isNotError={isSuccess}
                // isNotError=""
                isError={isError}
                classStyle="form-input"
              /> */}
                <Table borderless>
                  <tbody>
                    <tr>
                      <th scope="row">Created At</th>
                      <th scope="row">{rowData? moment(rowData?.createdDate).format('MMMM Do YYYY, h:mm:ss A') : ""}</th>
                    </tr>
                    <tr>
                      <th scope="row">Settlement Type</th>
                      <td>{rowData?.settlement}</td>
                    </tr>
                    <tr>
                      <th scope="row">Split By</th>
                      <td>{rowData?.splitBy}</td>
                    </tr>
                    <tr>
                      <th scope="row">Beneficiairy(s)</th>
                      {/* <td>{transaction?.merchantTransactionRef}</td> */}
                    </tr>
                    <tr className="separator mb-5 mt-5" />
                    <tr>
                      <th scope="row">Beneficiairy</th>
                      <th scope="row">Account</th>
                      <th scope="row">Bank</th>
                      <th scope="row">Share</th>
                    </tr>
                    {beneficiaryListItem}
                    {/* <tr>
                      <th scope="row">Amount Paid</th>
                      <td><NumberFormat value={parseFloat(transaction?.amountPaid)} displayType='text' thousandSeparator fixedDecimalScale decimalScale={2} prefix='₦' /></td>
                    </tr> */}
                    <tr className="separator mb-5 mt-5" />
                    </tbody>
                </Table>
              
              {/* <Progress value={(5 / 10) * 100} /> */}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </>
  );
};

export default SubBccountBeneficiary;
