const TrendRoute = require("express").Router();
const verify = require("../middleware/verify");
const Trending = require("../models/TrendingModel");
const Music = require("../models/MusicModel");
const expressAsyncHandler = require("express-async-handler");

TrendRoute.post(
  "/trending/create_trending_song",
  verify,
  expressAsyncHandler(async (req, res) => {
    const { songIdentifier } = req.body;

    if (!songIdentifier) {
      res.json({ msg: "field cannot be empty" });
    }

    const songExists = await Trending.findOne({ songIdentifier });

    if (songExists) res.json({ msg: "trending song already exists" });

    await Trending.create({
      songIdentifier,
    });

    res.json({ msg: "trending song has been succesfully created" });
  })
);

TrendRoute.get(
  "/trending/show_songs",
  expressAsyncHandler(async (req, res) => {


    const results = await Music.find()

    res.json({results})

  })
);

TrendRoute.get('/trending/show_trending', expressAsyncHandler(async(req, res) => {

  const results = await Trending.find().sort({ _id: -1 }).limit(5)

  res.json({results})



}))

module.exports = TrendRoute;
