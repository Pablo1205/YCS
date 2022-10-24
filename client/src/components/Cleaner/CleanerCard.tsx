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
        <div style={{width: "100%"}}>
            <div>
                <p>{prenom} {nom}</p>
                <img src={profilPicture} style={{width: "30%", borderRadius: 1000, border:"1px solid black"}} />
            </div>
            <div>

            </div>
        </div>
    )
}
