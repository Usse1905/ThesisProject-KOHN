// src/components/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [unapprovedCompanies, setUnapprovedCompanies] = useState([]);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    fetchUnapprovedCompanies();
    fetchCars();
  }, []);

  const fetchUnapprovedCompanies = async () => {
    try {
      const response = await axios.get('/Admin/unapproved', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUnapprovedCompanies(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching companies', error);
      setError('Failed to load unapproved companies.');
      setUnapprovedCompanies([]); // Set to empty array if error
    }
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get('/cars/allcars', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setCars(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cars', error);
      setError('Failed to load car listings.');
      setCars([]); // Set to empty array if error
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
      setError('Failed to approve the company.');
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
      setError('Failed to delete car.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <section>
        <h2>Unapproved Companies</h2>
        {unapprovedCompanies.length > 0 ? (
          <ul>
            {unapprovedCompanies.map((company) => (
              <li key={company.id}>
                {company.name} - {company.address}
                <button onClick={() => approveCompany(company.id)}>Approve</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No unapproved companies found.</p>
        )}
      </section>

      <section>
        <h2>Car Listings</h2>
        {cars.length > 0 ? (
          <ul>
            {cars.map((car) => (
              <li key={car.id}>
                {car.Name} ({car.year}) - ${car.price} - {car.carType} - Mileage: {car.mileage} km
                <button onClick={() => deleteCar(car.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No car listings found.</p>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;
