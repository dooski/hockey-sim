const router = require("express").Router();
const gameRoutes = require("./game")
const infoRoutes = require("./info")
const authRoutes = require("./auth")

router.use("/game", gameRoutes)
router.use("/info", infoRoutes)
router.use("/auth", authRoutes)

module.exports = router;