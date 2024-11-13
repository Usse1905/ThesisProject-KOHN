
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import "./companyProfile.css"; 
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [company, setCompany] = useState(null); 
  const [cars, setCars] = useState([]); 

  useEffect(() => {
    const callListCompanies = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/company/getOneCompany/${id}`);
        setCompany(res.data); 
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    const callListCars = async () => {
      try {
        const res = await axios.get("http://localhost:8080/cars/allcars");
        const filteredCars = res.data.filter(car => car.companyId === Number(id));
        setCars(filteredCars); 
      } catch (error) {
        console.log(error);
      }
    };

    callListCompanies();
    callListCars();
  }, [id]); 

  const duplicatedCars = [...cars, ...cars]; 

  const handleDelete = async (id) => {
    try {
      const cars = await axios.delete(`http://localhost:8080/cars/deleteCar/${id}`);
      setCars(cars => cars.filter(car => car.id !==Number(id))); 
      Swal.fire('Succès', 'Car deleted', 'success');
      console.log(cars);
    } catch (error) {
      Swal.fire('Erreur', 'An error occurred', 'error');
      console.log(error);
    }
  };

  if (!company) {
    return <p>Loading Company...</p>;
  }

  
  
  return (
    <div className="profile-page">
      <h1 className="companyDetail">{company.name}</h1>
      <p className="companyDetail"><strong>Address :</strong> {company.address}</p>
      <p className="companyDetail"><strong>Phone :</strong> {company.phoneNumber}</p>
      <p className="companyDetail"><strong>Website:</strong> {company.website}</p>
      <p className="companyDetail"><strong>Email:</strong> {company.email}</p>
      
      <h2>Car List</h2>
      <div className="carbycomp">
        {duplicatedCars.length === 0 ? (
          <p>No cars found for this company.</p>
        ) : (
          <div className="cars-list">
            {duplicatedCars.map((car) => (
              <div key={car.id} className="car-item">
                <h3>{car.Name}</h3>
                <p><strong>Price :</strong> {car.price} TND</p>
                <img src={car.image} alt={car.Name} />
                <button className="deleteCarButton" onClick={() => handleDelete(car.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className='addNewCar'><Link to="/Company/AddCar"> Add a new Car</Link></button>
    </div>
  );
};

export default ProfilePage;