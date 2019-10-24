import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';
import AdminPrivateRoute from '../../../../hoc/privateRoute/adminPrivateRoute';
import ProgressBar from '../../../Layout/ProgressBar/ProgressBar';
import Register from './Register/Register';
import CreateProduct from './CreateProduct/CreateProduct';
import FormConfirm from './FormConfirm/FormConfirm';
import FormSuccess from './FormSuccess/FormSuccess';
import { resetRegisterState } from '../../../../redux/actions/register';
class dashboardSell extends Component {
  componentWillUnmount() {
    const { resetRegisterState } = this.props;
    resetRegisterState();
  }
  render() {
    const { stage } = this.props;
    const routes = (
      <React.Fragment>
        <Switch>
          <AdminPrivateRoute
            path="/dashboard/sell"
            exact
            component={Register}
          />
          <AdminPrivateRoute
            path="/dashboard/sell/createproduct"
            component={CreateProduct}
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
        <ProgressBar stage={stage} />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.register.user,
    item: state.sell.product,
    stage: state.sell.stage,
  };
};

export default connect(
  mapStateToProps,
  { resetRegisterState },
)(dashboardSell);
