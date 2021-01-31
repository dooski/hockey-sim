import axios from "axios";

export default {
    checkGame: function () {
        return axios.get("api/game/load")
    }

}