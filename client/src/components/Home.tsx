import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Home({ isAuth }: { isAuth: boolean }) {
  const navigate = useNavigate();
  useEffect(() => {
    console.log("auth ?")
    if(isAuth === false) {
      navigate("/login");
    }
  }, [isAuth]);
  return (
    <div>Home</div>
  )
}
