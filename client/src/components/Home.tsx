import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";

export default function Home({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchValueCity, setSearchValueCity] = useState<string>("");
  const [array , setArray] = useState<Array <any>>([]);
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  useEffect(() => {
    console.log(array)
  }, [array]);
  const searchByCleaner = ()=>{
    alert(`searching for, ${searchValue}`);
  }
  const searchByCity = ()=>{
    api.get(`/cleaner/getCleanerByCity/${searchValueCity}`)
        .then(response => {setArray(response.data)})
  }

  return (
    <div style={{ backgroundColor: "#107ACA", paddingLeft: "20%" }}>
      <p style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>Find an appointment with our cleaning staff</p>
      <div style={{display:"flex" , flexDirection:"row"}}>
        <div style={{ backgroundColor: "#107ACA", paddingLeft: "20%" }}>
          <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Name or Username" />
          <button onClick={()=>searchByCleaner()}>Search By Cleaner</button>
        </div>
        <div>
          <input type="text" value={searchValueCity} onChange={(e) => setSearchValueCity(e.target.value)} placeholder="City" />
          <button onClick={()=>searchByCity()} >Search By City</button>
        </div>
      </div>
      
      <div style={{display:"flex" , flexDirection:"row"}}>
        <p style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>Find an appointment with our cleaning staff</p>
      </div>
    </div>
    
  )
}
