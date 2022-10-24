import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import CleanerCard from './Cleaner/CleanerCard';

export default function Home({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  const [arrayCleaner, setArrayCleaner] = useState([1, 2, 3, 4, 5])
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <div>
      <div style={{ backgroundColor: "#107ACA", paddingLeft: "20%" }}>
        <p style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>Find an appointment with our cleaning staff</p>
        <div>
          <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
          <button>Search</button>
        </div>
      </div>
      <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"flex-start"}}>
        {arrayCleaner.length !== 0 && arrayCleaner.map(cleaner => {
          return (
            <div key={cleaner} style={{ maxWidth: "200", minWidth: "300px" }}>
              <CleanerCard />
            </div>
          )
        })}
      </div>

    </div>
  )
}
