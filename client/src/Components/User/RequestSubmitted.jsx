import React from 'react'
import { BadgeCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../../ComponentsCss/User/RequestSubmitted.css"


const RequestSubmitted = () => {
    const navigate = useNavigate()
  return (
    <div className="request-submitted">
      <div className="icon-container">
        <BadgeCheck className="icon" />
      </div>
      <h2 className='submit-header'>Request Successfully Submitted!</h2>
      <p className='submit-message'>
        Your request has been sent to the provider. As soon as it's approved, you'll receive confirmation on your user profile.
      </p>
      <p className="thank-you">Thank you for using our services!</p>
      <button className='reroute-button' onClick={()=>navigate("/allcars")}> Continue Shopping</button>
    </div>
  )
}

export default RequestSubmitted