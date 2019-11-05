import React from 'react';
import './SlideIn.css';
const slideIn = props => {
  const { open, children } = props;
  const openCheck = open ? 'open' : 'close';
  const style = 'slider ' + openCheck;
  return <div className={style}>{children}</div>;
};

export default slideIn;
