import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../../axiosApi';
import SaleCard from '../../Layout/SaleCard/SaleCard';
import './UserArea.css';
class UserArea extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      sales: null,
    };
  }
  componentDidMount() {
    const api = axios();
    if (this.props.user) {
      const userId = {
        id: this.props.user.id,
      };
      api
        .post(`/user/getsellforuser`, userId)
        .then(response => {
          const sales = this.updateSale(response.data.sales);
          if (!this.state.sales) {
            return this.setState({ sales });
          }
        })
        .catch(err => {});
    }
  }
  componentDidUpdate() {
    const api = axios();
    if (this.props.user) {
      const userId = {
        id: this.props.user.id,
      };

      api
        .post(`/user/getsellforuser`, userId)
        .then(response => {
          const sales = this.updateSale(response.data.sales);
          if (!this.state.sales) {
            return this.setState({ sales });
          }
        })
        .catch(err => {});
    }
  }
  updateSale = salesData => {
    const sales = salesData.map(sale => {
      return (
        <div className="saleUserCardContainer" key={sale.id}>
          <SaleCard {...sale} />
        </div>
      );
    });

    return sales;
  };
  render() {
    let showUser;
    if (this.props.user) {
      const { user } = this.props;
      showUser = user;
    }

    return (
      <div className="userPageContainer">
        <div className="userDetails">
          <h2>{showUser ? showUser.firstName : null}</h2>
          <p>{showUser ? showUser.lastName : null}</p>
        </div>
        <div className="saleDetails">
          <h2>רשימת הזמנות פעילות</h2>
          <div className="userSaleList">{this.state.sales}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.login.user,
  };
};

export default connect(
  mapStateToProps,
  null,
)(UserArea);
