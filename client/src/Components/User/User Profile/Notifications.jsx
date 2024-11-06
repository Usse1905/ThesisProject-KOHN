import React from 'react';
import moment from 'moment';

const Notifications = ({ userreqs }) => (
    <div>
        {userreqs.map((rq, index) => (
            <div className='notifications' key={index}>
                {rq.statusHistory && rq.statusHistory.length > 0 ? (
                    rq.statusHistory.map((notf, i) => (
                        <p key={i}>Your Request {rq.requestNumber} has been Changed from {notf.oldStatus} to {notf.newStatus} at {moment(notf.changedAt).format('LL')}</p>
                    ))
                ) : (
                    <p>Your Request {rq.requestNumber} has no status changes</p>
                )}
            </div>
        ))}
    </div>
);

export default Notifications;
