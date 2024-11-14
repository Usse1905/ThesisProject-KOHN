import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate } from 'react-router-dom';
import "../../ComponentsCss/Company/OneCompany.css"

const OneCompany = () => {
    const [cmcars, setCmcars] = useState([]);
    const [activeTab, setActiveTab] = useState('info'); 
    const location = useLocation();
    const company = location.state;

    const navigate = useNavigate()

    useEffect(() => {
        if (company && company.id) {
            axios.get(`http://localhost:8080/cars/companycars/${company.id}`)
                .then((response) => {
                    setCmcars(response.data);
                })
                .catch((error) => {
                    console.log("Error:", error);
                });
        }
    }, [company]);

    return (
        <div className="onecompany">
            {/* Tabs for navigating between Company Info and Cars */}
            <div className="tabs">
                <div 
                    className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                    onClick={() => setActiveTab('info')}
                >
                    Company Info
                </div>
                <div 
                    className={`tab ${activeTab === 'cars' ? 'active' : ''}`}
                    onClick={() => setActiveTab('cars')}
                >
                    Cars
                </div>
            </div>

            {/* Render content based on active tab */}
            {activeTab === 'info' ? (
                <div className="company-info">
                    <div className="namehead-company">
                        <h1>{company.name}</h1>
                    </div>
                    <div className="other-specs">
                        <p>Located at {company.address}</p>
                        <p>{company.phoneNumber}</p>
                        <p>{company.website}</p>
                        <p>{company.email}</p>
                        <p>Renting license since {company.licenssinceWhen}</p>
                        <p>Legal Entity Identifier {company.lei}</p>
                    </div>
                </div>
            ) : (
                <div className="company-cars">
                    <h2 style={{color:'white'}}>Cars available for this company:</h2>
                    <div className="cars-list">
                        {cmcars.length > 0 ? (
                            cmcars.map((car) => (
                                <div key={car.id} className="car-card" style={{color:'goldenrod',
                                    backgroundColor:'black'
                                }} >
                                    <img src={car.image} alt="" style={{width:"200px"}}/>
                                    <h3>{car.Name}</h3>
                                    <p>{car.carType}</p>
                                    <p>{car.shift}</p>
                                    <p>{car.ac}</p>
                                    <p>{car.price} TND/Day</p>
                                    <button onClick={()=>navigate("/addrequest",{state:car})}>Proceed</button>
                                </div>
                            ))
                        ) : (
                            <p>No cars available for this company.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default OneCompany;
