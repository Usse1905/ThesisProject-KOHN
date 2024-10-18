import React , { useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
const [data,setData] = useState([])
const [filteredData,setFilteredData]=useState([])
const [refresh,setRefresh] = useState(false)
const [cartype,setCartype] = useState("")
const [shift,setShift] = useState("")
const [ac,setAc] = useState("")
const [companyid,setCompanyid] = useState("")
const [search,setSearch] = useState("")
const [sortOrder,setSortOrder] = useState("")

const navigate = useNavigate()

  useEffect(()=>{
    axios.get(`http://localhost:8080/api/allcars`)
        .then((response)=>{
            console.log("data is ", response.data)
            setData(response.data)
        })
        .catch((error)=>{
            console.log("error is ", error) 
        })
  },[refresh])
console.log(data);

  useEffect(()=>{
    let filterData = ()=>{
        let result = data
        if(search){
            result = result.filter((item)=>{
                return item.Name.toLowerCase().includes(search.toLowerCase())
            })
        }

        if(cartype){
            result = result.filter((item)=>{
              return item.carType === cartype
            })
        }

        if(shift){
            result = result.filter((item)=>{
        return item.shift === shift
            })
        }

        if(ac){
            result = result.filter((item)=>{
      return item.ac === ac
            })
        }

        if(companyid){
            result = result.filter((item)=>{
      return item.companyId === companyid
            })
        }

        // if (sortOrder) {
        //   result = result.sort((a, b) => {
        //     if (sortOrder === "priceHigh") return b.price - a.price;
        //     if (sortOrder === "priceLow") return a.price - b.price;
        //     if (sortOrder === "yearHigh") return b.year - a.year;
        //     if (sortOrder === "yearLow") return a.year - b.year;
        //     if (sortOrder === "mileageHigh") return b.mileage - a.mileage;
        //     if (sortOrder === "mileageLow") return a.mileage - b.mileage;
        //     return 0;
        //   });
        // }

        setFilteredData(result)
    }

    filterData()

},[search,cartype,data,shift,ac,companyid])

const handleSortChange = (e) => {
  setSortOrder(e.target.value);
};

const alltypes = [...new Set(data.map((element)=>{
  return element.carType
}))]

const allshift = [...new Set(data.map((element)=>{
  return element.shift
}))]

const allac = [...new Set(data.map((element)=>{
  return element.ac
}))]

const allcompanies = [...new Set(data.map((element)=>{
  return element.companyId
}))]


  return (
    <div className="main">
      <div className="filters">
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort by price</option>
          <option value="priceLow">Most expensive</option>
          <option value="priceHigh">Cheapest</option>
        </select> 
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort by Year</option>
          <option value="yearLow">Oldest to Newest</option>
          <option value="yearHigh">Newest to Oldest</option>
        </select>
        <select onChange={handleSortChange} value={sortOrder}>
          <option value="">Sort by Mileage</option>
          <option value="mileageLow">Less Used</option>
          <option value="mileageHigh">Most Used</option>
        </select>
        <select onChange={(e)=>setCartype(e.target.value)} value={cartype}>
          <option value="">Choose Car Type</option>
          {alltypes.map((el)=>(
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
        <select onChange={(e)=>setShift(e.target.value)} value={shift}>
          <option value="">Choose Transmission</option>
          {allshift.map((el)=>(
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
        <select onChange={(e)=>setAc(e.target.value)} value={ac}>
          <option value="">Choose A/C</option>
          {allac.map((el)=>(
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
        <select onChange={(e)=>setCompanyid(e.target.value)} value={companyid}>
          <option value="">Choose Company</option>
          {allcompanies.map((el)=>(
            <option key={el} value={el}>{el}</option>
          ))}
        </select>
      </div>
      <div  className="cars">
        {(search || cartype || shift || ac || companyid ? filteredData : data).map((element,index)=>{
          return <>
          <div className="car" onClick={()=>navigate("/one",{ state:element })}>
            <div className="namehead"><h1>{element.Name}</h1></div>
            <div className="other-specs">
              <p>from {element.companyId}</p>
              <p>{element.carType}</p>
              <p>{element.shift}</p>
              <p>{element.ac}</p>
            </div>
            <div className="price"><h1>{element.price} TND/Day</h1></div>
          </div>
          </>
        })}
      </div>
    </div>
  )
}

export default MainPage