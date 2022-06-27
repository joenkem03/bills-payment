import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { DoughnutChart } from 'components/charts';

import { idoughnutChartData } from 'data/charts';

const IncomeCategoriesDoughnut = () => {
  return (
    <Card className="h-100">
      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.income-categories" />
        </CardTitle>
        <div className="dashboard-donut-chart">
          <DoughnutChart shadow data={idoughnutChartData} />
        </div>
      </CardBody>
    </Card>
  );
};

export default IncomeCategoriesDoughnut;
