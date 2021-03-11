const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const db = config.get("mongoURI");
const multer = require("multer");
var streamifier = require("streamifier");
var Readable = require("stream").Readable;
const Grid = require("gridfs-stream");
const crypto = require("crypto");
const mongoose = require("mongoose");
const storage = new GridFsStorage({
  url: db,
  options: { useUnifiedTopology: true },
  file: (req, file, i) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename = req.files[req.files.length - 1].fieldname;
        const fileInfo = {
          filename: filename,
          bucketName: "fs", //collection name
        };

        console.log(req.files);
        console.log(fileInfo);

        resolve(fileInfo);
      });
    });
  },
});

const upload = multer({ storage });

router.delete("/:id", auth, async (req, res) => {
  try {
    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo);
    const fileId = new mongoose.mongo.ObjectId(req.params.id);

    gfs.remove({ _id: fileId }, function (err) {});

    res.json({ msg: "Image removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", upload.any(), auth, async (req, res) => {
  try {
    console.log(req.body.files, "sasadsads");
    /*
    const conn = mongoose.connection;
    const gfs = Grid(conn.db, mongoose.mongo);
    const fileId = new mongoose.mongo.ObjectId(req.params.id);

    gfs.remove({ _id: fileId }, function (err) {});

    const imgBuffer = Buffer.from(req.body.img, "base64");
    var s = new Readable();

    s.push(imgBuffer);
    s.push(null);

    s.pipe(
      gfs.createWriteStream({
        mode: "w",
        filename: req.body.filename,
        content_type: req.body.mimetype,
      })
    ).on("close", function (file) {
      console.log("saved 300px as " + file.filename);
    });
      */
    res.send("fg!");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.get("/", auth, async (req, res) => {
  const conn = mongoose.connection;

  const gfs = Grid(conn.db, mongoose.mongo);

  const data = [];
  await gfs.files.find().toArray(async function (err, files) {
    if (err) {
      res.json(err);
    }

    files.forEach(async (file) => {
      data.push(file);
    });

    res.json(data);
  });
});

router.get("/content", auth, async (req, res) => {
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);

  gfs.files.find({ filename: req.query.q }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }

    if (files.length > 0) {
      var mime = files[0].contentType;
      var filename = files[0].filename;
      res.set("Content-Type", mime);
      res.set("Content-Disposition", "inline; filename=" + filename);
      var read_stream = gfs.createReadStream({ filename: filename });
      read_stream.pipe(res);
    } else {
      res.json("File Not Found");
    }
  });
});

router.get("/:id", auth, async (req, res) => {
  const conn = mongoose.connection;
  const gfs = Grid(conn.db, mongoose.mongo);

  const fileId = new mongoose.mongo.ObjectId(req.params.id);

  gfs.files.find({ _id: fileId }).toArray(function (err, files) {
    if (err) {
      res.json(err);
    }

    if (files.length > 0) {
      var mime = files[0].contentType;
      var filename = files[0].filename;
      res.set("Content-Type", mime);
      res.set("Content-Disposition", "inline; filename=" + filename);
      var read_stream = gfs.createReadStream({ filename: filename });
      read_stream.pipe(res);
    } else {
      res.json("File Not Found");
    }
  });
});

module.exports = router;
