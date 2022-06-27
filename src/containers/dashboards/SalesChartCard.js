import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  // DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

// import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';

import { ThemeColors } from 'helpers/ThemeColors';

// import { lineChartData } from 'data/charts';

const SalesChartCard = ({chartData, label}) => {
  // const [showGraph, setShowGraph] = useState('');
  // console.log(chartData);
const colors = ThemeColors();

// const dataLabel = [];
const dataLabel = label;
// const dataValue = [];
const dataValue = chartData;

    
// useEffect(() => {
//   console.log(chartData);
//   // let i = 1;
//   // if(data.length > 0){
//   // // if(data.length !== null){
//   //   data.forEach(element => {
//   //     console.log(element);
//   //     // if (i < 7) {
//   //       dataLabel.push(element.date);
//   //       dataValue.push(element.amount);
//   //     // }
//   //     // i++;
//   //   })
//   // };

  

// const lineChartData = {
//   // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   labels: dataLabel,
//   datasets: [
//     {
//       label: '',
//       // data: [54, 63, 60, 65, 60, 68, 60],
//       data: dataValue,
//       borderColor: colors.themeColor1,
//       pointBackgroundColor: colors.foregroundColor,
//       pointBorderColor: colors.themeColor1,
//       pointHoverBackgroundColor: colors.themeColor1,
//       pointHoverBorderColor: colors.foregroundColor,
//       pointRadius: 6,
//       pointBorderWidth: 2,
//       pointHoverRadius: 8,
//       fill: true,
//     },
//   ],
// };

// console.log(dataLabel);

    
// if (chartData.length > 0) {
//   // setShowGraph(<Line shadow data={lineChartData} />);
//   setShowGraph(<LineChart shadow data={lineChartData} />);
// };

// },[chartData])


  

const lineChartData = {
  // labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  labels: dataLabel,
  datasets: [
    {
      label: '',
      // data: [54, 63, 60, 65, 60, 68, 60],
      data: dataValue,
      borderColor: colors.themeColor1,
      pointBackgroundColor: colors.foregroundColor,
      pointBorderColor: colors.themeColor1,
      pointHoverBackgroundColor: colors.themeColor1,
      pointHoverBorderColor: colors.foregroundColor,
      pointRadius: 6,
      pointBorderWidth: 2,
      pointHoverRadius: 8,
      fill: true,
    },
  ],
};

  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <UncontrolledDropdown>
          <DropdownToggle color="" className="btn btn-header-light icon-button">
            <i className="simple-icon-refresh" />
          </DropdownToggle>
          <DropdownMenu right>
            {/* <DropdownItem>
              <IntlMessages id="dashboards.sales" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="dashboards.orders" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="dashboards.refunds" />
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
      <CardBody>
        <CardTitle>
          {/* <IntlMessages id="dashboards.sales" /> */}
          Transactions
        </CardTitle>
        <div className="dashboard-line-chart">
          <LineChart shadow data={lineChartData} />
          {/* {showGraph} */}
        </div>
      </CardBody>
    </Card>
  );
};

export default SalesChartCard;
