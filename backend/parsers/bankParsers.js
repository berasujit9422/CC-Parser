function extractLast4(text) {
  const regex = /(ending|last|xx|xxxx|x{2,4})\\D*(\\d{4})/i;
  const match = text.match(regex);
  if (match) return match[2];
  const fallback = text.match(/\\b\\d{4}\\b/g);
  return fallback ? fallback[fallback.length - 1] : null;
}

function parseCommon(text) {
  const last4 = extractLast4(text);

  const totalMatch = text.match(/(total amount due|amount due|total due|outstanding balance)[^\\n₹$Rs]*([₹$Rs\\s]*[\\d,]+\\.?\\d{0,2})/i);
  const total = totalMatch ? totalMatch[2].replace(/[₹$Rs\\s,]/g, "") : null;

  const dueMatch = text.match(/(payment due date|due date)[:\\s]*([A-Za-z0-9 ,\\-\\/\\.]{4,30})/i);
  const dueDate = dueMatch ? dueMatch[2].trim() : null;

  const cycleMatch = text.match(/(billing period|statement period)[^\\n]*?(\\d{1,2}\\s*[A-Za-z]{3,9}\\s*\\d{4})[^\\n\\-to]*?(\\d{1,2}\\s*[A-Za-z]{3,9}\\s*\\d{4})/i);
  const billingCycle = cycleMatch ? { start: cycleMatch[2], end: cycleMatch[3] } : null;

  return { last4, total, dueDate, billingCycle };
}

module.exports = {
  parseHDFC: (text) => ({ ...parseCommon(text), cardVariant: (text.match(/(regalia|millennia|moneyback|diners)/i) || [])[0] }),
  parseICICI: (text) => ({ ...parseCommon(text), cardVariant: (text.match(/(rubyx|sapphiro|platinum)/i) || [])[0] }),
  parseAxis: (text) => ({ ...parseCommon(text), cardVariant: (text.match(/(magnus|ace|privilege|select)/i) || [])[0] }),
  parseCiti: (text) => ({ ...parseCommon(text), cardVariant: (text.match(/(rewards|premier|cashback)/i) || [])[0] }),
  parseHSBC: (text) => ({ ...parseCommon(text), cardVariant: (text.match(/(platinum|premier|advance)/i) || [])[0] }),
  parseGeneric: (text) => ({ ...parseCommon(text), cardVariant: null }),
};
