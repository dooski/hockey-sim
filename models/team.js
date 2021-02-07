const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//schema for teams

const teamSchema = new Schema(
    {
        info: {
        full: String,
        city: String,
        team: String,
        desc: String,
        div: String,
        abrv: String,
        captain: String,
        },
        players: {
            line1: {
                LW: String,
                CE: String,
                RW: String,
                LD: String,
                RD: String,
                GK: String
            },
            line2: {
                LW: String,
                CE: String,
                RW: String,
                LD: String,
                RD: String,
                GK: String
            }
        },
        history: {
            wins: Number,
            losses: Number,
            seasons: Number,
            championships: Number
        }
    }
)

const Team = mongoose.model("Team", teamSchema)

module.exports = Team