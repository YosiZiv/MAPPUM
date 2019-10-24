import React from 'react';
import Input from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import './CreateProduct.css';
const createProduct = props => {
  const {
    loading,
    productForm,
    redirect,
    message,
    submit,
    inputChange,
  } = props;
  const { name = '', description = '', sellPrice = '' } = productForm;
  return (
    <div className="createProductContainer">
      <div className="createProductTitle">
        <h2>New Product</h2>
      </div>
      <form className="createProductForm">
        <div className="productForm">
          <Input
            isValid={name ? name.isValid : true}
            className="form-control"
            id="name"
            name="name"
            type="text"
            error={message && message.name}
            required
            disabled={loading}
            defaultValue={name && name.value}
            inputChange={inputChange}
            validation={{
              isRequired: true,
              minLength: 2,
              maxLength: 256,
            }}
          />
          <div className="productDescription">
            <TextArea
              isValid={description ? description.isValid : true}
              className="form-control"
              id="description"
              name="description"
              type="text"
              error={message && message.description}
              required
              disabled={loading}
              defaultValue={description && description.value}
              inputChange={inputChange}
              validation={{
                isRequired: true,
                minLength: 2,
                maxLength: 256,
              }}
            />
          </div>
          <Input
            isValid={sellPrice ? sellPrice.isValid : true}
            className="form-control"
            id="sellPrice"
            name="sellPrice"
            type="text"
            error={message && message.sellPrice}
            required
            disabled={loading}
            defaultValue={sellPrice && sellPrice.value}
            inputChange={inputChange}
            validation={{
              isRequired: true,
              isNumeric: true,
            }}
          />
        </div>
        <div className="fileUploadContainer"></div>
      </form>
      <div className="productSubmit">
        <button type="button" className="btn btn-primary" onClick={submit}>
          NEXT
        </button>
      </div>
    </div>
  );
};
export default createProduct;
