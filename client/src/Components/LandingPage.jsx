import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsCss/LandingPage.css"; 


const LandingPage = () => {
    const navigate = useNavigate()
  return (
    <div className="landing-body">
    <div className="landing-container">
      <div className="section" onClick={()=>navigate("/signup")}>
        <h2>Join us as a User</h2>
        <p>Rent cars easily from verified owners with the click of a button. Get started today!</p>
        <button>Sign Up as User</button>
      </div>

      <div className="section" onClick={()=>navigate("/SignupCompany")}>
        <h2>Join us as a Company</h2>
        <p>Expand your fleet and reach more customers by listing your cars with us.</p>
        <button>Sign Up as Company</button>
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
