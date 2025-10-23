const fs = require("fs");
const pdfParse = require("pdf-parse"); // <- note the variable name

/**
 * Extracts text from a PDF file (text-based PDFs only)
 * @param {string} filePath - path to uploaded PDF
 * @returns {Promise<string>} extracted text
 */
async function extractTextFromPdf(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer); // <- call pdfParse, not pdf()
    
    if (data.text && data.text.trim().length > 0) {
      console.log("✅ PDF parsed using pdf-parse");
      return data.text.trim();
    } else {
      throw new Error("No text found in PDF");
    }
  } catch (err) {
    console.error("❌ PDF parsing failed:", err);
    throw new Error("Failed to extract text from PDF. Ensure it is a text-based PDF.");
  }
}

module.exports = { extractTextFromPdf };
