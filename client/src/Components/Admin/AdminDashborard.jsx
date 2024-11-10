
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import "../../ComponentsCss/Admin/AdminDashboard.css"; 

const AdminDashboard = () => {
  const [unapprovedCompanies, setUnapprovedCompanies] = useState([]);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [hasNewSignups, setHasNewSignups] = useState(false);

 
  const fetchUnapprovedCompanies = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authorization token not found.');

      const response = await axios.get('http://localhost:8080/Admin/unapproved', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const companies = Array.isArray(response.data) ? response.data : response.data.companies || [];
      setUnapprovedCompanies(companies);
      setHasNewSignups(companies.length > 0);

      if (companies.length > 0) markNotificationsAsSeen();
    } catch (error) {
      console.error('Error fetching unapproved companies:', error);
      setError('Failed to load unapproved companies.');
    }
  }, []);


  const markNotificationsAsSeen = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authorization token not found.');

      await axios.post('http://localhost:8080/Admin/notifications', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setHasNewSignups(false);
    } catch (error) {
      console.error('Error marking notifications as seen:', error);
      setError('Failed to mark notifications as seen.');
    }
  };

  
  const fetchCars = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authorization token not found.');

      const response = await axios.get('http://localhost:8080/cars/allcars', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCars(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError('Failed to load car listings.');
    }
  }, []);

  
  const approveCompany = async (companyId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authorization token not found.');

      await axios.post(`http://localhost:8080/Admin/approve/${companyId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchUnapprovedCompanies(); 
    } catch (error) {
      console.error('Error approving company:', error);
      setError('Failed to approve the company.');
    }
  };


  const deleteCar = async (carId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authorization token not found.');

      await axios.delete(`http://localhost:8080/Admin/car/${carId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchCars(); 
    } catch (error) {
      console.error('Error deleting car:', error);
      setError('Failed to delete car.');
    }
  };

  
  useEffect(() => {
    fetchUnapprovedCompanies();
    fetchCars();
  }, [fetchUnapprovedCompanies, fetchCars]);

  return (
    <div className="admin-dashboard">
      <h1> Admin Dashboard </h1>

      {error && <p className="error-message">{error}</p>}

      
      {hasNewSignups && (
        <p className="notification">
          New company signup requests pending approval!
        </p>
      )}

      <section>
        <h2>Unapproved Companies</h2>
        {unapprovedCompanies.length > 0 ? (
          <ul className="company-list">
          {unapprovedCompanies.map((company) => (
            <li key={company.id} className="company-item">
              <strong>{company.name}</strong>
              <div className="company-details">
                <span className="company-detail"> Address: {company.address}</span>
                <span className="company-detail"> Phone: {company.phoneNumber}</span>
                <span className="company-detail"> Website: 
                  <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
                </span>
                <span className="company-detail"> Email: {company.email}</span>
                <span className="company-detail"> License Since: {company.licensesinceWhen}</span>
                <span className="company-detail"> LEI: {company.lei}</span>
              </div>
              <button className="approve-button" onClick={() => approveCompany(company.id)}>Approve</button>
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
    <ul className="car-list">
      {cars.map((car) => (
        <li key={car.id} className="car-item">
          <img src={car.image} alt={`${car.Name}`} className="car-image" />
          <div className="car-details">
            <h3>{car.Name}</h3>
            <p><strong>Price:</strong> ${car.price}</p>
            <p><strong>Type:</strong> {car.carType}</p>
            <p><strong>Mileage:</strong> {car.mileage} km</p>
            <p><strong>Year:</strong> {car.year}</p>
            <p><strong>Shift:</strong> {car.shift}</p>
            <p><strong>AC:</strong> {car.ac}</p>
            <p><strong>Location:</strong> {car.location}</p>
          </div>
          <button className="delete-button" onClick={() => deleteCar(car.id)}>Delete</button>
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
