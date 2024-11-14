import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../../src/App.css";

const AddCar = () => {
  
  const [Name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [mileage, setMileage] = useState("");
  const [year, setYear] = useState("");
  const [shift, setShift] = useState("");
  const [ac, setAc] = useState("");
  const [loading, setLoading] = useState(false); 

  const navigate = useNavigate();

  
  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'haddafile');
    setLoading(true);

    const res = await fetch("https://api.cloudinary.com/v1_1/dudsmjblj/image/upload", {
      method: 'POST',
      body: data
    });
    const file = await res.json();
    console.log(file);
    setImage(file.secure_url);
    setLoading(false);
  };

  
  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Car Data:", { Name, image, price, carType, mileage, year, shift, ac });

    try {
      await axios.post("http://localhost:8080/cars/addCar", {
        Name,
        image,
        price,
        carType,
        mileage,
        year,
        shift,
        ac,
        userId: 1
      });
      navigate("/");

      
      setName("");
      setImage("");
      setPrice("");
      setCarType("");
      setMileage("");
      setYear("");
      setShift("");
      setAc("");
    } catch (error) {
      console.error("Error saving car in database", error.response || error.message);
      alert('Failed to save car in database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerCar">
      
      <div className="image-upload-container">
        <div className="upload-message"> 
          <h1>Upload your image here</h1>
        </div>
        <input
          id="fileInput"
          type="file"
          name="image"
          onChange={handleImageUpload}
        />
        {loading ? (
          <h3>Loading ...</h3>
        ) : (
          image && <img src={image} alt="Car Preview" />
        )}
      </div>

      <form className="bodyForm" onSubmit={handelSubmit}>
        <h1 className="detailCar">Add Car</h1>
        <label className="label-car" htmlFor="Name">Name</label>
        <input
          className="input-propCar"
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          name="Name"
          value={Name}
        />
        <label className="label-car" htmlFor="price">Price</label>
        <input
          className="input-propCar"
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          name="price"
          value={price}
        />
        <label className="label-car" htmlFor="carType">Car Type</label>
        <input
          className="input-propCar"
          type="text"
          placeholder="Car Type"
          onChange={(e) => setCarType(e.target.value)}
          name="carType"
          value={carType}
        />
        <label className="label-car" htmlFor="mileage">Mileage</label>
        <input
          className="input-propCar"
          type="number"
          placeholder="Mileage"
          onChange={(e) => setMileage(e.target.value)}
          name="mileage"
          value={mileage}
        />
        <label className="label-car" htmlFor="year">Year</label>
        <input
          className="input-propCar"
          type="number"
          placeholder="Year"
          onChange={(e) => setYear(e.target.value)}
          name="year"
          value={year}
        />
        <label className="label-car" htmlFor="shift">Shift</label>
        <input
          className="input-propCar"
          type="text"
          placeholder="Shift"
          onChange={(e) => setShift(e.target.value)}
          name="shift"
          value={shift}
        />
        <label className="label-car" htmlFor="ac">AC</label>
        <input
          className="input-propCar"
          type="text"
          placeholder="AC"
          onChange={(e) => setAc(e.target.value)}
          name="ac"
          value={ac}
        />
        <button className="addCar" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCar;
