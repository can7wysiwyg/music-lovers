require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port  = process.env.PORT || 5500
const cookieParser = require('cookie-parser')
const path = require('path')
const cors = require('cors')
const AuthRoute = require('./routes/AuthRoute')
const MusicRoute = require('./routes/MusicRoute')
const ArtworkRoute = require('./routes/ArtworkRoute')
const TrendRoute = require('./routes/TrendingRoute')
const NewSongRoute = require('./routes/NewSongsRoute')

mongoose.connect(process.env.MONGO_URL)

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function(){
    console.log("connected to database");
  });


  app.use(cors())

  app.use("/public/", express.static(path.join(__dirname, '/public/')));

  app.use(express.json({limit: '50mb'}))
  app.use(express.urlencoded({extended: true, limit: '50mb'}))
  app.use(cookieParser())

app.use(AuthRoute)
app.use(MusicRoute) 
app.use(ArtworkRoute)
app.use(TrendRoute)
app.use(NewSongRoute)



if(process.env.NODE_ENV === 'production'){
       app.use(express.static('client/build'))
       app.get('*', (req, res) => {
           res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
       })
   }


  app.listen(port, () => {
    console.log(`Your server is now running on port ${port}`);
})
