import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

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

    return (
        <UserContext.Provider value={{ user, setUser, updateUserContext }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};
