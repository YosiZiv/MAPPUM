import React, { Component } from 'react';
import axios from '../../../../../axiosApi';
import SaleProgressBar from '../../../../Layout/SaleProgressBar/SaleProgressBar';

class DashboardTrackerUpdate extends Component {
  state = {
    selectOpt: ['stage1', 'stage2', 'stage3'],
    sale: null,
  };
  componentDidMount() {
    const { match } = this.props;
    console.log(match.params.id);

    const bodyData = {
      saleId: match.params.id,
    };
    const api = axios();
    api
      .get(`/dashboard/getsale/${bodyData.saleId}`)
      .then(response => {
        const sale = response.data.sale;
        console.log(sale);

        this.setState({
          sale,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  onChangeHandler = event => {
    console.log(event.target.value);

    const api = axios();
    console.log(this.state);

    const sale = this.state.sale;
    api
      .post('/dashboard/updatestage', {
        params: sale._id,
        bodyData: event.target.value,
      })
      .then(response => {
        const stage = response.data.newSale;
        console.log(stage);

        this.setState(prevState => ({
          sale: {
            // object that we want to update
            ...prevState.sale, // keep all other key-value pairs
            stage, // update the value of specific key
          },
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let sales;
    if (this.state.sale) {
      const { sale } = this.state;
      sales = (
        <div>
          <SaleProgressBar stage={this.state.sale.stage} />
          <div>
            <span>{sale._id}</span>
            <h2>{sale.productName}</h2>
            <p>{sale.stage}</p>
          </div>
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Choose Stage
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {this.state.selectOpt.map(opt => (
              <option
                style={{ cursor: 'pointer' }}
                key={opt}
                onClick={this.onChangeHandler}
                className="dropdown-item"
                value={opt}
              >
                {opt}
              </option>
            ))}
          </div>
        </div>
      );
    }
    return <div>{sales}</div>;
  }
}

export default DashboardTrackerUpdate;
