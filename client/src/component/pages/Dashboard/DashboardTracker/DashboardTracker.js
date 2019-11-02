import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardTrackerList from './DashboardTrackerList/DashboardTrackerList';
import DashboardTrackerUpdate from './DashboardTrackerUpdate/DashboardTrackerUpdate'
const dashboardTracker = () => {
      const route = (
        <Switch>
        <Route path="/dashboard/tracker"  component={DashboardTrackerList} exact />
        <Route path="/dashboard/tracker/:id"  component={DashboardTrackerUpdate} />
    </Switch>
      )
      return (
          <div>
            {route}
          </div>
        );
}
export default dashboardTracker;