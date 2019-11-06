import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
const adminDashboardMain = () => (
  <React.Fragment>
    <h1 style={{ color: 'grey', marginBottom: '40px' }}>MPPUM Admin Area</h1>
    <Link component={RouterLink} to="/dashboard/sell">
      Start New Sale
    </Link>
  </React.Fragment>
);

export default adminDashboardMain;
