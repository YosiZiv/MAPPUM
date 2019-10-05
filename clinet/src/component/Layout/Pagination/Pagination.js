import React from 'react';
import classes from './Pagination.css';
const pagination = props => {
  const {
    hasNextPage,
    hasPreviewPage,
    nextPageHandler,
    previewPageHandler
    } = props;
    console.log(props);
  return (
    <div className={classes.Pagination}>
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none'
        }}
        onClick={nextPageHandler}
        onKeyUp={nextPageHandler}
        disabled={!hasNextPage}
      >
        <i
          className="fas fa-arrow-right"
          style={
            hasNextPage
              ? { cursor: 'pointer', color: 'black' }
              : { cursor: 'default', color: 'gray' }
          }
        />
      </button>
      <button
        type="button"
        style={{
          background: 'none',
          border: 'none'
        }}
        onClick={previewPageHandler}
        onKeyUp={previewPageHandler}
        disabled={!hasPreviewPage}
      >
        <i
          className="fas fa-arrow-left"
          style={
            hasPreviewPage
              ? { cursor: 'pointer', color: 'black' }
              : { cursor: 'default', color: 'gray' }
          }
        />
      </button>
    </div>
  );
};
export default pagination;
