import React from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";


export default function CleanerCard({ cleaner }: { cleaner: any }) {
    const bio = "Salut test bio"
    const ville = "Paris"
    const rayon = "10 km"
    const joinDate = new Date();
    const navigate = useNavigate();
    const profilPicture = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    const redirectToProfil = () => {
        navigate("/book/" + cleaner.id)
    }
    return (
        <div style={{ width: "100%", border: "3px solid black", marginBottom: 10, marginTop: 10, borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "row" }}>
            <div style={{ backgroundColor: "#107ACA", width: "40%", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <p style={{ color: "white", fontWeight: "bold" }}>{cleaner.firstName.toUpperCase()} {cleaner.lastname.toUpperCase()}</p>
                <div style={{ width: "40%", padding: "4px", backgroundColor: "#0D4DFD", borderRadius: 1000 }}>
                    <img src={profilPicture} style={{ width: "100%", borderRadius: 1000, border: "1px solid black" }} />
                </div>
                <p style={{ color: "white", fontWeight: "bold" }}>{cleaner.city} / {cleaner.rayon} km</p>
            </div>
            <div style={{ backgroundColor: "white", width: "60%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                <p style={{ fontWeight: "bold" }}>Bio</p>
                <p>{cleaner.bio}</p>
                <div style={{ display: "flex", width: "100%", flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                <Button style={{ marginLeft: 10 }} onClick={() => redirectToProfil()} variant="outline-primary">Book</Button>
                    <div>Joined : {new Date(cleaner.joinDate).toLocaleDateString("fr-FR")}</div>
                </div>
            </div>
        </div >
    )
}
