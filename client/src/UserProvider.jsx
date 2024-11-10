import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    const getRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/oneuserreqs/${user.id}`);
            console.log("requests for this user are", response.data);
            setUserReqs(response.data);
        } catch (error) {
            console.error("Error fetching request:", error.response ? error.response.data : error.message);
        }
    };
    // Update the user context
    const updateUserContext = (updatedUser) => {
        setUser(updatedUser);
    };

    const updateNotifications = (count) => {
        setNotificationCount(count);
      };
    
      const updateNotificationsList = (newNotifications) => {
        setNotifications(newNotifications);
      };

    // Update localStorage when user or notificationCount changes
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser, updateUserContext, notificationCount,
            notifications,
            updateNotifications,
            updateNotificationsList }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
