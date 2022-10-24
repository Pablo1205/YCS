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
            <div style={{fontWeight: 'bold', textAlign: 'center', fontSize: "2rem"}}>Here are the next availabilities for {cleaner.firstName} </div>
        </div>
    )
}
