import React , { useEffect , useState } from 'react'
import { useNavigate,useLocation } from "react-router-dom"
import { useUser } from '../../UserProvider';
import axios from "axios";
import "../../ComponentsCss/OtherComponentsCss/AddUserRequest.css"

const AddUserRequest = () => {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [pnumber,setPnumber] = useState(0)
    const [byear,setByear] = useState()
    const [lyear,setLyear] = useState()
    const [pdate,setPdate] = useState("")
    const [rdate,setRdate] = useState("")
    const [tprice,setTprice] = useState(0)
    const { user } = useUser();

    const navigate = useNavigate()
    const location = useLocation()
    const cartoOrder = location.state
    const pricePerDay = cartoOrder?.price||0;

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
            carName:name,
            email:email,
            phoneNumber:pnumber,
            dateOfBirth:byear,
            dateOfLicense:lyear,
            pickupDate:pdate,
            returnDate:rdate,
            totalPrice:tprice
        }).then((response)=>{
            console.log("Request added!");
            navigate("/allcars")
        })
        .catch((error)=>{
            console.log("error is ", error);  
        })

    }
  return (
    <>
    <div className="requestform-body" >
              <form className="requestform" action="">
                <label className='request-label'> * Name : </label>
                <input type="text" className='input-request' defaultValue={cartoOrder.Name} onChange={(e)=>{setName(e.target.value)}}/><br />
                <label className='request-label'>* email : </label>
                <input type="text" className='input-request' defaultValue={user? user.email : ""} onChange={(e)=>{setEmail(e.target.value)}}/><br />
                <label className='request-label'>Phone Number (optional) : </label>
                <input type="text" className='input-request' onChange={(e)=>{setPnumber(e.target.value)}}/><br />
                <label className='request-label'>* Birth Year : </label>
                <input type="text" className='input-request' onChange={(e)=>{setByear(e.target.value)}}/><br />
                <label className='request-label'>* Year where you obtained your license : </label>
                <input type="text" className='input-request' onChange={(e)=>{setLyear(e.target.value)}}/><br />
                <label className='request-label'>* Pickup Date : </label>
                <input type="date" className='input-request' onChange={(e)=>{setPdate(e.target.value)}}/><br />
                <label className='request-label'>* Return Date : </label>
                <input type="date" className='input-request' onChange={(e)=>{setRdate(e.target.value)}}/><br />
              </form>
              <p className='totalprice'>Your total Price is : {tprice}</p>
            </div>
            <button className="submitRequest" onClick={()=>{handleadd()}}>Submit</button>
            </>
  )
}

export default AddUserRequest