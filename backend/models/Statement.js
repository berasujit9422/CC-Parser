const mongoose = require("mongoose");

const StatementSchema = new mongoose.Schema({
  filename: String,
  issuer: String,
  parsedData: Object,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Statement", StatementSchema);
