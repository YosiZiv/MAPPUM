import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import AdminPrivateRoute from '../../../../hoc/privateRoute/adminPrivateRoute';
import ProgressBar from '../../../Layout/ProgressBar/ProgressBar';
import Register from './Register/Register';
import DashboardCreateItem from './CreateItem/CreateItem';
import FormConfirm from './FormConfirm/FormConfirm';
import FormSuccess from './FormSuccess/FormSuccess';

class dashboardSell extends Component {
  render() {
    // const { stage } = this.state;
    const routes = (
      <React.Fragment>
        <Switch>
          <AdminPrivateRoute
            path="/dashboard/sell"
            exact
            component={Register}
          />
          <AdminPrivateRoute
            path="/dashboard/sell/createitem"
            component={DashboardCreateItem}
          />
          <AdminPrivateRoute
            path="/dashboard/sell/formconfirm"
            component={FormConfirm}
          />
          <AdminPrivateRoute
            path="/dashboard/sell/formsuccess"
            component={FormSuccess}
          />
        </Switch>
      </React.Fragment>
    );
    return (
      <div className="SellContainer">
        <ProgressBar />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.register.user,
    item: state.sell.product,
  };
};

export default connect(
  mapStateToProps,
  null,
)(dashboardSell);
