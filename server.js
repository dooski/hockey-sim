//server dependencies
require("dotenv").config()
const express = require("express");
const session = require("express-session")
const passport = require("./passport/setup.js")
const mongoose = require("mongoose")
const routes = require("./routes/index")
const MongoStore = require("connect-mongo")(session);


const PORT = process.env.PORT || 4000;
const app = express()

//server stuff
const control = require("./control.js")
const plondWaker = require("./gens/seasonScheduler")

//middlewhere? middleware!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

//mongo connect
const uri = `mongodb+srv://${process.env.MDBADMIN}:${process.env.MDBPW}@plondhockey.3acpb.mongodb.net/PlondHockey?retryWrites=true&w=majority`;
console.log(uri)
mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(console.log(`MongoDB connected ${uri}`))
    .catch(err => console.log(err));

//sessions for logins

app.use(
    session({
        secret: `${process.env.SECRET}`,
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session())
app.use(routes);

//game start
let gameDay = 0
setInterval(clock, 60000)
function clock() {
    now = new Date
    if (now.getMinutes() === 0) {
        plondWaker.start(gameDay)
        console.log(`Playing games at ${now.getMinutes()}`)
        gameDay = gameDay + 1
        console.log(gameDay)
    }
}

//api routes

app.use(routes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})