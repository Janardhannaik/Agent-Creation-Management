// backend/utils/fileParser.js
const csv = require("csv-parser");
const xlsx = require("xlsx");
const { Readable } = require("stream");
const path = require("path");

/**
 * Convert buffer to stream and parse CSV rows -> array of objects
 */
const parseCSVBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream
      .pipe(csv())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
};

const parseXLSXBuffer = (buffer) => {
  const workbook = xlsx.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(worksheet, { defval: "" });
  return json;
};

/**
 * Normalize keys to { firstName, phone, notes }
 */
function normalizeRows(rows) {
  return rows
    .map((r) => {
      const lowerMap = Object.keys(r).reduce((acc, k) => {
        acc[k.toLowerCase().trim()] = k;
        return acc;
      }, {});

      const firstKey =
        lowerMap["firstname"] ||
        lowerMap["first name"] ||
        lowerMap["first_name"] ||
        lowerMap["name"] ||
        null;
      const phoneKey =
        lowerMap["phone"] ||
        lowerMap["phone number"] ||
        lowerMap["mobile"] ||
        lowerMap["contact"] ||
        null;
      const notesKey = lowerMap["notes"] || lowerMap["note"] || null;

      return {
        firstName: firstKey ? String(r[firstKey]).trim() : "",
        phone: phoneKey ? String(r[phoneKey]).trim() : "",
        notes: notesKey ? String(r[notesKey]).trim() : "",
      };
    })
    .filter((row) => row.firstName || row.phone || row.notes);
}

async function parseFileBuffer(buffer, originalname = "") {
  const ext = path.extname(originalname).toLowerCase();
  let rows = [];
  if (ext === ".csv") {
    rows = await parseCSVBuffer(buffer);
  } else if (ext === ".xls" || ext === ".xlsx") {
    rows = parseXLSXBuffer(buffer);
  } else {
    // try CSV parsing by default
    rows = await parseCSVBuffer(buffer);
  }
  return normalizeRows(rows);
}

module.exports = parseFileBuffer;
