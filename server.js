const express = require("express");
const control = require("./control.js")
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

//api routes

setTimeout(control.test, 3000)

app.use(routes)

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})