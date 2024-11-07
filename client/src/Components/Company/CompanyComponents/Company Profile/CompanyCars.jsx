import React from 'react'
import "../../../../ComponentsCss/User/MainPage.css"

const CompanyCars = ({companyCars}) => {
  return (
    <div className="cars">
    {companyCars.map((element, index) => (
        <div className="car-container" key={index}>
            <div
                className="car"
                onClick={() => navigate("/one", { state: element })}
                style={{
                    backgroundImage: `url(${element.image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="namehead">
                    <h1>{element.Name}</h1>
                </div>
                <div className="other-specs">
                    <p>from {getCompanyName(element.companyId)}</p>
                    <p>{element.carType}</p>
                    <p>{element.shift}</p>
                    <p>{element.ac}</p>
                </div>
            </div>
            <div className="price">
                <h1>{element.price} TND/Day</h1>
            </div>
        </div>
    ))}
</div>
  )
}

export default CompanyCars