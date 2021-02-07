import axios from "axios";

export default {
    checkGame: function () {
        return axios.get("api/game/load")
    },
    checkSeason: function () {
        return axios.get("api/game/season")
    },
    getTeams: function() {
        return axios.get("api/info/teams")
    }
}