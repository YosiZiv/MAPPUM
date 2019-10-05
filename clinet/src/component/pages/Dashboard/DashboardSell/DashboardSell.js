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
  state = {
    stage: 'register',
  };
  componentDidMount() {
    console.log(window.location.href, window.location.hostname, this.props);
    const host = 'http://localhost:3000/dashboard/sell/';
    if (window.location.href === host) {
      return this.setState({ stage: 'register' });
    }
    if (window.location.href === host + 'createitem') {
      return this.setState({ stage: 'createProduct' });
    }
    if (window.location.href === host + 'formconfirm') {
      return this.setState({ stage: 'submit' });
    }
    if (window.location.href === host + 'formsuccess') {
      return this.setState({ stage: 'formsuccess' });
    }
    return null;
  }
  componentDidUpdate() {
    console.log(window.location.href, window.location.hostname);
    const host = 'http://localhost:3000/dashboard/sell/';
    if (window.location.href === host) {
      return this.setState({ stage: 'register' });
    }
    if (
      window.location.href === host + 'createitem' &&
      this.state.stage !== 'createProduct'
    ) {
      return this.setState({ stage: 'createProduct' });
    }
    if (
      window.location.href === host + 'formconfirm' &&
      this.state.stage !== 'submit'
    ) {
      return this.setState({ stage: 'submit' });
    }
    if (
      window.location.href === host + 'formsuccess' &&
      this.state.stage !== 'success'
    ) {
      return this.setState({ stage: 'success' });
    }
    return null;
  }
  render() {
    console.log(window.location.href);
    const { stage } = this.state;
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
        <ProgressBar stage={stage} />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.register.user,
    item: state.product.product,
  };
};

export default connect(
  mapStateToProps,
  null,
)(dashboardSell);
