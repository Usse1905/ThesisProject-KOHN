import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import "../../../ComponentsCss/User/UserProfile.css"

const EditCompanyInfo = ({ formData, handleChange, handleUpdate }) => {
    const [address, setAddress] = useState(null); // To store the lat/lng or address
    const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default to some initial location

    // Function to reverse geocode the user's address into latitude/longitude
    const geocodeAddress = (address) => {
        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    setUserLocation([parseFloat(lat), parseFloat(lon)]); // Set the user's location on the map
                }
            })
            .catch((error) => {
                console.error('Error fetching geocode data:', error);
            });
    };

    // When the component mounts or the form data changes (i.e., address), geocode the user's address
    useEffect(() => {
        if (formData.address) {
            geocodeAddress(formData.address);
        }
    }, [formData.address]); // Re-run if the address changes

    // Custom hook to update the map view when the user's location changes
    function MapUpdater() {
        const map = useMap(); // Access the map instance
        useEffect(() => {
            if (userLocation) {
                map.setView(userLocation, 13); // Center the map on the user's location (zoom level 13)
            }
        }, [userLocation, map]); // Only re-run when userLocation changes

        return null;
    }

    // Handle map click to update address
    function MapClickHandler() {
        useMapEvent('click', (event) => {
            const { lat, lng } = event.latlng; // Get lat/lng from map click
            console.log(`Map clicked at latitude: ${lat}, longitude: ${lng}`); // Log for debugging
            setAddress({ lat, lng });

            // Reverse geocode to get the address from lat/lng
            fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)
                .then((response) => response.json())
                .then((data) => {
                    if (data && data.display_name) {
                        handleChange({ // Update the parent state with the geocoded address
                            target: {
                                name: 'address',
                                value: data.display_name, // Use the human-readable address
                            },
                        });
                        console.log('Address found:', data.display_name); // Log for debugging
                    }
                })
                .catch((error) => {
                    console.error('Error fetching address:', error);
                });
        });

        return null;
    }

    return (
        <div className="edit-company-form">
            <h2>Edit Company Info</h2>
            <form  >
                <label className='form-label'>Company Name:</label>
                <input
                    type="text"
                    name="userName"
                    value={formData.name}
                    onChange={handleChange}
                    className='form-input'
                />
                <label className='form-label'>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className='form-input'
                />
                <label className='form-label'>Phone Number:</label>
                <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className='form-input'
                />
</form>
                {/* Render map */}
                <label className='form-label'>Address:</label>
                <div style={{ height: '300px', width: '100%' }}>
                    <MapContainer
                        center={userLocation} // Center map on user's location (from address)
                        zoom={13} // Adjust zoom level as needed
                        style={{ width: '100%', height: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <MapUpdater /> {/* Custom hook to update map view */}
                        <MapClickHandler /> {/* Handle map click for address update */}
                        {address && (
                            <Marker position={[address.lat, address.lng]}>
                                <Popup>
                                    Latitude: {address.lat}, Longitude: {address.lng}
                                </Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>

                {/* Display selected address if available */}
                {formData.address && <p>Selected Address: {formData.address}</p>}

                <button type="submit" className='submit-button' onClick={handleUpdate}>Save</button>
            
        </div>
    );
};

export default EditCompanyInfo;
