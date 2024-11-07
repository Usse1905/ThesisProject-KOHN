
import React, { useState } from 'react';
import "../ComponentsCss/OtherComponentsCss/AboutUs.css";

const AboutUs = ({ isAdmin }) => {
  const [aboutText, setAboutText] = useState(
    "Welcome to Tunisia Car Rentals, your trusted partner for convenient, reliable,\n\n" +
    " and affordable car rental services across Tunisia! Founded with a passion for connecting \n\n" +
     "travelers with the freedom to explore, we are dedicated to providing you with the perfect\n\n" +
     " vehicle to make your journey safe, comfortable, and unforgettable.\n\n" +
    "Whether you're visiting the bustling markets of Tunis, exploring the beautiful coastal\n\n" +
    " cities like Sousse and Monastir, or heading on a desert adventure in the south, our extensive \n\n" +
    " fleet of cars is ready to meet your needs. From compact city cars to luxury SUVs, we cater to \n\n" +
     "solo travelers, families, and groups alike, with options to fit every budget and style.\n\n" +
    "Our mission is to make car rental easy and accessible. That’s why we offer competitive pricing,\n\n" +
     "flexible pick-up and drop-off locations, and a seamless booking experience. Our team is available \n\n" +
    " around the clock to assist you with personalized service, ensuring that your experience with us is\n\n" +
     " hassle-free from start to finish.\n\n" +
    "Choose Tunisia Car Rentals for your next adventure, and let us help you discover the beauty of Tunisia \n\n" +
    "on your own terms. Your journey is our priority!"
  );

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(aboutText);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setAboutText(editedText);
    setIsEditing(false);
  };

  return (
    <div className="about-us">
      <h2>About Us</h2>
      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="about-edit-textarea"
        />
      ) : (
        <p>{aboutText}</p>
      )}

      {isAdmin && (
        <div className="edit-controls">
          {isEditing ? (
            <button onClick={handleSave} className="save-button">Save</button>
          ) : (
            <button onClick={handleEditToggle} className="edit-button">Edit</button>
          )}
          {isEditing && (
            <button onClick={handleEditToggle} className="cancel-button">Cancel</button>
          )}
        </div>
      )}
    </div>
  );
};

export default AboutUs;
