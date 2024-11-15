import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';  // Required CSS for Leaflet
import "../../../ComponentsCss/User/DirectionsMap.css";  // Your styles

const DirectionsMap = ({ companyAddress, userAddress }) => {
    // States for coordinates, error message, and loading status
    const [pickupCoords, setPickupCoords] = useState(null);
    const [rentalCoords, setRentalCoords] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true); // Loading state for map data
    const [zoom, setZoom] = useState(16); // Default zoom level

    console.log("This is the company address", companyAddress);
    console.log("This is the user address", userAddress);

    // Function to geocode an address using Nominatim API (OpenStreetMap)
    const geocodeAddress = async (address) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`
            );
            const data = await response.json();
            if (data && data.length > 0) {
                const { lat, lon } = data[0];  // Extract latitude and longitude
                return [parseFloat(lat), parseFloat(lon)]; // Return as [lat, lon]
            } else {
                throw new Error("Address not found.");
            }
        } catch (error) {
            console.error("Geocoding error:", error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            setLoading(true);
            try {
                setErrorMessage("");  // Reset error message on each fetch attempt

                // Get pickup coordinates (company address)
                const pickupCoords = await geocodeAddress(companyAddress);
                if (pickupCoords) {
                    setPickupCoords(pickupCoords);
                } else {
                    setErrorMessage("Pickup coordinates not found.");
                    console.error("Pickup coordinates not found.");
                }

                // Get rental coordinates (user address)
                const rentalCoords = await geocodeAddress(userAddress);
                if (rentalCoords) {
                    setRentalCoords(rentalCoords);
                } else {
                    setErrorMessage("Rental coordinates not found.");
                    console.error("Rental coordinates not found.");
                }

                // Calculate the distance and adjust the zoom level
                if (pickupCoords && rentalCoords) {
                    const distance = calculateDistance(pickupCoords[0], pickupCoords[1], rentalCoords[0], rentalCoords[1]);
                    setZoom(calculateZoomLevel(distance));
                }
            } catch (error) {
                setErrorMessage("Error fetching coordinates.");
                console.error("Error fetching coordinates:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [companyAddress, userAddress]);  // Trigger when either address changes

    // Haversine formula to calculate the distance between two points (in km)
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in km
        return distance;
    };

    // Adjust the zoom level based on distance
    const calculateZoomLevel = (distance) => {
        if (distance < 1) {
            return 16; // Zoom level for very close locations (under 1 km)
        } else if (distance < 10) {
            return 14; // Zoom level for distances between 1 km and 10 km
        } else if (distance < 50) {
            return 12; // Zoom level for distances between 10 km and 50 km
        } else if (distance < 100) {
            return 10; // Zoom level for distances between 50 km and 100 km
        } else {
            return 8;  // Zoom level for distances over 100 km
        }
    };

    // Conditionally render the map once coordinates are available
    if (loading) {
        return <p>Loading map...</p>;
    }

    if (errorMessage) {
        return <p style={{ color: 'red' }}>{errorMessage}</p>;
    }

    // Calculate the center of the map (midpoint between the two locations)
    const center = [
        (pickupCoords[0] + rentalCoords[0]) / 2,
        (pickupCoords[1] + rentalCoords[1]) / 2
    ];

    return (
        <MapContainer
            center={center}  // Center the map between the two locations
            zoom={zoom}      // Dynamically calculated zoom
            style={{ height: '50vh', width: '100%' }}
        >
            {/* OpenStreetMap tiles */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />

            {/* Marker for Pickup Location */}
            {pickupCoords && (
                <Marker position={pickupCoords}>
                    <Popup>Pickup Point : {companyAddress}</Popup> {/* Display actual address in the popup */}
                </Marker>
            )}

            {/* Marker for Rental Location */}
            {rentalCoords && (
                <Marker position={rentalCoords}>
                    <Popup>Your position : {userAddress}</Popup> {/* Display actual address in the popup */}
                </Marker>
            )}
        </MapContainer>
    );
};

export default DirectionsMap;
