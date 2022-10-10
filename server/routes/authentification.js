const utils = require('../utils.js');
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

var connection = require('../db');


router.post('/register', (req, res) => {
    const numero = req.body.numero;
    const password = req.body.password;
    const email = req.body.email;
    const nom = req.body.nom;
    const prenom = req.body.prenom; 

    connection.query(`SELECT Email from User_ WHERE Email = '${email}'`, function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            return res.status(409).json({ message: 'Utilisateur existe déjà' })
        } else {
            bcrypt.hash(password, 10, async (err, hash) => {
                if (err) {
                    console.error(err)
                    return
                }
                const cryptedNumero = await utils.cypherText(numero);
                connection.query(`INSERT INTO User_ (Email, Password, Numero, Nom, Prenom) VALUES ("${email}", "${hash}", "${cryptedNumero}", "${nom}", "${prenom}")`, function (error, results, fields) {
                    if (error) throw error;
                    const accessToken = jwt.sign({ email: email, IDUser: results.insertId, IDPatient: results.insertId }, process.env.TOKEN_SECRET)
                    connection.query(`INSERT INTO Patient (IDPatient, IDUser) VALUES ("${results.insertId}", "${results.insertId}")`, (err, res) => {
                        if(err) throw err;
                    });
                    return res
                        .cookie("access_token", accessToken, {
                            httpOnly: false,
                            maxAge: 24 * 60 * 60 * 1000 // 24 hours
                        })
                        .status(200)
                        .json({ message: "Connexion réussie" }); 
                })
            })
        }
    })

})

router.post('/login', (req, res) => {
    const password = req.body.password;
    console.log(password)
    const email = req.body.email;

    sqlQuery = `SELECT DISTINCT User_.IDUser, User_.Password,User_.IDUser,Docteur.IDDocteur, Patient.IDPatient, Pharmacien.IDPharmacien from User_
    LEFT JOIN Docteur ON User_.IDUser = Docteur.IDUser
    LEFT JOIN Patient ON User_.IDUser = Patient.IDUser
    LEFT JOIN Pharmacien ON User_.IDUser = Pharmacien.IDUser
    WHERE User_.Email ="${email}"`;
    connection.query(sqlQuery, function (error, results, fields) {
        if (error) throw error;
        if (results.length < 1) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" })
        }
        console.log(results);
        bcrypt.compare(password, results[0].Password, (err, res2) => {
            if (err) {
                console.error(err)
                return
            }
            if (res2) {
                console.log("id doctor is : ", results[0].IDDocteur);
                const accessToken = jwt.sign({ IDUser: JSON.stringify(results[0].IDUser), Email: results[0].Email, IDDocteur: results[0].IDDocteur, IDPatient: results[0].IDPatient, IDPharmacien: results[0].IDPharmacien }, process.env.TOKEN_SECRET)
                return res
                    .cookie("access_token", accessToken, {
                        httpOnly: false,
                        maxAge: 24 * 60 * 60 * 1000 // 24 hours
                    })
                    .status(200)
                    .json({ message: "Connexion réussie" });
            } else {
                res.status(403).json({ accessToken: null, message: "Mauvais mot de passe" })
            }
        })
    })


})
router.get('/login', (req, res) => {
    const token = req.cookies.access_token;
    const decodedToken = utils.decodeToken(token);
    console.log(decodedToken)
    if (decodedToken) {
        res.status(200).json({ message: "Vous êtes connecté, cookie envoyé", decoded: decodedToken })
    } else {
        res.status(400).json({ message: "Vous n'êtes pas connecté" })
    }
})

router.get('/logOut', (req, res) => {
    res.status(202).clearCookie('access_token').send('cookie cleared')
})

module.exports = router