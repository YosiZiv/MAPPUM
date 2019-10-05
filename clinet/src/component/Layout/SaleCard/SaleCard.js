import React from 'react';
import { NavLink } from 'react-router-dom';
import kitchen from '../../../assets/images/kitchen.jpg';
import SaleProgressBar from '../SaleProgressBar/SaleProgressBar'
const saleCard = ({...sale}) => (
  <div key={sale._id} className="card" style={{ margin: "0 auto", width: "100%" }}>
    <SaleProgressBar stage = {sale.stage} />
    <img src = {kitchen} className="card-img-top" alt="kitchen" />
  <div className="card-body">
    <span>{sale._id}</span>
    <h5 className="card-title">{sale.productName}</h5>
    <p className="card-text">{sale.description}</p>
    <NavLink to={`/dashboard/tracker/${sale._id}`} className="btn btn-primary">לחץ לעמוד עריכה</NavLink>
  </div>
</div>
)
export default saleCard;