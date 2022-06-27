import React from 'react';
import moment from "moment";
import NumberFormat from 'react-number-format';
// import { CardBody, Row, Card, CardTitle, Progress  } from 'reactstrap';
import { CardBody, Row, Card, CardTitle, Table } from 'reactstrap';
// import IntlMessages from 'helpers/IntlMessages';
import { Colxx } from 'components/common/CustomBootstrap';
// import Breadcrumb from 'containers/navs/Breadcrumb';

const TransactionDetails = ({ transaction }) => {

//   {
//     "transactionId": "25e436c56fc3489692f79884b690eabd",
//     "transactionRef": "200008267305",
//     "merchantTransactionRef": "73618046",
//     "status": "success",
//     "customerName": "jayjus bolo",
//     "customerEmail": "jay.jus@joe.com",
//     "customerPhone": "+2348012345678",
//     "transactionChannel": "WEB",
//     "amountPaid": 1000,
//     "transactionDate": "0001-01-01T00:00:00",
//     "splitStatus": null,
//     "merchantAmount": 0,
//     "subAccountAmount": 0,
//     "subAccountName": null,
//     "icadFee": 0,
//     "customerIpAddress": null
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
              <CardTitle>Transaction Details</CardTitle>
              
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
                      <th scope="row">{transaction?.transactionChannel}</th>
                      <th scope="row">{moment(transaction?.transactionDate).format('MMMM Do YYYY, h:mm:ss A')}</th>
                    </tr>
                    <tr>
                      <th scope="row">Transaction ID</th>
                      <td>{transaction?.transactionId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Transaction Ref</th>
                      <td>{transaction?.transactionRef}</td>
                    </tr>
                    <tr>
                      <th scope="row">Merchant Transaction Ref.</th>
                      <td>{transaction?.merchantTransactionRef}</td>
                    </tr>
                    <tr className="separator mb-5 mt-5" />
                    <tr>
                      <th scope="row">Customer Name</th>
                      <td>{transaction?.customerName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Customer Email</th>
                      <td>{transaction?.customerEmail}</td>
                    </tr>
                    <tr>
                      <th scope="row">Customer Phone</th>
                      <td>{transaction?.customerPhone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Amount Paid</th>
                      <td><NumberFormat value={parseFloat(transaction?.amountPaid)} displayType='text' thousandSeparator fixedDecimalScale decimalScale={2} prefix='₦' /></td>
                    </tr>
                    {/* <tr>
                      <th scope="row">Transaction Date</th>
                      <td>{transaction?.transactionDate}</td>
                    </tr> */}
                    <tr className="separator mb-5 mt-5" />
                    <tr>
                      <th scope="row">Split Payment</th>
                      <td>{transaction?.splitStatus ? "YES" : "No"}</td>
                    </tr>

                    <tr>
                      <th scope="row">Merchant Gets</th>
                      <td><NumberFormat value={parseFloat(transaction?.merchantAmount)} displayType='text' thousandSeparator fixedDecimalScale decimalScale={2} prefix='₦' /></td>
                    </tr>
                    <tr>
                      <th scope="row">Sub Account Gets</th>
                      <td><NumberFormat value={parseFloat(transaction?.subAccountAmount)} displayType='text' thousandSeparator fixedDecimalScale decimalScale={2} prefix='₦' /></td>
                    </tr>
                    <tr>
                      <th scope="row">Sub Account Name</th>
                      <td>{transaction?.subAccountName ? transaction?.subAccountName : "N/A"}</td>
                    </tr>
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

export default TransactionDetails;
