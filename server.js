const express = require("express");
const data = require("./gens/data.json")
const gameplay = require("./gameplay.js")
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express()

//middlewhere? middleware!
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"))
}

//api routes

setTimeout(gameplay.test, 3000)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})