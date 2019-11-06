import React, { Component } from 'react';
import axios from '../../../../../axiosApi';
import SaleCard from '../../../../Layout/SaleCard/SaleCard';
import Pagination from '../../../../Layout/Pagination/Pagination';
import './DashboardTrackerList.css';
class DashboardTracker extends Component {
  state = {
    activeSales: [],
    loading: false,
    currentPage: 1,
    itemPerPage: 3,
    hasNextPage: false,
    hasPreviewPage: false,
    totalCount: null,
  };
  componentDidMount() {
    const { currentPage, itemPerPage } = this.state;
    this.setState({ loading: true });
    const api = axios();
    api
      .get('/dashboard/getactivesale', {
        params: { currentPage, itemPerPage },
      })
      .then(response => {
        const totalCount = response.data.countSales;
        if (totalCount > itemPerPage) {
          return this.setState({
            activeSales: response.data.sales,
            totalCount,
            hasNextPage: true,
            loading: false,
          });
        }
        return this.setState({
          activeSales: response.data.sales,
          totalCount,
          hasNextPage: false,
          loading: false,
        });
      })
      .catch(err => {});
  }

  nextPageHandler = (currentPage, itemPerPage, totalCount) => {
    const currentPageInc = currentPage + 1;
    this.setState({ loading: true });

    const api = axios();
    api
      .get('/dashboard/getactivesale', {
        params: {
          currentPage: currentPageInc,
          itemPerPage,
        },
      })
      .then(response => {
        if (currentPageInc * itemPerPage >= totalCount) {
          return this.setState({
            activeSales: response.data.sales,
            hasNextPage: false,
            currentPage: currentPageInc,
            hasPreviewPage: true,
            loading: false,
          });
        }

        return this.setState({
          activeSales: response.data.sales,
          currentPage: currentPageInc,
          hasNextPage: true,
          hasPreviewPage: true,
          loading: false,
        });
      })
      .catch(err => {});
    return 0;
  };

  previewPageHandler = (currentPage, itemPerPage) => {
    const currentPageDec = currentPage - 1;
    this.setState({ loading: true });

    const api = axios();
    api
      .get('/dashboard/getactivesale', {
        params: {
          currentPage: currentPageDec,
          itemPerPage,
        },
      })
      .then(result => {
        const { countSales } = result.data;

        if (currentPageDec === 1) {
          return this.setState({
            activeSales: result.data.sales,
            hasPreviewPage: false,
            currentPage: currentPageDec,
            hasNextPage: true,
            loading: false,
          });
        }
        return this.setState({
          activeSales: result.data.sales,
          currentPage: currentPageDec,
          loading: false,
        });
      })
      .catch(err => {});
    return 0;
  };

  render() {
    const {
      activeSales,
      currentPage,
      itemPerPage,
      totalCount,
      loading,
    } = this.state;
    let SaleList;
    if (activeSales.length) {
      SaleList = activeSales.map(sale => {
        return <SaleCard key={sale._id} {...sale} />;
      });
    }
    return (
      <div className="trackerContainer">
        {SaleList ? (
          <div className="TrackerList">
            <h2 className="trackerTitle">בחר מכירה לעדכן</h2>
            <div className="trackers">{SaleList}</div>
            <Pagination
              nextPageHandler={() =>
                this.nextPageHandler(currentPage, itemPerPage, totalCount)
              }
              previewPageHandler={() =>
                this.previewPageHandler(currentPage, itemPerPage)
              }
              {...this.state}
            />
          </div>
        ) : loading ? (
          <div className="noTracker">
            <h4>מחפש נתונים נא להמתין</h4>
          </div>
        ) : (
          <div className="noTracker">
            <h4>לא נמצאו מכירות פעילות</h4>
          </div>
        )}
      </div>
    );
  }
}
export default DashboardTracker;
