import React from 'react';
import './Message.css';
const message = ({ message }) => {
  const msg =
    message && message['global'] ? (
      <p className="globalError">* {message['global'].toUpperCase()}</p>
    ) : null;

  return msg;
};
export default message;
