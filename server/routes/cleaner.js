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

router.get('/seeAllCleaners/', (req, res) => {
    connection.query(`SELECT * FROM cleaners `, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'Aucun cleaner existant' })
        }else {
            res.send(results)
            console.log(results)//this 
            return results
        }
    })
})

router.post('/addNewCleaner/', (req, res) => {

    var Regex='/^[^a-zA-Z]*$/';
    const idCleaner = req.body.idCleaner;
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    if (email.length == 0) { // vérifier présence'@'
        return res.status(409).json({ message: 'Il manque un email' })
    }
    if (firstName.length == 0) { // vérifier que ce ne soient que des lettres
        return res.status(409).json({ message: 'Il manque un prénom' })
    }

    if (lastName.length == 0) { // vérifier que ce ne soient que des lettres
        return res.status(409).json({ message: 'Il manque un nom' })
    }
  
    connection.query(`INSERT INTO cleaners (idCleaner,email,firstName, lastName) VALUES(?,?,?,?)`, [ idCleaner, email , firstName , lastName ] , async (err, results, fields) => {
        if (err) return res.status(409).json({ message: 'Cleaner already existing' })
        return res.status(200).json({ message: 'Cleaner added' })
    })
    
})

router.get('/updateCleanerInfo/', (req, res) => {
    connection.query(`SELECT * FROM cleaners `, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'Aucun cleaner existant' })
        }else {
            res.send(results)
            console.log(results)//this 
            return results
        }
    })
})

router.get('/deleteCleaner/', (req, res) => {
    connection.query(`SELECT * FROM cleaners `, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'Aucun cleaner existant' })
        }else {
            res.send(results)
            console.log(results)//this 
            return results
        }
    })
})

module.exports = router