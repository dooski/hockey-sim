const router = require("express").Router()
const teamController = require("../../controllers/teamController")

router.route("/teams")
.get(teamController.getTeams)

router.route("/team")
.get(async function (req, res) {
    let team = await teamController.getTeam(req.user.team)
    res.json(team)
})

module.exports = router
