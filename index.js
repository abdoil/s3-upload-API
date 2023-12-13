require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { s3Uploadv3 } = require("./s3Service");
const app = express();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[0] === "image" ||
    file.mimetype.split("/")[0] === "text" ||
    file.mimetype.split("/")[0] === "application" ||
    file.mimetype.split("/")[0] === "video" ||
    file.mimetype.split("/")[0] === "audio"
  ) {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 5 },
});

app.post("/upload", upload.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv3(req.files);
    // console.log(results);

    // Extract the modifiedKey from the results and include it in the JSON response
    const urls = results.map((result) => result.url);

    return res.json({ status: "success", urls });
    // return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

app.listen(4000, () => console.log("listening on port 4000"));
