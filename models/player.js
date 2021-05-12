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
                snipe: Number,
                snap: Number,
                slap: Number,
                sauce: Number,
                silk: Number,
            },
            defense: {
                annoy: Number,
                rascal: Number,
                thump: Number,
                choreography: Number,
                blubber: Number,
            },
            goalkeeping: {
                swat: Number,
                squish: Number,
                sweetness: Number,
                swallow: Number,
                scream: Number
            },
            physical: {
                zoom: Number,
                spinach: Number,
                tricks: Number,
                darkness: Number,
                love: Number
            },
            mental: {
                stoicism: Number,
                absurdism: Number,
                nihilism: Number,
                platonism: Number,
                postmodernism: Number
            },

            items: {
                stick: String,
                helment: String,
                skates: String,
                gloves: String,
                other: String
            },
        history: {
            goals: Number,
            saves: Number,
            plusminus: Number
        }
    }
}
)

const Player = mongoose.model("Player", playerSchema)

module.exports = Player