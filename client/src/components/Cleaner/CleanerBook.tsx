import React from 'react'
import { useLocation } from "react-router-dom";
import CleanerCard from './CleanerCard';

import api from "../../api/api.js"

export default function CleanerBook() {
    const { state } = useLocation();
    const cleaner = state.cleaner;
    const getCleanerAgenda = () => {
        
    }
    return (
        <div>
            <CleanerCard cleaner={cleaner} displayButton={false} />
            <div style={{fontWeight: 'bold', textAlign: 'center', fontSize: "2rem"}}>Here are the next availabilities for {cleaner.firstName} </div>
        </div>
    )
}
