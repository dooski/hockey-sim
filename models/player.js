const mongoose = require("mongoose")
const Schema = mongoose.Schema;

//schema for players

const playerSchema = new Schema(
    {
        name: String,
        currentTeam: String,
        personality: String,
        alive: Boolean,
        stats: {
            offense: {
                highShot: Number,
                lowShot: Number,
                longShot: Number,
                passing: Number,
                handling: Number,
            },
            defense: {
                forecheck: Number,
                stick: Number,
                checking: Number,
                positioning: Number,
                blocking: Number,
            },
            goalkeeping: {
                highBlock: Number,
                lowBlock: Number,
                longBlock: Number,
                catching: Number,
                aura: Number
            },
            physical: {
                speed: Number,
                strength: Number,
                faceoff: Number,
                fighting: Number,
                blubber: Number
            },
            mental: {
                discipline: Number,
                respect: Number,
                fear: Number,
                vision: Number,
                memory: Number
            },
            mystical: {
                divinity: Number,
                fog: Number,
                luck: Number,
                bear: Number,
                lakemonster: Number 
            },
        items: {
            stick: String,
            helment: String,
            skates: String,
            gloves: String,
            other: String
        }
        },
        history: {
            goals: Number,
            saves: Number
        }
    }
)

const Player = mongoose.model("Player", playerSchema)

module.exports = Player