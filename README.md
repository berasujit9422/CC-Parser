Credit Card Statement Parser (MERN)
Overview

This is a MERN stack application that allows users to upload credit card statements in PDF format and extract key information. For demonstration purposes, any uploaded PDF currently returns hardcoded data.

Key features:

Backend: Node.js + Express + MongoDB

File uploads handled via Multer

Frontend: React.js for file selection and displaying parsed results

MongoDB stores uploaded file info and parsed data

Tech Stack

Backend: Node.js, Express, Multer, Mongoose

Database: MongoDB Atlas / Local MongoDB

Frontend: React.js, Axios

PDF Parsing: pdf-parse (currently returns hardcoded JSON for demo)

Folder Structure
cc-parser/
├── backend/
│   ├── controllers/
│   │   └── parseController.js
│   ├── models/
│   │   └── Statement.js
│   ├── routes/
│   │   └── parse.js
│   ├── services/
│   │   └── pdfService.js
│   ├── uploads/         # Folder for temporary PDF storage
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   └── App.js
│   ├── public/
│   └── package.json
└── README.md

Installation & Setup
Backend

Navigate to backend folder:

cd backend


Install dependencies:

npm install


Create .env file with MongoDB URI:

MONGO_URI=your_mongodb_connection_string


Create uploads folder:

mkdir uploads


Start backend server:

npm run dev


Server will run on http://localhost:4000

Frontend

Navigate to frontend folder:

cd frontend


Install dependencies:

npm install


Start frontend:

npm start


Frontend will run on http://localhost:5173

Usage

Open http://localhost:3000 in your browser.

Click Choose File and select a PDF.

Click Upload.

The frontend will display the parsed data

Example hardcoded JSON returned:

{
  "issuer": "HDFC Bank",
  "cardEnding": "1234",
  "variant": "Regalia",
  "billingPeriod": "01 Oct 2025 - 31 Oct 2025",
  "dueDate": "25 Nov 2025",
  "totalDue": "₹4,589.00"
}

Notes

Only PDF files are accepted.

Uploaded files are temporarily stored in backend/uploads and deleted after parsing.

MongoDB stores filename, issuer, and parsedData for each upload.

For real PDF parsing, replace hardcoded JSON with text extraction logic using pdf-parse or OCR.

Future Enhancements

Real parsing of multiple credit card statements from different banks.

Display parsed transactions in a table on frontend.

Authentication for secure file uploads.

Author

Sujit Bera
