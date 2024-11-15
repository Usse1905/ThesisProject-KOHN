import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../ComponentsCss/User/MainPage.css";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [cartype, setCartype] = useState("");
  const [shift, setShift] = useState("");
  const [ac, setAc] = useState("");
  const [companyid, setCompanyid] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/company/getAllCompanies`)
      .then((response) => {
        setCompanyData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cars/allcars`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [refresh]);

  useEffect(() => {
    const filterData = () => {
      let result = data;

      if (search) {
        result = result.filter((item) =>
          item.Name.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (cartype) {
        result = result.filter((item) => item.carType === cartype);
      }

      if (shift) {
        result = result.filter((item) => item.shift === shift);
      }

      if (ac) {
        result = result.filter((item) => item.ac === ac);
      }

      if (companyid) {
        result = result.filter((item) => item.companyId === companyid);
      }

      if (sortOrder) {
        if (sortOrder === "priceLow") {
          result.sort((a, b) => b.price - a.price);
        } else if (sortOrder === "priceHigh") {
          result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "yearHigh") {
          result.sort((a, b) => b.year - a.year);
        } else if (sortOrder === "yearLow") {
          result.sort((a, b) => a.year - b.year);
        } else if (sortOrder === "mileageHigh") {
          result.sort((a, b) => b.mileage - a.mileage);
        } else if (sortOrder === "mileageLow") {
          result.sort((a, b) => a.mileage - b.mileage);
        }
      }

      setFilteredData(result);
    };

    filterData();
  }, [search, cartype, data, shift, ac, companyid, sortOrder]);

  const handleSortChange = (e) => {
    setSortOrder(e);
  };

  const getCompanyName = (id) => {
    const company = companyData.find((comp) => comp.id === id);
    return company ? company.name : "Unknown Company";
  };

  const alltypes = [
    ...new Set(data.map((element) => {
      return element.carType;
    })),
  ];

  const allshift = [
    ...new Set(data.map((element) => {
      return element.shift;
    })),
  ];

  const allac = [
    ...new Set(data.map((element) => {
      return element.ac;
    })),
  ];

  const allcompanies = [
    ...new Set(data.map((element) => {
      return getCompanyName(element.companyId);
    })),
  ];

  return (
    <div className="main">
      {data.length > 0 && (
        <div className="filters">
          {/* Filters UI */}
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
            <option value="">Sort by price</option>
            <option value="priceLow">Cheapest</option>
            <option value="priceHigh">Most expensive</option>
          </select>
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
            <option value="">Sort by Year</option>
            <option value="yearLow">Oldest to Newest</option>
            <option value="yearHigh">Newest to Oldest</option>
          </select>
          <select onChange={(e) => handleSortChange(e.target.value)} value={sortOrder}>
            <option value="">Sort by Mileage</option>
            <option value="mileageLow">Less Used</option>
            <option value="mileageHigh">Most Used</option>
          </select>
          <select onChange={(e) => setCartype(e.target.value)} value={cartype}>
            <option value="">Choose Car Type</option>
            {alltypes.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <select onChange={(e) => setShift(e.target.value)} value={shift}>
            <option value="">Choose Transmission</option>
            {allshift.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <select onChange={(e) => setAc(e.target.value)} value={ac}>
            <option value="">Choose A/C</option>
            {allac.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
          <select onChange={(e) => setCompanyid(e.target.value)} value={companyid}>
            <option value="">Choose Company</option>
            {allcompanies.map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="cars">
        {(search || cartype || shift || ac || companyid ? filteredData : data).map((element, index) => (
          <div className="car-card" key={index} onClick={() => navigate("/one", { state: element })}>
            <div
              className="car-image"
            ><img src={element.image} alt="" /></div>
            <div className="car-details">
              <h2 className="car-name">{element.Name}</h2>
              <p className="company">from {getCompanyName(element.companyId)}</p>
              <p className="car-type" style={{color:"black"}}>{element.carType}</p>
              <p className="transmission" style={{color:"black"}}>{element.shift}</p>
              <p className="ac" style={{color:"black"}}>{element.ac}</p>
              <h3 className="price">{element.price} TND/Day</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
