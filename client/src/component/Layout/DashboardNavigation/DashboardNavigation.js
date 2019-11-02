import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import './DashboardNavigation.css';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
// import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
import { NavLink } from 'react-router-dom';

// eslint-disable-next-line import/prefer-default-export
export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <NavLink
          exact
          to="/dashboard"
          className="dashboardNav"
          activeClassName="dashboardNavSelect"
        >
          <ListItemText />
          <DashboardIcon />
          Home
        </NavLink>
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NavLink
          to="/dashboard/sell"
          className="dashboardNav"
          activeClassName="dashboardNavSelect"
        >
          <ListItemText /> <BarChartIcon />
          Start New Sell
        </NavLink>
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NavLink
          to="/dashboard/tracker"
          className="dashboardNav"
          activeClassName="dashboardNavSelect"
        >
          <ListItemText /> <BarChartIcon />
          Update Sell
        </NavLink>
      </ListItemIcon>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <NavLink
          to="/dashboard/logout"
          className="dashboardNav"
          activeClassName="dashboardNavSelect"
        >
          <ListItemText /> <BarChartIcon />
          Logout
        </NavLink>
      </ListItemIcon>
    </ListItem>
  </div>
);
