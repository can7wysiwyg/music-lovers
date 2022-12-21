const mongoose = require('mongoose')

const NewSongsSchema = mongoose.Schema({
    newSongIdentifier: {
        type: String,
        required: true,
        unique: true

    }
}, {
    timestamps: true
})

module.exports = mongoose.model('NewSong', NewSongsSchema)