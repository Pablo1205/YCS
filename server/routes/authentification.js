const express = require('express')
const router = express.Router()
const passwordF = require('../passport/password.js');

var connection = require('../db');


router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    connection.query(`SELECT email from users WHERE email = '${email}'`, async (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            return res.status(409).json({ message: 'Utilisateur existe déjà' })
        } else {
            console.log("PASSWORD BEFORE IS ", password);
            const hashedPassword = await passwordF.hashPassword(password);
            connection.query(`INSERT INTO users (email, password, username) VALUES('${email}', '${hashedPassword}', '${username}')`, (err, res2, fields) => {
                if (err) return res.status(409).json({ message: 'Utilisateur existe déjà' })
                return res.status(200).json({ message: 'User added' })
            })
        }
    })

})

router.post('/login', (req, res) => {
    
})
router.get('/login', (req, res) => {
})

router.get('/logOut', (req, res) => {
    // 202
})

module.exports = router