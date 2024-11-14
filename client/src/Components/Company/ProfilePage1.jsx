import React, { useState,useEffect } from 'react'
import axios from "axios"

const ProfilePage = () => {
  const[cars,setCars]=useState([])
  const [companies,setCompanies]=useState([])
  const[selectedCompagnieId,setSelectedCompagnieId]=useState(null)
  useEffect(()=>{
    const callListCars=async()=>{
      try{
        const res=await axios.get("http://localhost:8080/cars/allcars")
      // console.log(cars)
      setCars(res.data)
      }catch(error){
        console.log(error);
        
      }
    }

    const callListCompanies=async()=>{
      try{
        const res= await axios.get("http://localhost:8080/company/getAllCompanies")
        // console.log(companies);
        
      setCompanies(res.data)
      }catch(error){
        console.log(error);
        
      }
    };

    callListCars();
    callListCompanies();

  },[])

  const handeldelete=async(id)=>{
    try{

      await axios.delete("http://localhost:8080/cars/deleteCar/"+id)
      window.location.reload()
    }catch(error){
      console.log(error);
      
    }
  }
  const filteredCars=selectedCompagnieId
  ?cars.filter(car=> car.companyId===selectedCompagnieId):cars;
  
   return (
    <div>
      <h1>ProfilePage</h1>
      <select onChange={(e)=> setSelectedCompagnieId(Number(e.target.value))}>
        <option value="">Select company</option>
        {companies.map((element)=>(
          <option key={element.id} value={element.id}>{element.name}</option>
          
        ))}
        
      </select>

      <div>
      {filteredCars.map((element,key)=>{
      return(
          <div className='carComp' key={element.id}>
            <h2>{element.Name}</h2>
            <p>{element.price}TND</p>
            <img src={element.image} alt={element.Name}/>
            <button className="deleteCarCompagnie" onClick={()=>handeldelete(element.id)}>Delete</button>
            {/* <button className="updateCarCompagnie" onClick={handelClick}> Update</button> */}
          </div> )
      })}
    </div>
    
    </div>
  )
}

export default ProfilePage