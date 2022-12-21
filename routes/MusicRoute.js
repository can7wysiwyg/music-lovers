const MusicRoute = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const verify = require("../middleware/verify");
const Music = require("../models/MusicModel");
const multer = require("multer");
const fs = require("fs");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    const excludedFields = ["page", "sort", "limit"];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

MusicRoute.post(
  "/music/upload",
  verify,
  upload.single("song"),
  expressAsyncHandler(async (req, res) => {
    const { artistName, songGenre, songArtwork, songTitle, songTag, released } = req.body;

    if (!artistName || !songGenre || !songArtwork || !songTitle || !songTag || !released) {
      res.json({ msg: "fields cannot be empty!!" });
    }

    await Music.create({
      artistName,
      songGenre,
      songArtwork,
      song: {
        data: fs.readFileSync("./public/" + req.file.filename),
        contentType: "audio/mp3",
      },
      songTitle,
      songTag,
      released,
    });
    res.json({ msg: "file uploaded succesfully" });
  })
);

MusicRoute.delete(
  "/music/delete_song/:id",
  verify,
  expressAsyncHandler(async (req, res) => {

    await Music.findByIdAndDelete(req.params.id)

    res.json({msg: "song has been successfully deleted!"})

  })
);

MusicRoute.get(
  "/music/show_reggae",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Reggae" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_gospel",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Gospel" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_dancehall",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Dancehall" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_trap",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Trap" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_amapiano",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Amapiano" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_hip_hop",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Hip Hop" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_rnb",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "RnB" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_afro_pop",
  expressAsyncHandler(async (req, res) => {
    const results = await Music.find({ songGenre: "Afro Pop" }).sort({ _id: 1 }).limit(3);

    res.json({ results });
  })
);

MusicRoute.get(
  "/music/show_all",
  expressAsyncHandler(async (req, res) => {
    const features = new APIfeatures(Music.find(), req.query)
      .filtering()
      .sorting()
      .paginating();

    const music = await features.query;

    res.json({
      status: "success",
      result: music.length,
      music: music,
    });
  })
);

module.exports = MusicRoute;
