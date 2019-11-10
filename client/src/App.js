import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import tokenCheck from './hoc/privateRoute/tokenCheck';
import Login from './component/pages/Login/Login';
import Logout from './component/pages/Logout/Logout';
import Dashboard from './component/pages/Dashboard/Dashboard';
import Navigation from './component/Layout/Navigation/Navigation';
import MainPage from './component/pages/MainPage/MainPage';
import { autoLogin } from './redux/actions/auth';
import './App.css';

class App extends Component {
  componentDidMount() {
    const { autoLogin } = this.props;
    autoLogin();
  }
  render() {
    const { isAuth } = this.props;
    const routes = (
      <React.Fragment>
        <Switch>
          <Route path="/" component={MainPage} exact />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
        </Switch>
        {/* <tokenCheck path="/dashboard" component={Dashboard} /> */}
      </React.Fragment>
    );

    return (
      <div className="App">
        <Navigation isAuth={isAuth} />
        <main>{routes}</main>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
  loading: state.ui.loading,
});
export default connect(
  mapStateToProps,
  { autoLogin },
)(App);
