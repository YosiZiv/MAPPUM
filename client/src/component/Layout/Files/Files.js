import React from 'react';
import './Files.css';

const files = props => {
  const { files } = props;
  return (
    <div className="files">
      {files ? files.map(file => <p key={file.name}>{file.name}</p>) : null}
    </div>
  );
};
export default files;
