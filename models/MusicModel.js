const  mongoose = require('mongoose')

const MusicSchema = mongoose.Schema({
    artistName: {
        type: String,
        required: true,
    
    },
    songArtwork: {
        type: String,
        required: true

    }
    ,

    songGenre: {
        type: String,
        required: true

    },
    songTitle: {
        type: String,
        required: true,

    },
    songTag: {
        type: String,
        required: true,
        unique: true

    },
    
    song: {
        data: Buffer,
        contentType: String
    },
    released: {
       type: String,
       required: true 
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Music', MusicSchema)
