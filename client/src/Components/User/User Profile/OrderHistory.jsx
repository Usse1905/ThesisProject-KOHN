import React from 'react';
import moment from 'moment';
import DirectionsMap from './DirectionsMap';


const OrderHistory = ({  userreqs, handleCancelRequest, handleReorderRequest }) => (

    <div>
        {userreqs.map((rq, i) => {
  console.log('Request Data:', rq);
  return (
    <div className='request-card' key={i}>
      <div className='request-header'>
        <h1 className='request-status'>Request Number {rq.requestNumber}</h1>
      </div>
      <p className='request-status'>{rq.status ? rq.status : "Pending"} Request for {rq.carName}</p>
      <p className='request-details'>Created by {rq.requestername} on {moment(rq.created).format('LL')}</p>
      <p className='request-dates'>Vehicle will be picked up on {moment(rq.pickupDate).format('LL')} and returned on {moment(rq.returnDate).format('LL')}</p>
      <p className='request-price'>Total price: <strong>{rq.totalPrice} DT</strong></p>
      {rq.status === "Pending" ? 
          <button onClick={() => handleCancelRequest(rq.id)}>Cancel Request</button> : 
          rq.status === "Canceled" ? 
          <button onClick={() => handleReorderRequest(rq.id)}>Reorder</button> : 
          rq.status === "Confirmed" ? 
          (
            <>
              <DirectionsMap 
                companyAddress={rq.Company ? rq.Company.address : 'Address not available'} 
                userAddress={rq.User ? rq.User.address : 'Address not available'} 
              />
            </>
          )
          : null}
    </div>
  );
})}

    </div>
);

export default OrderHistory;
