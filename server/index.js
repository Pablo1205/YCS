const express = require('express')
const session = require('express-session')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors');

const authRoutes = require("./routes/authentification.js");


const app = express()

console.log("start server")

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(session({
    secret: 'grehjznejzkhgjrez',
    saveUninitialized: false,
    resave: false,
    secure: false
}))
app.use(express.static(path.join(__dirname, '../client')))

app.use('/auth', authRoutes)

app.listen(3030, function () {
    console.log("Server is running on port " + 3030);
});

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

module.exports = app
