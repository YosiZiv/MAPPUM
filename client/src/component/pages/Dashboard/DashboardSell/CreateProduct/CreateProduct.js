/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateProduct from '../../../../Layout/CreateProduct/CreateProduct';
import { redirectTo } from '../../../../../redux/actions/ui';
import {
  createProductStart,
  setProductFields,
} from '../../../../../redux/actions/sell';
import {
  setImagesFiles,
  uploadImages,
} from '../../../../../redux/actions/file';
import './CreateProduct.css';
import axios from '../../../../../axiosApi';
class createItem extends Component {
  state = { progress: 0 };
  componentDidMount() {
    const { user, redirectTo } = this.props;
    if (!user) {
      redirectTo('/dashboard/sell');
    }
  }
  handleInputChange = ({ id, value, validation }) => {
    const { setProductFields } = this.props;
    setProductFields({ id, value, validation });
  };
  imageUpload = images =>
    new Promise((resolve, reject) => {
      const axiosApi = axios();
      const form = new FormData();
      images.forEach(image => {
        form.append('file', image);
      });
      axiosApi
        .post('file/uploadfile', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            this.setState({
              progress: parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total),
              ),
            });
          },
        })
        .then(response => {
          resolve(response.data.images);
        })
        .catch(error => {
          reject(error.response.data.errors);
        });
    });
  submitHandler = async event => {
    try {
      const { createProductStart, productForm, images } = this.props;
      let imagesUrl;
      if (images.length) {
        imagesUrl = await Promise.resolve(this.imageUpload(images));
      }
      const productData = {
        name: productForm.name.value,
        description: productForm.description.value,
        sellPrice: productForm.sellPrice.value,
        images: imagesUrl,
      };
      return createProductStart(productData);
    } catch (err) {
    }
  };
  onFilesAdded = files => {
    const { setImagesFiles } = this.props;
    setImagesFiles(files);
  };

  render() {
    const { redirect, message, productForm, loading, images } = this.props;

    return (
      <div className="createProductPage">
        <CreateProduct
          images={images}
          onFilesAdded={this.onFilesAdded}
          message={message}
          productForm={productForm}
          loading={loading}
          inputChange={this.handleInputChange}
          submit={this.submitHandler}
          progress={this.state.progress}
        />
        {redirect && <Redirect to={redirect} />}

        {message
          ? message.global && (
              <div className="globalError">
                <p>* {message.global.toUpperCase()}</p>
              </div>
            )
          : null}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    user: state.register.user,
    message: state.ui.message,
    redirect: state.ui.redirect,
    productForm: state.sell.productForm,
    images: state.file.images,
  };
};
export default connect(
  mapStateToProps,
  {
    redirectTo,
    setProductFields,
    createProductStart,
    setImagesFiles,
    uploadImages,
  },
)(createItem);
