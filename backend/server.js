const express = require("express")
const bodyparser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql2")
const session = require("express-session")
const mysqlStore = require("express-mysql-session")(session)
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
require("dotenv").config()

const db = require('./db');
const PORT = process.env.PORT
const options = {
    connectionLimit: 15,
    password: process.env.MYSQL_PASS,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
}

const pool = mysql.createPool(options)
const sessionStore = new mysqlStore(options, pool)

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use(bodyparser.json())

app.use(session({
    name: process.env.SESSION_NAME,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 5,
        sameSite: true,
        secure: false
    }
}))

app.post('/signup', async (req, res) => {
    console.log("got request")
    console.log(req.body)
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const phone = req.body.phone
        const email = req.body.email;
        let password = req.body.password;

        if (!firstName || !lastName || !email || !password) 
            return res.sendStatus(400)
        

        if(db.getUserByEmail(email))
            return res.status(403).send("Email Already registered")

        const salt = genSaltSync(10);
        password = hashSync(password, salt);

        const user = await db.addUser(firstName, lastName, phone, email, password)
            .then(insertId => { return db.getUserById(insertId); });

        req.session.userId = user.id
        return res.sendStatus(201)

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});

app.post('/login', async (req, res) => {
    try {
        const email = req.body.email;
        let password = req.body.password;
        let user = (await db.getUserByEmail(email))[0];
        if (!user) {
            return res.send("Invalid Email")
        }

        const isValidPassword = compareSync(password, user.password);
        if (isValidPassword) {
            user.password = undefined;
            req.session.userId = user.id
            return res.send('Login successful');
        } else {
            return res.send("Invalid Password")
        }


    } catch (error) {
        console.log(error);
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.sendStatus(500)
        }
        sessionStore.close()
        res.clearCookie(process.env.SESSION_NAME)
        res.sendStatus(200)
    })

})

app.get('/test', (req, res) => {
    console.log("server is working")
    res.send("server is working")
})
app.listen(3005, () => {
    console.log("Listening on port ", 3005)
})