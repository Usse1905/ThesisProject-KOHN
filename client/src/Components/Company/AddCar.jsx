import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const AddCar = () => {
const[car,setCar]=useState({
Name:"",
image:"",
price:"",
carType:"",
mileage:"",
year:"",
shift:"",
ac:"",
companyId:""
})

const handleChange=(e)=>{
  setCar((prev)=>({...prev,[e.target.name]:e.target.value}))
}
const handelClick=async(e)=>{
e.preventDefault()
try{
  await axios.post("http://localhost:8080/cars/addCar",car)
  Navigate("/")
}catch(error){
  console.log(erro);
}
}
 
}

export default AddCar