import React from 'react';
import { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useSocket } from '../../../SocketProvider';
import { useUser } from '../../../UserProvider';
import DirectionsMap from './DirectionsMap';


const OrderHistory = ({  userreqs, handleGetreq }) => {

  const {socket} = useSocket()
  const {user} = useUser()


  const handleStatusChange = async (requestId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/updaterequest/${requestId}`, {
        status: newStatus,
      });
      await handleGetreq()
      console.log('Request status updated:', response.data);

    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };  


   return <div>
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
          <button onClick={() => handleStatusChange(rq.id,"Canceled")}>Cancel Request</button> : 
          rq.status === "Canceled" ? 
          <button onClick={() => handleStatusChange(rq.id,"Pending")}>Reorder</button> : 
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
}

export default OrderHistory;
