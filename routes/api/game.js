const router = require("express").Router()
const control = require("../../control")

router.route("/load")
.get(control.packageReturn)

router.route("/season")
.get(control.seasonData)


module.exports = router
