const express = require("express");
const control = require("./control.js")
const records = require("./gens/seasonManagement")
const routes = require("./routes/index")
const path = require("path");
const PORT = process.env.PORT || 4000;
const app = express()

//middlewhere? middleware!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

// control.test()

//timing
setInterval(clock, 60000)
records.updateRecord()
function clock() {
    now = new Date
    if (now.getMinutes() === 30 || now.getMinutes() === 0){
        control.start()
        console.log(`Playing games at ${now.getMinutes()}`)
    }
}

//api routes

app.use(routes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})