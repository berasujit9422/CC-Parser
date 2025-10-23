import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");

    const formData = new FormData();
    formData.append("statement", file); // must match backend field

    setLoading(true);
    try {
      const res = await axios.post("https://cc-parser-yugc.onrender.com/api/parse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.parsed);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Credit Card Statement Parser</h1>
        <p style={styles.subtitle}>
          Upload any PDF and see parsed statement data instantly
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          style={styles.fileInput}
        />
        <button onClick={handleUpload} style={styles.uploadBtn}>
          {loading ? "Uploading..." : "Upload PDF"}
        </button>

        {result && (
          <div style={styles.resultCard}>
            <h2 style={styles.resultTitle}>Parsed Result</h2>
            <pre style={styles.resultPre}>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline CSS styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    paddingTop: "50px",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  title: {
    margin: 0,
    fontSize: "28px",
    color: "#4f46e5",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: "25px",
  },
  fileInput: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    marginBottom: "15px",
    width: "80%",
  },
  uploadBtn: {
    padding: "12px 25px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "background-color 0.3s",
  },
  resultCard: {
    textAlign: "left",
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
  },
  resultTitle: {
    marginTop: 0,
    color: "#4f46e5",
  },
  resultPre: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    overflowX: "auto",
  },
};

export default App;
