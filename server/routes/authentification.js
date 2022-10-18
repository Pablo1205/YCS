const express = require('express')
const router = express.Router()
const passwordF = require('../passport/password.js');
var connection = require('../db');

const passport = require('passport');


router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;
    connection.query(`SELECT email from users WHERE email = '${email}'`, async (error, results, fields) => {
        if (error) throw error;
        if (results.length > 0) {
            return res.status(409).json({ message: 'Utilisateur existe déjà' })
        } else {
            console.log("PASSWORD BEFORE IS ", password);
            const hashedPassword = await passwordF.hashPassword(password);
            connection.query(`INSERT INTO users (email, password, username, lastName, firstName) VALUES('${email}', '${hashedPassword}', '${username}', '${lastName}', '${firstName}')`, async (err, res2, fields) => {
                if (err) return res.status(409).json({ message: 'Utilisateur existe déjà' })
                return res.status(200).json({ message: 'User added' })
            })
        }
    })

})

router.post('/login', passport.authenticate('local', {}),
    function (req, res) {
        return res.status(200).json({ message: 'User is authenticated' })
    });

router.get('/login', (req, res) => {
    if(req.user) {
        return res.status(200).json({ message: 'User is authenticated' })
    } else {
        return res.status(401).json({ message: 'User is not authenticated' })
    }
})

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        return res.status(200).json({ message: 'Logged out' })
    });
});

module.exports = router