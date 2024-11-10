import React from 'react';
import moment from 'moment';
import { Pencil } from 'lucide-react';
import '../../../ComponentsCss/User/UserProfile.css'; 

const UserInfo = ({ user, onEdit }) => (
  <div className="user-info">
    <div className="user-info-content">
      <div className="user-info-left">
        <p>User Name: {user.userName}</p>
        <p>Age: {user.dateOfBirth ? 2024 - user.dateOfBirth : 'N/A'}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber ? user.phoneNumber : "N/A"}</p>
      </div>
      <div className="user-info-right">
        <p>Address: {user.address ? user.address : "N/A"}</p>
        <p>License Number: {user.cin ? user.cin : "N/A"}</p>
        <p>Joined: {moment(user.joined).format('LL')}</p>
        <p>License Obtained: {user.dateOfLicense ? 2024 - user.dateOfLicense + " Years ago" : 'N/A'}</p>
      </div>
    </div>
    <button className="edit-button" onClick={onEdit}>
      <Pencil className="edit-icon" />
      Edit
    </button>
  </div>
);

export default UserInfo;
