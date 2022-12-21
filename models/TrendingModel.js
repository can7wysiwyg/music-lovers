const mongoose = require('mongoose')

const TrendingSchema = mongoose.Schema({
    songIdentifier: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Trending', TrendingSchema)