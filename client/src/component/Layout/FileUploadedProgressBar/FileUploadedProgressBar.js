import React from './node_modules/react';

const fileUploadeProgressBar = ({ percentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        role="progressbar"
        style={{ width: `${percentage}%` }}
        aria-valuenow="25"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  );
};
export default fileUploadeProgressBar;
