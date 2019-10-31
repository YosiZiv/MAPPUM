/* eslint-disable react/sort-comp */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable class-methods-use-this */

import React, { Component } from 'react';
import classes from './DropZone.module.css';
import img from '../../../assets/images/baseline-cloud_upload-24px.svg';
import axios from '../../../axiosApi';
class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { hightlight: false };
    this.fileInputRef = React.createRef();
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
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

  onFilesAdded(evt) {
    const { disabled, onFilesAdded } = this.props;
    if (disabled) return;
    const { files } = evt.target;
    if (onFilesAdded) {
      const array = this.fileListToArray(files);
      console.log(array);
      this.uploadFiles(array);
    }
  }

  onDragOver(event) {
    const { disabed } = this.props;
    event.preventDefault();
    if (disabed) return;
    this.setState({ hightlight: true });
  }

  onDragLeave() {
    this.setState({ hightlight: false });
  }

  onDrop(event) {
    const { disabed, onFilesAdded } = this.props;
    event.preventDefault();
    if (disabed) return;
    const { files } = event.dataTransfer;
    console.log(files);

    if (onFilesAdded) {
      const array = this.fileListToArray(files);
      onFilesAdded(array);
    }
    this.setState({ hightlight: false });
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
  uploadFiles(files) {
    const promises = [];
    files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    Promise.all(promises)
      .then(resolveUrls => {
        console.log(resolveUrls);
      })
      .catch(err => {
        console.log('INSIDE FILE PROMISE', err);
        this.setState({ uploadProgress: {}, uploading: false });
      });
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      const getaxios = axios();
      getaxios
        .post('file/uploadfile', formData)
        .then(responed => {
          console.log(responed);
          resolve(responed);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  render() {
    const { hightlight } = this.state;
    const { disabled } = this.props;
    return (
      <div
        className={`${classes.Dropzone} ${hightlight ? 'Highlight' : ''}`}
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
          onChange={this.onFilesAdded}
        />
        <img alt="upload" className={classes.Icon} src={img} />
        <span className={classes.UploadText}>Upload Files</span>
      </div>
    );
  }
}

export default Dropzone;
