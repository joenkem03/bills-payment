import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Row , Card, CardBody} from 'reactstrap';
import NumberFormat from 'react-number-format';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
// import ProfileStatuses from 'containers/dashboards/ProfileStatuses';
import SortableStaticticsRow from 'containers/dashboards/SortableStaticticsRow';
// import SmallLineCharts from 'containers/dashboards/SmallLineCharts';
import SalesChartCard from 'containers/dashboards/SalesChartCard';
import IconCard from 'components/cards/IconCard';
import { GetLineChartService, GetUnSumService, GetWalletBalance } from 'services/ProtectedService';

// import ProductCategoriesDoughnut from 'containers/dashboards/ProductCategoriesDoughnut';
// import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
// import ConversionRatesChartCard from 'containers/dashboards/ConversionRatesChartCard';
// import OrderStockRadarChart from 'containers/dashboards/OrderStockRadarChart';
// import ProductCategoriesPolarArea from 'containers/dashboards/ProductCategoriesPolarArea';

const DashboardAnalytics = ({ intl, match }) => {
  const [unSettled, setUnSettled] = useState(0);
  const [balance, setBalance] = useState(0);
  // const [chartData, setChartData] = useState([]);
  const [chartDataSize, setChartDataSize] = useState(0);
  // const [chartLabel, setChartLabel] = useState([]);
  const [showGraph, setShowGraph] = useState('');
  useEffect(() => {
  
    const start = new Date();

    start.setMonth(-3);
    start.setDate(1);
    
    const end = new Date();
    

    GetUnSumService().then((ret) => setUnSettled(ret.data.unsettledSum));
    
    GetWalletBalance(0).then((res) => {
      console.log(res);
      if (res?.data) {
        // {"balance":1.00,"previousBalance":0.00,"lastTransactionAmount":1.00,"lastTransactionDate":"2022-01-25T23:38:16"}
        setBalance(res.data.balance);
        // setPreviousBalance(res.data.previousBalance);
        // setLastTransAmnt(res.data.lastTransactionAmount);
        // setLastTransDate(res.data.lastTransactionDate);
        // setTransType(res.data.transactionType)
      }
    }).catch();

    GetLineChartService({startDate: start, endDate: end}).then((ret) => {
      console.log(ret.data.length);
      // setChartData(ret.data);
      
const dataLabel = [];
const dataValue = [];
  // let i = 1;
  if(ret.data.length > 0){
    setChartDataSize(ret.data.length);
    // if(data.length !== null){
      ret.data.forEach(element => {
        console.log(element);
        // if (i < 7) {
          dataLabel.push(element.date);
          dataValue.push(element.amount);
        // }
        // i++;
      })
      // setChartData(dataValue);
      // setChartLabel(dataLabel);

      setShowGraph(<SalesChartCard chartData={dataValue} label={dataLabel}/>)

    };
    });
  }, [chartDataSize])
  const { messages } = intl;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.analytics" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      
      
      <Row>
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="9" xl="9" xxl="9" className="mb-4">
          {/* <SalesChartCard chartData={chartData} label={chartLabel}/> */}
          {showGraph}
        </Colxx>
        <Colxx xxs="12" md="12" sm="12" xs="12" lg="3" xl="3" xxl="3" className="mb-4">          
      <Card>
        <CardBody>
          {/* <CardTitle>
            <IntlMessages id="dashboards.logs" />
          </CardTitle> */}
          {/* <div className="dashboard-list-with-user">    */}
          <IconCard icon="simple-icon-arrow-down-circle" title="transaction sum" value={
        <NumberFormat
          value={parseFloat(unSettled)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        />} className="mb-4" />
          <IconCard icon="simple-icon-wallet" title="menu.wallet-balance" value={
        <NumberFormat
          value={parseFloat(balance)}
          displayType="text"
          thousandSeparator
          fixedDecimalScale
          decimalScale={2}
          prefix="NGN"
        />} className="mb-4" />
          {/* </div> */}
          </CardBody>
      </Card>
     
        </Colxx>
      </Row>
      
      <SortableStaticticsRow messages={messages} />
    </>
  );
};
export default injectIntl(DashboardAnalytics);
