const ArtworkRoute = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const verify = require("../middleware/verify");
const Artwork = require("../models/ArtworkModel");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const upload = multer({ storage });

ArtworkRoute.post(
  "/artwork/upload",
  verify,
  upload.single("songArtwork"),
  expressAsyncHandler(async (req, res) => {
    await Artwork.create({
      songArtwork: {
        data: fs.readFileSync("./public/" + req.file.filename),
        contentType: "image/jpg",
      },
    });

    res.json({ msg: "artwork has been succesfully uploaded" });
  })
);

ArtworkRoute.get(
  "/artwork/show_last",
  expressAsyncHandler(async (req, res) => {
    const results = await Artwork.find().sort({ _id: -1 }).limit(1);
    res.json({ results });
  })
);

ArtworkRoute.get(
  "/artwork/show_all",
  expressAsyncHandler(async (req, res) => {

const results = await Artwork.find()

res.json({results})

  })
);

module.exports = ArtworkRoute;
