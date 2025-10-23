Credit Card Statement Parser (MERN)

## Overview

This is a **MERN stack application** for uploading credit card PDF statements and extracting key information.
For demo purposes, **any uploaded PDF currently returns hardcoded JSON**.

**Features:**

* Upload PDF statements from any bank
* Returns dummy parsed data for testing
* Stores filename, issuer, and parsed data in MongoDB
* React frontend to upload PDF and display parsed JSON

---

## Tech Stack

* **Backend:** Node.js, Express, Multer, Mongoose
* **Database:** MongoDB Atlas / Local MongoDB
* **Frontend:** React.js, Axios
* **PDF Parsing:** `pdf-parse` (currently hardcoded for demo)

---

## Folder Structure

```text
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
```

---

## Backend Setup

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file with MongoDB connection:

```
MONGO_URI=your_mongodb_connection_string
```

4. Create `uploads` folder:

```bash
mkdir uploads
```

5. Start backend:

```bash
npm run dev
```

Server runs at: `http://localhost:4000`

---

## Frontend Setup

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm start
```

Frontend runs at: `http://localhost:3000`

---

## Usage

1. Open `http://localhost:3000` in browser.
2. Click **Choose File** and select any PDF.
3. Click **Upload**.
4. The frontend will display parsed JSON (hardcoded for demo):

```json
{
  "issuer": "HDFC Bank",
  "cardEnding": "1234",
  "variant": "Regalia",
  "billingPeriod": "01 Oct 2025 - 31 Oct 2025",
  "dueDate": "25 Nov 2025",
  "totalDue": "₹4,589.00"
}
```

---

## Notes

* Only **PDF files** are accepted.
* Uploaded files are temporarily stored in `backend/uploads` and deleted after parsing.
* MongoDB stores filename, issuer, and parsedData.
* To implement real parsing, replace the hardcoded JSON in `parseController.js` with `pdf-parse` logic.

---

## Future Enhancements

* Parse real statements from multiple banks
* Display parsed transactions in a table
* Add authentication and secure file uploads

---

## Author

* **Sujit Bera**

