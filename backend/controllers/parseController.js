const fs = require("fs");
const path = require("path");
const Statement = require("../models/Statement")

exports.handleParse = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Hardcoded dummy data for demo
    const parsed = {
      issuer: "HDFC Bank",
      cardEnding: "1234",
      variant: "Regalia",
      billingPeriod: "01 Oct 2025 - 31 Oct 2025",
      dueDate: "25 Nov 2025",
      totalDue: "₹4,589.00",
    };

    // Save to MongoDB (optional)
    const stmt = new Statement({
      filename: req.file.originalname,
      issuer: parsed.issuer,
      parsedData: parsed,
    });
    await stmt.save();

    // Delete uploaded file
    fs.unlinkSync(path.resolve(req.file.path));

    return res.json({ success: true, parsed });
  } catch (err) {
    console.error("❌ Error parsing:", err);
    res.status(500).json({ error: "Parsing failed", details: err.message });
  }
};
