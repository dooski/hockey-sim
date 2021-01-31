const router = require("express").Router()
const control = require("../../control")

router.route("/load")
.get(control.packageReturn)


module.exports = router
