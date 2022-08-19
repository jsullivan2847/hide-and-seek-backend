const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
})

const Score = mongoose.model('Score', scoreSchema)

module.exports = Score;