import React , { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../ComponentsCss/User/MainPage.css"


const Companies = () => {

const [companyData,setCompanyData] = useState([])
const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:8080/company/getAllCompanies`)
        .then((response)=>{
            setCompanyData(response.data)
        })
        .catch((error)=>{
            console.log("error is ", error) 
        })
  },[])

// const allcompanies = [...new Set(companyData.map((element)=>{
//   return getCompanyName(element.companyId)
// }))]


  return (
      <div className="companies">

    {companyData.map((element, index) => (
        <div className="company-container" key={index}>
            <div
                className="company"
                onClick={() => navigate("/onecompany", { state: element })}>
                <div className="namehead-company">
                    <h1>{element.name}</h1>
                </div>
                <div className="other-specs-company">
                    <p>Located at {element.address}</p>
                    <p>{element.phoneNumber}</p>
                    <p>{element.website}</p>
                    <p>{element.email}</p>
                    <p>Renting license since {element.licenssinceWhen}</p>
                    <p>Legal Entity Identifier {element.lei}</p>
                </div>
            </div>
        </div>
    ))}
</div>)
}

export default Companies