// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [unapprovedCompanies, setUnapprovedCompanies] = useState([]);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchUnapprovedCompanies();
    fetchCars();
  }, []);

  const fetchUnapprovedCompanies = async () => {
    try {
      const response = await axios.get('/Admin/unapproved', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUnapprovedCompanies(response.data);
    } catch (error) {
      console.error('Error fetching companies', error);
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get('/cars/allcars', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars', error);
    }
  };

  const approveCompany = async (companyId) => {
    try {
      await axios.post(`/Admin/approve/${companyId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchUnapprovedCompanies(); // Refresh the list
    } catch (error) {
      console.error('Error approving company', error);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await axios.delete(`/Admin/car/${carId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      fetchCars(); // Refresh the list of cars
    } catch (error) {
      console.error('Error deleting car', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <section>
        <h2>Unapproved Companies</h2>
        <ul>
          {unapprovedCompanies.map((company) => (
            <li key={company.id}>
              {company.name} - {company.address}
              <button onClick={() => approveCompany(company.id)}>Approve</button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Car Listings</h2>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>
              {car.Name} ({car.year}) - ${car.price} - {car.carType} - Mileage: {car.mileage} km
              <button onClick={() => deleteCar(car.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
