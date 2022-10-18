const express = require('express')
const router = express.Router()
var connection = require('../db');
const passport = require('passport');

// gérer entité cleaner et afficher disponibilité
// resultats de query dans result
router.get('/available/:idCleaner', (req, res) => {
    const sql = "SELECT cleaners.idCleaner, cleanersSchedule.idSchedule, cleanersSchedule.day,cleanersSchedule.StartTime, cleanersSchedule.EndTime FROM cleaners JOIN cleanersSchedule ON cleaners.idCleaner=cleanersSchedule.idCleaner WHERE cleaners.idCleaner= ?;"
    connection.query(sql,[req.params.idCleaner], async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'ID inexistant' })
        }else {
            res.send(results)
            console.log(results)//this 
            return results
        }
    })
})

module.exports = router