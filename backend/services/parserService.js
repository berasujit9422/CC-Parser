const bankParsers = require("../parsers/bankParsers");

function detectIssuerAndParse(text) {
  const lower = text.toLowerCase();

  if (lower.includes("hdfc")) return { issuer: "HDFC", ...bankParsers.parseHDFC(text) };
  if (lower.includes("icici")) return { issuer: "ICICI", ...bankParsers.parseICICI(text) };
  if (lower.includes("axis")) return { issuer: "AXIS", ...bankParsers.parseAxis(text) };
  if (lower.includes("citi")) return { issuer: "CITI", ...bankParsers.parseCiti(text) };
  if (lower.includes("hsbc")) return { issuer: "HSBC", ...bankParsers.parseHSBC(text) };

  return { issuer: "UNKNOWN", ...bankParsers.parseGeneric(text) };
}

module.exports = { detectIssuerAndParse };
