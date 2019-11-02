import React from 'react';
import './AutoComplate.css';
const autoComplate = props => {
  const { autoComplateResult, userSelect } = props;
  return (
    <div className="AutoComplateContainer">
      {autoComplateResult.length ? (
        autoComplateResult.map(email => {
          return (
            <p key={email} onClick={() => userSelect(email)}>
              {email}
            </p>
          );
        })
      ) : (
        <p>result didnt found</p>
      )}
    </div>
  );
};
export default autoComplate;
