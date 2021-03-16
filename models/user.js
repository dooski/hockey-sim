const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String
        },
        personality: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
        team: {
            type: String
        }
    }
)

module.exports = User = mongoose.model("users", userSchema)