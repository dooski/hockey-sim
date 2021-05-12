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
            l1: {
                a: String,
                b: String,
                c: String,
            },
            l2: {
                a: String,
                b: String,
                c: String
            },
            g: {
                a: String,
            },
            b: {
                a: String,
                b: String,
                c: String
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