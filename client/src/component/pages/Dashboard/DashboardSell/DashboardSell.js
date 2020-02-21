import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import TokenCheck from '../../../../hoc/privateRoute/TokenCheck';
import ProgressBar from '../../../Layout/ProgressBar/ProgressBar';
import CustomerCreate from './CustomerCreate/CustomerCreate';
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
          <Route path="/dashboard/sell" exact component={CustomerCreate} />
          <Route
            path="/dashboard/sell/createproduct"
            component={CreateProduct}
          />
          <Route path="/dashboard/sell/formconfirm" component={FormConfirm} />
          <Route path="/dashboard/sell/formsuccess" component={FormSuccess} />
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
    customer: state.customer.customer,
    item: state.sell.product,
    stage: state.sell.stage,
  };
};

export default connect(
  mapStateToProps,
  { resetRegisterState },
)(dashboardSell);
