import React, { useEffect, useState } from 'react';
import { useCompany } from '../../../../CompanyProvider.jsx';
import { UserRound, BadgeInfo, FileStack, Bell, MessageCircle, ImagePlus, ImageDown, Car  } from 'lucide-react';
import moment from "moment";
import axios from 'axios';
import EditUserInfo from './EditUserInfo';
import Messages from './Messages';
import Notifications from './Notifications';
import OrderHistory from './OrderHistory';
import UserInfo from './UserInfo';
import "../../../ComponentsCss/User/UserProfile.css";

const CompanyProfile = () => {
    const { company, updateCompanyContext } = useCompany();
    const [selectedTab, setSelectedTab] = useState('CompanyInfo');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: company.name,
        email: company.email,
        phoneNumber: company.phoneNumber ? company.phoneNumber : 0,
        address: company.address ? company.address : "",
    });
    const [companyOrders, setCompanyOrders] = useState([]);
    const [companyCars, setCompanyCars] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [messages, setMessages] = useState([]);

    // Function to fetch requests for the user (moved out of useEffect)
    const handleGetreq = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/onecompanyreqs/${company.id}`);
            console.log("requests for this user are", response.data);
            setCompanyOrders(response.data);
        } catch (error) {
            console.error("Error fetching request:", error.response ? error.response.data : error.message);
        }
    };

    const handleGetcars = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/cars/companycars/${company.id}`);
            console.log("cars for this company are", response.data);
            setCompanyCars(response.data);
        } catch (error) {
            console.error("Error fetching request:", error.response ? error.response.data : error.message);
        }
    };

    // Fetch messages for a specific room
    const handleGetMessages = async (roomId) => {
        try {
            const response = await axios.get(`http://localhost:8080/chat/messages/${roomId}`);
            console.log("Fetched messages:", response.data);
            setMessages(response.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);  // Set the selected image file
        console.log('Selected file:', file);
    };

    const uploadImageToServer = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://localhost:8080/api/upload', formData); // Your backend upload URL
        return response.data.url; // URL of the uploaded image
    };

    const handleUpdateImage = async () => {
        if (!imageFile) {
            alert('Please select an image to upload.');
            return;
        }

        try {
            const imageUrl = await uploadImageToServer(imageFile);
            const response = await axios.put(`http://localhost:8080/company/updateCompany/${company.id}`, { image: imageUrl });
            console.log('Update user response:', response.data);
            updateCompanyContext(response.data);
            console.log('Image updated successfully:', response.data);
            setFormData({ ...formData, image: imageUrl });
            setImageFile(null);  // Reset selected image after upload
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/company/updateCompany/${company.id}`, formData);
            updateCompanyContext(response.data);
            console.log('Company updated successfully:', response.data);
            setIsEditing(false);
            setSelectedTab('CompanyInfo');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleCancelRequest = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/updaterequest/${requestId}`, {
                status: "Canceled"
            });
            await handleGetreq();  // Refresh the requests after update
            console.log('Request updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    const handleConfirmRequest = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/updaterequest/${requestId}`, {
                status: "Confirmed"
            });
            await handleGetreq();  // Refresh the requests after reorder
            console.log('Request updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    const handleDeliverRequest = async (requestId) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/updaterequest/${requestId}`, {
                status: "Delivered"
            });
            await handleGetreq();  // Refresh the requests after reorder
            console.log('Request updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'OrdersReceived':
                return <ReceivedOrders companyOrders={companyOrders} handleCancelRequest={handleCancelRequest} handleConfirmRequest={handleConfirmRequest} handleDeliverRequest={handleDeliverRequest} />;
            case 'Cars':
                return <CompanyCars companyCars={companyCars} />;
            case 'Messages':
                return <Messages messages={messages} />;
            case 'EditUserInfo':
                return <EditUserInfo formData={formData} handleChange={handleChange} handleUpdate={handleUpdate} />;
            default:
                return <CompanyInfo company={company} onEdit={() => { setIsEditing(true); setSelectedTab('EditCompanyInfo'); }} />;
        }
    };

    // A hidden file input that can be triggered by the ImagePlus button
    const fileInputRef = React.createRef();

    useEffect(() => {
        handleGetreq(); // Initial fetch when component mounts
    }, [company.id]);  // Dependencies: runs again if user.id changes

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="company-info">
                    {company.image || imageFile ? (
                        <div className="image-upload-section">
                            <img
                                src={company.image || URL.createObjectURL(imageFile)} // Use the uploaded image or the selected file
                                alt={`${company.name}'s profile`}
                                className="sidebar-profile-image"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}  // Reference for the input
                                style={{ display: 'none' }}  // Hide the file input
                            />
                            <ImagePlus
                                onClick={() => fileInputRef.current.click()} // Trigger the file input click event
                                size={24}
                                style={{ cursor: 'pointer' }}  // Style it to look clickable
                            />
                            {imageFile && <ImageDown onClick={handleUpdateImage} />}
                        </div>
                    ) : (
                        <div className="image-upload-section">
                            <UserRound className="avatar" style={{ color: "black", backgroundColor: "grey", width: "100px", height: "100px" }} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                            />
                            <ImagePlus
                                onClick={() => fileInputRef.current.click()}
                                size={24}
                                style={{ cursor: 'pointer' }}
                            />
                            <button onClick={handleUpdateImage}>Update Image</button>
                        </div>
                    )}
                    <h2>{company.name}</h2>
                </div>
                <ul className="sidebar-menu">
                    <li onClick={() => setSelectedTab('CompanyInfo')}><BadgeInfo style={{ marginRight: "10px" }} />Company Info</li>
                    <li onClick={() => { setSelectedTab('OrdersReceived'); handleGetreq(); }}><FileStack style={{ marginRight: "10px" }} />Orders Received</li>
                    <li onClick={() => { setSelectedTab('Cars'); }}><Car  style={{ marginRight: "10px" }} />Company Cars</li>
                    <li onClick={() => { setSelectedTab('Messages'); handleGetMessages(1) }}><MessageCircle style={{ marginRight: "10px" }} />Messages</li>
                </ul>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default CompanyProfile;
