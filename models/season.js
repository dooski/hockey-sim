const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//schema for seasons

const seasonSchema = new Schema(
    {
        seasonNumber: Number,
        active: Boolean,
        game: Number,
        playoff: Boolean,
        playoffRound: Number,
        playoffGame: Number,
        regularStandings: {
            igo: {
                first: String,
                second: String,
                third: String,
                fourth: String,
                fifth: String,
                sixth: String
            },
            ogo: {
                first: String,
                second: String,
                third: String,
                fourth: String,
                fifth: String,
                sixth: String
            },
            che: {
                first: String,
                second: String,
                third: String,
                fourth: String,
                fifth: String,
                sixth: String
            },
            nes: {
                first: String,
                second: String,
                third: String,
                fourth: String,
                fifth: String,
                sixth: String
            }
        },
        playoffStandings: {
            binSeeds: {
                first: String,
                second: String,
                third: String,
                fourth: String,
            },
            bonSeeds: {
                first: String,
                second: String,
                third: String,
                fourth: String
            },
            binFinals: {
                first: String,
                second: String,
            },
            bonFinals: {
                first: String,
                second: String
            },
            finals: {
                first: String,
                second: String
            }
        },
        history: {
            champion: String,
            topScorer: String,
            topLine: String,
            mostSaves: String,
            totalGoals: String,
        }
    }
)

const Season = mongoose.model("Season", seasonSchema)

module.exports = Season