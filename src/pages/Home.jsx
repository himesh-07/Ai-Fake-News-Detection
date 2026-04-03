import React, { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Please enter some news text.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const res = await fetch("https://ai-fake-news-detection-g1e5.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data.prediction);
      }
    } catch (err) {
      setError("Failed to connect to the server. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Fake -News Detector</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Enter news text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br /><br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Checking..." : "Check"}
      </button>

      {error && <h3 style={{ color: "red" }}>{error}</h3>}
      {result && (
        <h2 style={{ color: result === "Real News" ? "green" : "red" }}>
          {result}
        </h2>
      )}
    </div>
  );
}

export default Home;
