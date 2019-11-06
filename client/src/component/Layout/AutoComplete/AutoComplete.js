import React from 'react';
import './autoComplete.css';
const autoComplete = props => {
  const { autoCompleteResult, userSelect } = props;
  return (
    <div className="AutoCompleteContainer">
      {autoCompleteResult.length ? (
        autoCompleteResult.map(email => {
          return (
            <p key={email} onClick={() => userSelect(email)}>
              {email}
            </p>
          );
        })
      ) : (
        <p>result didn't found</p>
      )}
    </div>
  );
};
export default autoComplete;
