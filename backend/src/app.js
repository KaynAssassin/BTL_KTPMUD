const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const sequelize = require("../server/config/database")
const router = require("../server/router/index")
const session = require("express-session")
const cookie_parser = require("cookie-parser")

const app = express()
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use(cookie_parser());

var sess = {
    secret: 'keyboard cat',
    key: 'user_sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true, // serve secure cookies
        httpOnly: false
    }
}

app.use(session(sess));

app.use("/", router)

app.get('*', (req, res) => res.status(200).send({
  message: 'API Schedules Work ... !!!',
}));

app.listen(process.env.PORT || 8091)

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });