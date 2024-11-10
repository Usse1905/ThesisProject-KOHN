import {React,useState} from 'react'
import { useNavigate} from 'react-router-dom'
import axios from "axios"
import "../../../src/App.css"
// import {image} from "cloudinary-react"


const AddCar=()=>{
  // states:
  const[Name,setName]=useState("");
  const[image,setImage]=useState("");
  const[price,setPrice]=useState("");
  const[carType,setCarType]=useState("");
  const[mileage,setMileage]=useState("");
  const[year,setYear]=useState("");
  const[shift,setShift]=useState("");
  const[ac,setAc]=useState("");
  const [loading, setLoading] = useState(false); // Loading state for image upload
  
    const navigate=useNavigate()

    const handleImageUpload=async(e)=>{
      const files = e.target.files
      const data= new FormData
      data.append('file',files[0])
    data.append('upload_preset','haddafile')
    setLoading(true)

    const res= await fetch("https://api.cloudinary.com/v1_1/dudsmjblj/image/upload",
      {
      method:'POST',
      body:data
    })
    const file=await res.json()
    console.log(file)
    setImage(file.secure_url)
    setLoading(false)
    }
    const handelSubmit=async(e)=>{
    e.preventDefault()


    console.log("Submitting Car Data:", { Name, image, price, carType, mileage, year, shift, ac });

    try{
      await axios.post("http://localhost:8080/cars/addCar",{
        Name,
        image,
        price,
        carType,
        mileage,
        year,
        shift,
        ac,
        
      })
      navigate("/")
    console.log('car added succefully',res.data);
    // reseting dorm fields
        setName("")
        setImage("")
        setPrice("")
        setCarType("")
        setMileage("")
        setYear("")
        setShift("")
        setAc("")
        // setCompanyId("")

    }catch(error){
      console.error("error saving Car in database",error.res || error.message);
    alert('Failed to save book in database')

    }finally {
      setFormLoading(false); // End form submission loading
    }
    };


return(
  <div className="containerCar">
      <h1 className='detailCar'> Add Car</h1>
      <form className='bodyForm' onSubmit={handelSubmit} >
      <label className="label-car" htmlFor="Name">Name</label>
      <input  className="input-propCar" type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)} name="Name" value={Name}/>
      <label className="label-car" htmlFor="Name">Price</label>
      <input className="input-propCar" type="number" placeholder="price" onChange={(e)=>setPrice(e.target.value)} name="price" value={price} />
      <label className="label-car" htmlFor="Name">Car Type</label>
      <input className="input-propCar"  type="text" placeholder="carType" onChange={(e)=>setCarType(e.target.value)} name="carType" value={carType}/>
      <label className="label-car" htmlFor="Name">Mileage</label>
      <input className="input-propCar" type="number" placeholder="mileage" onChange={(e)=>setMileage(e.target.value)} name="mileage" value={mileage}/>
      <label className="label-car" htmlFor="Name">Yer</label>
      <input  className="input-propCar" type="number" placeholder="year" onChange={(e)=>setYear(e.target.value)} name="year" value={year}/>
      <label className="label-car" htmlFor="Name">Shift</label>
      <input className="input-propCar" type="text" placeholder="shift" onChange={(e)=>setShift(e.target.value)} name="shift" value={shift}/>
      <label className="label-car" htmlFor="Name">AC</label>
      <input className="input-propCar" type="text" placeholder="ac" onChange={(e)=>setAc(e.target.value)} name="ac" value={ac}/>
      <label className="label-car" htmlFor="Name">Image</label>
      <input id="fileInput" type="file" name="image" placeholder="Upload Image" onChange={handleImageUpload}/>
       {
        loading?(
          <h3>Loading ...</h3>
        ):(
          <img src={image} style={{width:'300px'}}/>
        )
       }
       
       
  <button className="addCar" type="submit">Submit</button>
  </form>
  </div>
)
}


export default AddCar