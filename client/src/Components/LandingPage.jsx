import React from "react";
import { useNavigate } from "react-router-dom";
import "../ComponentsCss/LandingPage1.css"; 

const LandingPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="landing-body">
            <div className="landing-container">
                {/* Top Half */}
                <div className="top-half">
                    <div className="left-side">
                        
                        <img src="https://media.istockphoto.com/id/187062319/photo/teen-driver-getting-car-keys.jpg?s=612x612&w=0&k=20&c=j9wtESTAayYWs_8lTItPmuX5DzphIV4Zh2iiaFH89e4=" alt="Car Image" className="landing-image" />
                    </div>
                    <div className="right-side">
                        <div className="section" onClick={() => navigate("/signup")}>
                            <h2>Join us as a User</h2>
                            <p>Rent cars easily from verified owners with the click of a button. Get started today!</p>
                            <button>Sign Up as User</button>
                        </div>
                    </div>
                </div>

                {/* Bottom Half */}
                <div className="bottom-half">
                    <div className="left-side">
                        <img src="https://t3.ftcdn.net/jpg/03/28/82/42/360_F_328824244_h8ln41Hd3sh985TASxWVMmZ2w5LYSYvz.jpg" alt="Company Image" className="landing-image" />
                    </div>
                    <div className="right-side">
                        <div className="section" onClick={() => navigate("/SignupCompany")}>
                            <h2>Join us as a Company</h2>
                            <p>Expand your fleet and reach more customers by listing your cars with us.</p>
                            <button>Sign Up as Company</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
