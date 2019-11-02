import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminPrivateRoute from './hoc/privateRoute/adminPrivateRoute';
import UserPrivateRoute from './hoc/privateRoute/userPrivateRoute';
import Login from './component/pages/Login/Login';
import Logout from './component/pages/Logout/Logout';
import Dashboard from './component/pages/Dashboard/Dashboard';
import Navigation from './component/Layout/Navigation/Navigation';
import MainPage from './component/pages/MainPage/MainPage';
import { autoLogin } from './redux/actions/auth';
import UserArea from './component/pages/UserArea/UserArea';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }
  render() {
    const routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
        <AdminPrivateRoute path="/dashboard" component={Dashboard} />
        <UserPrivateRoute path="/userarea" component={UserArea} />
      </React.Fragment>
    );

    return (
      <div className="App">
        <Navigation />
        <main>{routes}</main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  admin: state.auth.admin,
  loading: state.ui.loading,
});
export default connect(
  mapStateToProps,
  { autoLogin },
)(App);
