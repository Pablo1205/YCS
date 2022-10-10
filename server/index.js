const express = require('express');
const app = express();

const session = require('express-session')
const path = require('path')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto-js');
var MySQLStore = require('express-mysql-session')(session);
const bodyParser = require("body-parser");
const logger = require('morgan')
const cors = require('cors');

app.use(session({
    key:'session_cookie',
    store: new MySQLStore({
        host: process.env.HOST_SQL,
        port: 3306,
        user: process.env.USER,
        database: 'robebou_m1_web_cookieuser',
        password: process.env.PASSWORD,
    }),
    secret: 'grehjznejzkhgjrez',
    saveUninitialized: false,
    resave: false,
    secure: false
}))


// const authRoutes = require("./routes/authentification.js");
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.static(path.join(__dirname, '../client')))

// app.use('/auth', authRoutes)

app.listen(3030, function () {
    console.log("Server is running on port " + 3030);
});

/*
var route, routes = [];
app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware 
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});
console.log(route, routes)

*/


module.exports = app
