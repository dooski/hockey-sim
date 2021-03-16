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
    },
    userLogin: function (userData) {
        return axios.post("/api/auth/login", userData)
    },
    userRegister: function (userData) {
        console.log(userData)
        return axios.post("/api/auth/register", userData)
    },
    loadUser: function () {
        return axios.get("/api/auth/user")
    },
    logoutUser: function () {
        return axios.get("/api/auth/logout")
    }
}