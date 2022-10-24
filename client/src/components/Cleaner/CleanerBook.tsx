import { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom";
import CleanerCard from './CleanerCard';

import api from "../../api/api.js"

export default function CleanerBook() {
    const { state } = useLocation();
    const cleaner = state.cleaner;
    const [cleanerDate, setCleanerDate] = useState<Array<any>>([]);
    const [idSelected, setIdSelected] = useState<number>(-1);
    const getCleanerAgenda = () => {
        let startDate = new Date();
        const startDateString = startDate.toLocaleDateString("fr-FR");
        api.get(`/cleaner/getAvailableByMonth/${cleaner.id}/${startDate.getFullYear()}/${startDate.getMonth()}`)
            .then(response => {
                console.log(response.data);
                setCleanerDate(response.data)
            })
    }
    useEffect(() => {
        getCleanerAgenda()
    }, [])
    return (
        <div>
            <CleanerCard cleaner={cleaner} displayButton={false} />
            {cleanerDate.length > 0 ?
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "2rem" }}>Here are the next availabilities for {cleaner.firstName} </div>
                    <div style={{ display: 'flex', flexDirection: "row", flexWrap: 'wrap', maxWidth: 1000, justifyContent: 'center' }}>
                        {cleanerDate.map((available, index) => {
                            return (
                                <div key={index} onClick={() => setIdSelected(index)} style={{ padding: 10, backgroundColor: idSelected === index ? "red" : "#0D6EFD", margin: 5, width: 100, alignItems: "center", height: 50, borderRadius: 5 }}>
                                    <p style={{ color: "white", fontWeight: "bold", textAlign: "center" }}>{new Date(available.day).getDate()}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                :
                <div style={{ fontWeight: 'bold', textAlign: 'center', fontSize: "2rem" }}>{cleaner.firstName} has no date available for this month </div>
            }

        </div >
    )
}
