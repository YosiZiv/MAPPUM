import React from 'react';
import Input from '../TextInput/TextInput';
import TextArea from '../TextArea/TextArea';
import DropZone from '../DropZone/DropZone';
import Files from '../Files/Files';
import FileProgressBar from '../FileUploadeProgressBar/FileUploadeProgressBar';
import './CreateProduct.css';
const createProduct = props => {
  const {
    loading,
    productForm,
    images,
    message,
    submit,
    inputChange,
    onFilesAdded,
    progress,
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
        <div className="fileUploadContainer">
          <div className="dropZoneContainer">
            <div className="dropZoneContainerImgWrapper">
              <DropZone
                onFilesAdded={onFilesAdded}
                // disabled={uploading || successfullUploaded}
              />
            </div>
          </div>
          <div className="dropZoneFiles">
            <Files files={images} />
          </div>
          <div className="progressBar">
            <FileProgressBar percentage={progress} />
          </div>
        </div>
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
