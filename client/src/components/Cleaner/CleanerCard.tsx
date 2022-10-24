import React from 'react'

export default function CleanerCard() {
    const nom = "Theret"
    const prenom = "Guillaume"
    const bio = "Salut test bio"
    const ville = "Paris"
    const rayon = "10 km"
    const joinDate = new Date();
    const profilPicture = "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";
    return (
        <div style={{ width: "100%", border: "3px solid black", marginBottom: 10, marginTop: 10, borderRadius: "10px", overflow: "hidden", display: "flex", flexDirection: "row" }}>
            <div style={{ backgroundColor: "#107ACA", width: "40%", padding: "10px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                <p style={{ color: "white", fontWeight: "bold" }}>{prenom.toUpperCase()} {nom.toUpperCase()}</p>
                <div style={{ width: "40%", padding: "4px", backgroundColor: "#0D4DFD", borderRadius: 1000 }}>
                    <img src={profilPicture} style={{ width: "100%", borderRadius: 1000, border: "1px solid black" }} />
                </div>
            </div>
            <div style={{ backgroundColor: "white", width: "60%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }}>
                <p style={{ fontWeight: "bold" }}>Bio</p>
                <p>{bio}</p>
                <p>Joined : {joinDate.toLocaleDateString("fr-FR")}</p>
            </div>
        </div >
    )
}
