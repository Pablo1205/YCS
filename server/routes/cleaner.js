const express = require('express')
const router = express.Router()
var mysql = require('mysql');
var connection = require('../db');

router.get('/available/:idCleaner/:year/:month', (req, res) => {
    const string = "SELECT cleanersSchedule.* FROM cleanersSchedule JOIN users ON cleanersSchedule.idCleaner = users.id WHERE users.id = ? AND cleanersSchedule.year = ? AND cleanersSchedule.month = ?;"
    const inserts = [parseInt(req.params.idCleaner), req.params.year, req.params.month];
    const sql = mysql.format(string, inserts);
    connection.query(sql, async (error, results) => {
        if (error) throw error;
        res.status(200).json({ data: results })
    })
})

router.post('/setAvailable', (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "You are not authenticate" });
    if (req.user.isCleaner !== 1) return res.status(403).json({ message: "You are not allowed to do that" });
    const userId = parseInt(req.user.id);
    req.body.availableDate.forEach(value => {
        const string = "SELECT cleanersSchedule.* FROM cleanersSchedule WHERE cleanersSchedule.idCleaner = ? AND cleanersSchedule.day = ?;";
        const date = new Date(value.date);
        const inserts = [userId, date];
        const sql = mysql.format(string, inserts);
        connection.query(sql, async (error, results) => {
            if (error) throw error;
            if (value.isSelected && results.length === 0) {
                const insertString = "INSERT INTO cleanersSchedule(day, idCleaner, month, year) VALUES (?,?,?,?)";
                connection.query(insertString, [date, userId, req.body.month, req.body.year], async (err, res2, fields) => {
                    if (err) throw err;
                })
            } else if (!value.isSelected && results.length > 0) {
                const insertString = "DELETE FROM cleanersSchedule WHERE day = ? AND idCleaner = ?";
                connection.query(insertString, [date, userId], async (err, res2, fields) => {
                    if (err) throw err;
                })
            }
        })
    })
})

router.get('/seeAllCleaners', (req, res) => {
    connection.query(`SELECT users.username , users.firstName, users.lastName, users.id, users.city, users.bio, users.joinDate, users.profilPicture, users.rayon FROM users WHERE users.isCleaner=1`, async (error, results) => {
        if (error) throw error;
        res.send(results)
    })
})

router.get('/getCleanerByNameOrUsername/:value', (req, res) => {
    const value = req.params.value + "%";
    connection.query(`SELECT users.username , users.firstName, users.lastName FROM users WHERE (users.firstName LIKE ? OR users.lastName LIKE ?) AND users.isCleaner=1`, [value, value], async (error, results) => {
        if (error) throw error;
        res.send(results)
    })
})

router.post('/addCleanerStatus/:city/:id', (req, res) => {
    const stringSelect = "SELECT users.isCleaner FROM users WHERE users.id = ? ;"
    const stringUpdate = "UPDATE users SET users.isCleaner=1 WHERE users.id = ? ;"
    const inserts = [req.params.id];
    const sqlSelect = mysql.format(stringSelect, inserts);
    const sqlUpdate = mysql.format(stringUpdate, inserts);
    connection.query(sqlSelect, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'User doesnt exist' })
        } else {
            connection.query(sqlUpdate, async (err, results2) => {
                res.send({ message: 'Cleaner Status added' })
                console.log({ message: 'Cleaner Status added' })
                return results2
            })
        }
    })
})

router.post('/deleteCleanerStatus/:id', (req, res) => {
    const stringSelect = "SELECT users.isCleaner FROM users WHERE users.id = ? ;"
    const stringUpdate = "UPDATE users SET users.isCleaner=0 WHERE users.id = ? ;"
    const inserts = [req.params.id];
    const sqlSelect = mysql.format(stringSelect, inserts);
    const sqlUpdate = mysql.format(stringUpdate, inserts);
    connection.query(sqlSelect, async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'User doesnt exist' })
        } else {
            connection.query(sqlUpdate, async (err, results2) => {
                res.send({ message: 'Cleaner Status removed' })
                console.log({ message: 'Cleaner Status removed' })
                return results2
            })
        }
    })
})

router.post('/updateUserCity/:city/:id', (req, res) => {
    connection.query("UPDATE users SET users.city= ? WHERE users.id = ? ;", [req.params.city, req.params.id], async (error, results) => {
        res.send({ message: 'User city updated' })
        console.log({ message: 'User city updated' })
        return results
    })
})

router.get('/getCleanerByCity/:city', (req, res) => {
    const city = req.params.city + "%";
    connection.query(`SELECT users.username , users.firstName, users.lastname, users.id, users.city, users.bio, users.joinDate, users.profilPicture, users.rayon FROM users WHERE (users.isCleaner=1 AND users.city LIKE ? )`, [city], async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
            return res.status(409).json({ message: 'No cleaner in this area' })
        } else {
            res.send(results)
            console.log(results)//this 
            return results
        }
    })
})

router.post('/updateUserCity/:city/:id', (req, res) => {
    connection.query("UPDATE users SET users.city= ? WHERE users.id = ? ;", [req.params.city, req.params.id], async (error, results) => {
        res.send({ message: 'User city updated' })
        console.log({ message: 'User city updated' })
        return results
    })
})

/*router.post('/createProposal/:id', (req, res) => {
    connection.query(`SELECT users.isCleaner FROM users WHERE users.id = ? ;`, [req.params.id], async (err, results, fields) => {
        if (err) { return res.status(409).json({ message: 'User cant book a cleaner has he/she has cleaner status' }) }
        else {
            const idCleaner = req.body.idCleaner;
            const idDay = req.body.idDay;
            const address = req.body.address;
            const StartDateTime = req.body.StartDateTime;
            const EndDateTime = req.body.EndDateTime;

            if (idCleaner.length == 0) {
                return res.status(409).json({ message: 'Il manque un cleaner' })
            }
            if (idDay.length == 0) {
                return res.status(409).json({ message: 'Il manque un jour' })
            }
            if (address.length == 0) {
                return res.status(409).json({ message: 'Il manque une adresse' })
            }
            if (StartDateTime.length == 0) {
                return res.status(409).json({ message: 'Il manque une heure de début' })
            }
            if (EndDateTime.length == 0) {
                return res.status(409).json({ message: 'Il manque une  heure de fin' })
            }

            connection.query(`INSERT INTO acceptedProposal (idUser, idCleaner, idDay, address, StartDateTime , EndDateTime) VALUES(?,?,?,?,?,?)`, [req.params.id, idCleaner, idDay, address, StartDateTime, EndDateTime], async (err, results2, fields) => {
                res.send(results2)
                console.log({ message: 'Proposal added' })
                return results2
            })
        }
    })
})*/


router.delete('/deleteProposal/:idProposal', (req, res) => {
    connection.query(`DELETE FROM acceptedProposal WHERE acceptedProposal.idProposal= ?`, [req.params.idProposal], async (err, results, fields) => {
        res.send({ message: 'Proposal removed' })
        console.log({ message: 'Proposal removed' })
        return results
    })
})

//SELECT * FROM cleanersSchedule WHERE day LIKE '2022-10-01 __:__:__'

router.get('/bookCleaner/:id/:date', (req, res) => {

    //check day : modifier format de req.params.date, l'adatper au format envoyé en URL 
    //SELECT * FROM acceptedProposal WHERE idDay = "2022-10-22" AND (StartDateTime > "2022-10-22 11:30:00" > EndDateTime) AND idCleaner=2
    connection.query(`SELECT * FROM cleanersSchedule WHERE day LIKE '? __:__:__' AND idCleaner= ?`, [req.params.date,req.params.id], async (err, results, fields) => {
        if (err) { return res.status(409).json({ message: 'Cleaner is not available on this date' }) } // verifier code erreur
        else {

            //check hour : modifier format de req.params.date, l'adatper au format envoyé en URL ::: attention ici on veut que le select ne retourne rien 
            connection.query(`SELECT * FROM cleanersSchedule WHERE day LIKE '? __:__:__' AND idCleaner= ?`, [req.params.date,req.params.id], async (err, results, fields) => {
                if (err) { return res.status(409).json({ message: 'Cleaner is not available on this date' }) } // verifier code erreur
                else {
                    // insert nouvel accepted proposal 
                    /*connection.query(`SELECT users.isCleaner FROM users WHERE users.id = ? ;`, [req.params.id], async (err, results, fields) => {
                        if (err) { return res.status(409).json({ message: 'User cant book a cleaner has he/she has cleaner status' }) }
                        else {
                            const idCleaner = req.body.idCleaner;
                            const idDay = req.body.idDay;
                            const address = req.body.address;
                            const StartDateTime = req.body.StartDateTime;
                            const EndDateTime = req.body.EndDateTime;
                
                            if (idCleaner.length == 0) {
                                return res.status(409).json({ message: 'Il manque un cleaner' })
                            }
                            if (idDay.length == 0) {
                                return res.status(409).json({ message: 'Il manque un jour' })
                            }
                            if (address.length == 0) {
                                return res.status(409).json({ message: 'Il manque une adresse' })
                            }
                            if (StartDateTime.length == 0) {
                                return res.status(409).json({ message: 'Il manque une heure de début' })
                            }
                            if (EndDateTime.length == 0) {
                                return res.status(409).json({ message: 'Il manque une  heure de fin' })
                            }
                
                            connection.query(`INSERT INTO acceptedProposal (idUser, idCleaner, idDay, address, StartDateTime , EndDateTime) VALUES(?,?,?,?,?,?)`, [req.params.id, idCleaner, idDay, address, StartDateTime, EndDateTime], async (err, results2, fields) => {
                                res.send(results2)
                                console.log({ message: 'Proposal added' })
                                return results2
                            })
                        }
                    })*/
                }
            })
        }
    })

    





})

const mailValidation = (mail) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail) === false) {

        return false;
    }
    return true;
}

module.exports = router