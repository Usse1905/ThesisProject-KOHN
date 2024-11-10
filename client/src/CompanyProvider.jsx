import React, { createContext, useState, useContext, useEffect } from 'react';

const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
    const [company, setCompany] = useState(() => {
        const savedCompany = localStorage.getItem('company');
        return savedCompany ? JSON.parse(savedCompany) : null;
    });
    
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    // Update the Company context
    const updateCompanyContext = (updatedCompany) => {
        setCompany(updatedCompany);
    };

    const updateNotifications = (count) => {
        setNotificationCount(count);
      };
    
      const updateNotificationsList = (newNotifications) => {
        setNotifications(newNotifications);
      };

    // Update localStorage when Company or notificationCount changes
    useEffect(() => {
        if (company) {
            localStorage.setItem('company', JSON.stringify(company));
        } else {
            localStorage.removeItem('company');
        }
    }, [company]);

    return (
        <CompanyContext.Provider value={{ company, setCompany, updateCompanyContext, notificationCount,
            notifications,
            updateNotifications,
            updateNotificationsList }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    return useContext(CompanyContext);
};
