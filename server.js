//server dependencies
require("dotenv").config()
const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose")
const routes = require("./routes/index")
const PORT = process.env.PORT || 4000;
const app = express()

//server stuff
const control = require("./control.js")
const teamController = require("./controllers/teamController")

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


//timing
setInterval(clock, 60000)
function clock() {
    now = new Date
    if (now.getMinutes() === 30 || now.getMinutes() === 0) {
        control.start()
        console.log(`Playing games at ${now.getMinutes()}`)
    }
}

//api routes

app.use(routes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})