const router = require("express").Router()
const teamController = require("../../controllers/teamController")

router.route("/teams")
.get(teamController.getTeams)


module.exports = router
