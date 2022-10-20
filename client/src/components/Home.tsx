import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <div style={{ backgroundColor: "#107ACA", paddingLeft: "20%" }}>
      <p style={{ color: "white", fontWeight: "bold", fontSize: 45 }}>Find an appointment with our cleaning staff</p>
      <div>
        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
        <button>Search</button>
      </div>
    </div>
  )
}
