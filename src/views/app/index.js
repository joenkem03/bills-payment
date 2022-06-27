import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';
// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const AppHome = React.lazy(() =>
  import(/* webpackChunkName: "viwes-app" */ './app-home')
);
const AppHomeX = React.lazy(() =>
  import(/* webpackChunkName: "viwes-app" */ './dashboards')
);
const Merchants = React.lazy(() =>
  import(/* webpackChunkName: "views-app-merchants" */ './merchants')
);
const SubMerchant = React.lazy(() =>
  import(/* webpackChunkName: "views-app-submerchants" */ './sub-accounts')
);
const AdminUsersList = React.lazy(() =>
  import(/* webpackChunkName: "views-app-admin-user-list" */ './admin-user-list')
);
const CustomersList = React.lazy(() =>
  import(/* webpackChunkName: "views-app-user-list" */ './customer-list')
);
const UsersList = React.lazy(() =>
  import(/* webpackChunkName: "views-app-user-list" */ './user-list')
);
const Wallet = React.lazy(() =>
  import(/* webpackChunkName: "views-app-wallet-balance" */ './wallet-balance')
);
const RemitaSettlement = React.lazy(() =>
  import(/* webpackChunkName: "views-app-remita-settlement" */ './remita-settlement')
);
const InwardTransactions = React.lazy(() =>
  import(/* webpackChunkName: "views-app-inward" */ './inward-transaction-list')
);
const OutwardTransactions = React.lazy(() =>
  import(/* webpackChunkName: "views-app-outward" */ './outward-transaction-list')
);
const MerchantSettings = React.lazy(() =>
  import(/* webpackChunkName: "views-app-merchants-settings" */ './merchant-settings')
);
const UserProfile = React.lazy(() =>
  import(/* webpackChunkName: "views-app-profile" */ './profile')
);
const ViewFiles = React.lazy(() =>
  import(/* webpackChunkName: "views-files-view" */ './view-file')
);
const Gogo = React.lazy(() =>
  import(/* webpackChunkName: "viwes-gogo" */ './gogo')
);
const SecondMenu = React.lazy(() =>
  import(/* webpackChunkName: "viwes-second-menu" */ './second-menu')
);
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "viwes-blank-page" */ './blank-page')
);
const Tables = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './tables')
);
const Modals = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './modal')
);
const Navi = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './navigation')
);
// const Navi = React.lazy(() =>
//   import(/* webpackChunkName: "components-tables" */ './components')
// );
const Forms = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './components')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
            <Route
              path={`${match.url}/home`}
              render={(props) => <AppHome {...props} />}
            />
            <Route
              path={`${match.url}/xhome`}
              render={(props) => <AppHomeX {...props} />}
            />
            <Route
              path={`${match.url}/profile`}
              render={(props) => <UserProfile {...props} />}
            />
            <Route
              path={`${match.url}/merchants`}
              render={(props) => <Merchants {...props} />}
            />
            <Route
              path={`${match.url}/sub-accounts`}
              render={(props) => <SubMerchant {...props} />}
            />
            <Route
              path={`${match.url}/admin-users`}
              render={(props) => <AdminUsersList {...props} />}
            />
            <Route
              path={`${match.url}/customers`}
              render={(props) => <CustomersList {...props} />}
            />
            <Route
              path={`${match.url}/users`}
              render={(props) => <UsersList {...props} />}
            />
            <Route
              path={`${match.url}/wallet`}
              render={(props) => <Wallet {...props} />}
            />
            <Route
              path={`${match.url}/settled-transactions`}
              render={(props) => <RemitaSettlement {...props} />}
            />
            <Route
              path={`${match.url}/out-payments`}
              render={(props) => <OutwardTransactions {...props} />}
            />
            <Route
              path={`${match.url}/transactions`}
              render={(props) => <InwardTransactions {...props} />}
            />
            <Route
              path={`${match.url}/settings`}
              render={(props) => <MerchantSettings {...props} />}
            />
            <Route
              path={`${match.url}/documents/*`}
              render={(props) => <ViewFiles {...props} />}
            />
            {/* <Route
              path={`${match.url}/merchants`}
              render={(props) => <Merchants {...props} />}
            /> */}
            <Route
              path={`${match.url}/gogo`}
              render={(props) => <Gogo {...props} />}
            />
            <Route
              path={`${match.url}/second-menu`}
              render={(props) => <SecondMenu {...props} />}
            />
            {/* <ProtectedRoute
                    path={`${match.url}/second-menu`}
                    component={SecondMenu}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Route
              path={`${match.url}/tables`}
              render={(props) => <Tables {...props} />}
            />
            <Route
              path={`${match.url}/modals`}
              render={(props) => <Modals {...props} />}
            />
            <Route
              path={`${match.url}/nav`}
              render={(props) => <Navi {...props} />}
            />
            <Route
              path={`${match.url}/forms`}
              render={(props) => <Forms {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
