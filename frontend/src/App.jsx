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
    formData.append("statement", file); // Must match backend field name

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:4000/api/parse", formData, {
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
    <div style={{ padding: 20 }}>
      <h1>Credit Card Statement Parser Demo</h1>

      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginLeft: 10 }}>Upload</button>

      {loading && <p>Uploading...</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h2>Parsed Result</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
