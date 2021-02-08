const router = require("express").Router();
const gameRoutes = require("./game")
const infoRoutes = require("./info")

router.use("/game", gameRoutes)
router.use("/info", infoRoutes)

module.exports = router;