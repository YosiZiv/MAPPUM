/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import classes from './DropZone.module.css';
import img from '../../../assets/images/baseline-cloud_upload-24px.svg';
class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { highlight: false };
    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.filesAdded = this.filesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  openFileDialog() {
    const { disabled } = this.props;
    if (disabled) return null;
    this.fileInputRef.current.click();
    return null;
  }

  filesAdded(evt) {
    const { disabled, onFilesAdded } = this.props;
    if (disabled) return;
    const { files } = evt.target;
    const array = this.fileListToArray(files);
    console.log(array);
    onFilesAdded(array);
  }

  onDragOver(event) {
    const { disabed } = this.props;
    event.preventDefault();
    if (disabed) return;
    this.setState({ highlight: true });
  }

  onDragLeave() {
    this.setState({ highlight: false });
  }

  onDrop(event) {
    const { disabed, onFilesAdded } = this.props;
    event.preventDefault();
    if (disabed) return;
    const { files } = event.dataTransfer;
    const array = this.fileListToArray(files);
    onFilesAdded(array);

    this.setState({ highlight: false });
  }

  fileListToArray(list) {
    console.log(list);

    const array = [];
    for (let i = 0; i < list.length; i += 1) {
      console.log('element?', list[i]);
      array.push(list[i]);
    }
    console.log(array);

    return array;
  }

  render() {
    const { highlight } = this.state;
    const { disabled } = this.props;
    return (
      <div
        className={`${classes.Dropzone} ${highlight ? 'Highlight' : ''}`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: disabled ? 'default' : 'pointer' }}
      >
        <input
          ref={this.fileInputRef}
          className={classes.FileInput}
          type="file"
          multiple
          onChange={this.filesAdded}
        />
        <img alt="upload" className={classes.Icon} src={img} />
        <span className={classes.UploadText}>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;
