/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CreateProduct from '../../../../Layout/CreateProduct/CreateProduct';
import {
  createProductStart,
  setProductFields,
} from '../../../../../redux/actions/sell';
import {
  setImagesFiles,
  uploadImages,
} from '../../../../../redux/actions/file';
import './CreateProduct.css';

class createItem extends Component {
  handleInputChange = ({ id, value, validation }) => {
    const { setProductFields } = this.props;
    setProductFields({ id, value, validation });
  };
  submitHandler = async event => {
    const {
      createProductStart,
      productForm,
      images,
      uploadImages,
    } = this.props;
    const form = new FormData();
    images.forEach(image => {
      console.log(image, image.name);

      form.append(image.name, image[0]);
    });
    console.log(form);

    uploadImages(form);
    // const productData = {
    //   name: productForm.name.value,
    //   description: productForm.description.value,
    //   sellPrice: productForm.sellPrice.value,
    // };
    // return createProductStart(productData);
  };
  onFilesAdded = async files => {
    const { setImagesFiles } = this.props;
    console.log(files);
    setImagesFiles(files);
  };

  render() {
    const { redirect, message, productForm, loading, images } = this.props;
    console.log(images);

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
  { setProductFields, createProductStart, setImagesFiles, uploadImages },
)(createItem);
