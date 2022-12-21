const  mongoose = require('mongoose')

const ArtworkSchema = mongoose.Schema({
    
    songArtwork: { 
        data: Buffer,
        contentType: String
    },
    
}, {
    timestamps: true
})

module.exports = mongoose.model('Artwork', ArtworkSchema)
