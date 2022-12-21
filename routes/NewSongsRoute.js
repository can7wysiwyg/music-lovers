const NewSongRoute = require('express').Router()
const verify = require('../middleware/verify')
const NewSong = require('../models/NewSongsModel')
const expressAsyncHandler = require('express-async-handler')
const Music = require('../models/MusicModel')

NewSongRoute.post('/new_song/create', verify, expressAsyncHandler(async(req, res) => {

    const{newSongIdentifier} = req.body

    if(!newSongIdentifier) {
        res.json({msg: "field cannot be empty"})
    }

    const newSongExists = await NewSong.findOne({newSongIdentifier})
    
    if(newSongExists) res.json({msg: "song already exists"})

    await NewSong.create({
        newSongIdentifier
    })

    res.json({msg: "new song has been succesfully added"})


   

}))


NewSongRoute.get('/new_song/show', expressAsyncHandler(async(req, res) => {

const results = await NewSong.find().find().sort({ _id: -1 }).limit(3)

res.json({results})


}))


NewSongRoute.get('/new_song/all', expressAsyncHandler(async(req, res) => {

    const results = await Music.find().sort({ _id: -1 }).limit(1)
    res.json({results})    

}))

module.exports = NewSongRoute