import React from 'react';
import './AutoComplate.css';
const autoComplate = props => {
  return (
    <div className="AutoComplateContainer">
      {props.autoComplateResult.map(email => {
        return <p>{email}</p>;
      })}
    </div>
  );
};
export default autoComplate;
