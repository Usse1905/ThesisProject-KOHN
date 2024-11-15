import React from 'react';
import moment from 'moment';
import { Pencil } from 'lucide-react';
import '../../../ComponentsCss/User/UserProfile.css'; 

const CompanyInfo = ({ company, onEdit }) => (
  <div className="company-info">
    <div className="company-info-content">
      <div className="company-info-left">
        <p>Company Name: {company.name}</p>
        <p>Email: {company.email}</p>
        <p>Phone Number: {company.phoneNumber ? company.phoneNumber : "N/A"}</p>
      </div>
      <div className="company-info-right">
        <p>Address: {company.address ? company.address : "N/A"}</p>
        <p>Legal Entity Id: {company.lei ? company.lei : "N/A"}</p>
        <p>Website: {company.website}</p>
        <p>License Obtained: {company.licensesinceWhen ? 2024 - company.licensesinceWhen + " Years ago" : 'N/A'}</p>
      </div>
    </div>
    <button className="edit-button" onClick={onEdit}>
      <Pencil className="edit-icon" />
      Edit
    </button>
  </div>
);

export default CompanyInfo;
