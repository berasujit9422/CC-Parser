const express = require("express");
const multer = require("multer");
const { handleParse } = require("../controllers/parseController");

const router = express.Router();

// Multer setup for PDF uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// POST /api/parse
router.post("/", upload.single("statement"), handleParse);

module.exports = router;
