import React, { useEffect, useState } from 'react';
import { useUser } from '../../../UserProvider';
import { UserRound, BadgeInfo, FileStack, Bell, MessageCircle, ImagePlus, ImageDown } from 'lucide-react';
import moment from "moment";
import axios from 'axios';
import EditUserInfo from './EditUserInfo';
import Messages from './Messages';
import Notifications from './Notifications';
import OrderHistory from './OrderHistory';
import UserInfo from './UserInfo';
import "../../../ComponentsCss/User/UserProfile.css";

const UserProfile = () => {
    const { user, updateUserContext } = useUser();
    const [selectedTab, setSelectedTab] = useState('UserInfo');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber ? user.phoneNumber : 0,
        address: user.address ? user.address : "",
    });
    const [userreqs, setUserreqs] = useState([]);
    const [imageFile, setImageFile] = useState(null);  // Track selected image
    const [messages, setMessages] = useState([]);

    const handleGetreq = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/oneuserreqs/${user.id}`);
            console.log("requests for this user are", response.data);
            setUserreqs(response.data);
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
        const response = await axios.post('http://localhost:8080/api/upload', formData); 
        return response.data.url; 
    };

    const handleUpdateImage = async () => {
        if (!imageFile) {
            alert('Please select an image to upload.');
            return;
        }

        try {
            const imageUrl = await uploadImageToServer(imageFile);
            const response = await axios.put(`http://localhost:8080/api/updateuser/${user.id}`, { image: imageUrl });
            console.log('Update user response:', response.data);
            updateUserContext(response.data);
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
            const response = await axios.put(`http://localhost:8080/api/updateuser/${user.id}`, formData);
            updateUserContext(response.data);
            console.log('User updated successfully:', response.data);
            setIsEditing(false);
            setSelectedTab('UserInfo');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };


    const renderContent = () => {
        switch (selectedTab) {
            case 'OrderHistory':
                return <OrderHistory userreqs={userreqs} handleGetreq={handleGetreq}/>;
            case 'Notifications':
                return <Notifications userreqs={userreqs} />;
            case 'Messages':
                return <Messages messages={messages} setMessages={setMessages} currentUserId={user.id} />;
            case 'EditUserInfo':
                return <EditUserInfo formData={formData} handleChange={handleChange} handleUpdate={handleUpdate} />;
            default:
                return <UserInfo user={user} onEdit={() => { setIsEditing(true); setSelectedTab('EditUserInfo'); }} />;
        }
    };

    // A hidden file input that can be triggered by the ImagePlus button
    const fileInputRef = React.createRef();

    useEffect(() => {
        handleGetreq(); // Initial fetch when component mounts
    }, [user.id]);  

    return (
        <div className="dashboard">
            <div className="sidebar">
                <div className="user-info">
                    {user.image || imageFile ? (
                        <div className="image-upload-section">
                            <img
                                src={user.image || URL.createObjectURL(imageFile)} // Use the uploaded image or the selected file
                                alt={`${user.userName}'s profile`}
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
                                onClick={() => fileInputRef.current.click()} 
                                size={24}
                                style={{ cursor: 'pointer' }}  
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
                    <h2>{user.userName}</h2>
                </div>
                <ul className="sidebar-menu">
                    <li onClick={() => setSelectedTab('UserInfo')}><BadgeInfo style={{ marginRight: "10px" }} />User Info</li>
                    <li onClick={() => { setSelectedTab('OrderHistory'); handleGetreq(); }}><FileStack style={{ marginRight: "10px" }} />Order History</li>
                    <li onClick={() => { setSelectedTab('Notifications'); }}><Bell style={{ marginRight: "10px" }} />Notifications</li>
                    <li onClick={() => { setSelectedTab('Messages'); handleGetMessages(1) }}><MessageCircle style={{ marginRight: "10px" }} />Messages</li>
                </ul>
            </div>
            <div className="content">
                {renderContent()}
            </div>
        </div>
    );
};

export default UserProfile;
