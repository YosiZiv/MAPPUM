import React from 'react';
import './FormConfirm.css';
const formConfirm = ({ user, product, submit }) => (
  <div className="formConfirmContainer">
    <div className="formConfirmTitle">
      <h1>Sale Summary</h1>
    </div>
    <div className="formConfirmFlex">
      <div className="userDetailed">
        <div className="formConfirmSubtitle">
          <h3>Customers Summary</h3>
        </div>

        <div className="formConfirmWrapper">
          <label>First Name:</label>
          <label>{user.firstName}</label>
        </div>

        <div className="formConfirmWrapper">
          <label>Last Name</label>
          <label>{user.lastName}</label>
        </div>

        <div className="formConfirmWrapper">
          <label>Id Number</label>
          <label>{user.zahot}</label>
        </div>

        <div className="formConfirmWrapper">
          <label>Phone Number</label>
          <label>{user.phone}</label>
        </div>
      </div>
      <div className="userDetailed">
        <div className="formConfirmSubtitle">
          <h3>Product Summary</h3>
        </div>

        <div className="formConfirmWrapper">
          <label>Product Name</label>
          <label>{product.name}</label>
        </div>

        <div className="formConfirmWrapper">
          <label>Product Description</label>
          <label>{product.description}</label>
        </div>
        <div className="formConfirmWrapper">
          <label>Product Price</label>
          <label>{product.sellPrice}</label>
        </div>
        <div className="formConfirmImages">
          <h3>Product Images</h3>
          {product.images.length
            ? product.images.map(image => (
                <img alt={product.name} src={image} />
              ))
            : null}
        </div>
      </div>
    </div>
    <button className="btn btn-success" onClick={submit}>
      Submit
    </button>
  </div>
);

export default formConfirm;
