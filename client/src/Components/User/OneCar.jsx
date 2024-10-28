import React , { useEffect , useState } from "react";
import { useNavigate,useLocation } from "react-router-dom"
import "../../ComponentsCss/User/OneCar.css"

const OneCar = () => {
  const location = useLocation()
  const car = location.state
  const navigate = useNavigate()
  console.log(car);
  

  return (
    <div className="onecar" style={{ backgroundImage: `url(${car.image})`,
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center'  }}>
     <div className="namehead-one"><h1>{car.Name}</h1></div>
     <div className="other-specs-one">
              <p>from {car.companyId}</p>
              <p>{car.carType}</p>
              <p>{car.shift}</p>
              <p>{car.ac}</p>
            </div>
            <div className="price-one"><h1>{car.price} TND/Day</h1></div>
            <button onClick={()=>navigate("/addrequest",{state:car})}>Proceed</button>
    </div>
  )
}

export default OneCar