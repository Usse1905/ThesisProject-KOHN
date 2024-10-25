import React , { useEffect , useState } from "react";
import { useNavigate,useLocation } from "react-router-dom"

const OneCar = () => {
  const location = useLocation()
  const car = location.state
  console.log(car);
  

  return (
    <div className="onecar">
     <div className="namehead-one"><h1>{car.Name}</h1></div>
     <div className="other-specs-one">
              <p>from {car.companyId}</p>
              <p>{car.carType}</p>
              <p>{car.shift}</p>
              <p>{car.ac}</p>
            </div>
            <div className="price-one"><h1>{car.price} TND/Day</h1></div>
            <div className="requestform" >
              <form action="">
                <label htmlFor="">Name : </label>
                <input type="text" /><br />
                <label htmlFor="">email : </label>
                <input type="text" /><br />
                <label htmlFor="">Phone Number (optional) : </label>
                <input type="text" /><br />
                <label htmlFor="">Birth Year : </label>
                <input type="text" /><br />
                <label htmlFor="">Year where you obtained your license : </label>
                <input type="text" /><br />
                <label htmlFor="">Pickup Date : </label>
                <input type="date" /><br />
                <label htmlFor="">Return Date : </label>
                <input type="date" /><br />
              </form>
              <p>Your total Price is : </p>
            </div>
            <button>Submit</button>
    </div>
  )
}

export default OneCar