import React from 'react';
import moment from 'moment';

const ReceivedOrders = ({  companyOrders, handleCancelRequest, handleConfirmRequest, handleDeliverRequest }) => (

    <div>
        {companyOrders.map((or, i) => {
  console.log('Request Data:', or);
  return (
    <div className='request-card' key={i}>
      <div className='request-header'>
        <h1 className='request-status'>Request Number {or.requestNumber}</h1>
      </div>
      <p className='request-status'>{or.status ? or.status : "Pending"} Request for {or.carName}</p>
      <p className='request-details'>Created by {or.requestername} on {moment(or.created).format('LL')}</p>
      <p className='request-dates'>Vehicle will be picked up on {moment(or.pickupDate).format('LL')} and returned on {moment(or.returnDate).format('LL')}</p>
      <p className='request-price'>Total price: <strong>{or.totalPrice} DT</strong></p>
      {or.status === "Pending" ? 
          <>
          <button onClick={() => handleCancelRequest(or.id)}>Cancel </button>
          <button onClick={() => handleConfirmRequest(or.id)}>Confirm</button>
          </> : 
          or.status === "Canceled" ? 
          <button onClick={() => handleConfirmRequest(or.id)}>Reopen</button> : 
          or.status === "Confirmed" ? 
          <button onClick={() => handleDeliverRequest(or.id)}>Mark as Delivered</button>
          : null}
    </div>
  );
})}

    </div>
);

export default ReceivedOrders;
