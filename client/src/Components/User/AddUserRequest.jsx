import React , { useEffect , useState } from 'react'
import { useNavigate,useLocation } from "react-router-dom"
import { useUser } from '../../UserProvider';
import axios from "axios";
import "../../ComponentsCss/User/AddUserRequest.css"

const AddUserRequest = () => {

    
    const location = useLocation()
    const cartoOrder = location.state
    const pricePerDay = cartoOrder?.price||0;
    const { user } = useUser();

    const [cname,setCname] = useState(cartoOrder.Name)
    const [rname,setRname] = useState(user?user.userName:"")
    const [remail,setRemail] = useState(user? user.email : "")
    const [pnumber,setPnumber] = useState(user? user.phoneNumber : "")
    const [byear,setByear] = useState(user? user.dateOfBirth : "")
    const [lyear,setLyear] = useState(user? user.dateOfLicense : "")
    const [pdate,setPdate] = useState("")
    const [rdate,setRdate] = useState("")
    const [tprice,setTprice] = useState(0)

    const navigate = useNavigate()

    const calculateTotalPrice = () => {
        if (pdate && rdate) {
            const pickupDate = new Date(pdate);
            const returnDate = new Date(rdate);
            const timeDifference = returnDate - pickupDate; 
            const dayDifference = timeDifference / (1000 * 3600 * 24); 

            if (dayDifference > 0) {
                setTprice(dayDifference * pricePerDay);
            } else {
                setTprice(0); 
            }
        }
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [pdate, rdate]); 


    const handleadd = ()=>{
        axios.post("http://localhost:8080/api/addrequest",{
            carName:cname,
            requestername:rname,
            email:remail,
            phoneNumber:pnumber,
            dateOfBirth:byear,
            dateOfLicense:lyear,
            pickupDate:pdate,
            returnDate:rdate,
            totalPrice:tprice,
            userId:user?user.id:null,
            companyId:cartoOrder.companyId
        }).then((response)=>{
            console.log("Request added!");
            navigate("/reqsubmitted")
        })
        .catch((error)=>{
            console.log("Error status: ", error.response?.status);
    console.log("Error data: ", error.response?.data);
    console.log("Error message: ", error.message);  
        })

    }
  return (
    <>
    <div className="requestform-body" style={{ backgroundImage: `url(${cartoOrder.image})`,
    backgroundRepeat: 'no-repeat', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center'}}>
              <form className="requestform" action="">
                <label className='request-label'> Car Name : </label>
                <input type="text" className='input-request' value={cname} onChange={(e)=>{setCname(e.target.value)}}/><br />
                <label className='request-label'> Your Name : </label>
                <input type="text" className='input-request' value={rname}  onChange={(e)=>{setRname(e.target.value)}}/><br />
                <label className='request-label'>* email : </label>
                <input type="text" className='input-request' value={remail} onChange={(e)=>{setRemail(e.target.value)}}/><br />
                <label className='request-label'>Phone Number (optional) : </label>
                <input type="text" className='input-request' value={pnumber} onChange={(e)=>{setPnumber(e.target.value)}}/><br />
                <label className='request-label'>* Birth Year : </label>
                <input type="text" className='input-request' value={byear} onChange={(e)=>{setByear(e.target.value)}}/><br />
                <label className='request-label'>* Year where you obtained your license : </label>
                <input type="text" className='input-request' value={lyear} onChange={(e)=>{setLyear(e.target.value)}}/><br />
                <label className='request-label'>* Pickup Date : </label>
                <input type="date" className='input-request' onChange={(e)=>{setPdate(e.target.value)}}/><br />
                <label className='request-label'>* Return Date : </label>
                <input type="date" className='input-request' onChange={(e)=>{setRdate(e.target.value)}}/><br />
              </form>
              <div className='submit-div'>
              <p className='totalprice'>Your total Price is : {tprice} DT</p>
              <button className="submitRequest" onClick={()=>{handleadd()}}>Submit</button>
              </div>
            </div>
            
            </>
  )
}

export default AddUserRequest