import React from 'react';
import moment from 'moment';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react'; // Import icons
import '../../../ComponentsCss/User/Notifications.css';

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'pending-status';
    case 'canceled':
      return 'canceled-status';
    case 'confirmed':
      return 'confirmed-status';
    default:
      return ''; 
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return <Hourglass className="status-icon" />;
    case 'canceled':
      return <XCircle className="status-icon" />;
    case 'confirmed':
      return <CheckCircle className="status-icon" />;
    default:
      return null;
  }
};



const Notifications = ({ userreqs }) => {

  return (
    <div className="notifications-container">
      {userreqs.map((rq, index) => {
        const sortedStatusHistory = rq.statusHistory?.slice().sort((a, b) => {
          const dateA = moment(a.changedAt);
          const dateB = moment(b.changedAt);
          
          return dateB.isBefore(dateA) ? -1 : 1; 
        });

        return (
          <div className="notification-item" key={index}>
            {sortedStatusHistory && sortedStatusHistory.length > 0 ? (
              sortedStatusHistory.map((notf, i) => (
                <div key={i} className="notification-text-container">
                  <p className={`notification-text ${getStatusColor(notf.newStatus)}`}>
                    {getStatusIcon(notf.newStatus)}Your Request {rq.requestNumber} has been Changed from 
                    <span className="old-status"> {notf.oldStatus}</span> to 
                    <span className="new-status"> {notf.newStatus}</span>
                  </p>
                  <span className="notification-time">
                    {moment(notf.changedAt).format('LLLL')}
                  </span>
                </div>
              ))
            ) : (
              <p className="notification-text no-status">
                Your Request {rq.requestNumber} has no status changes
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Notifications;