import React, { useState } from "react";

function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("https://ai-fake-news-detection-g1e5.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
     console.log(data); 
    setResult(data.prediction);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Fake News Detector</h1>

      <textarea
        rows="5"
        cols="50"
        placeholder="Enter news text..."
        onChange={(e) => setText(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>Check</button>

      <h2>{result}</h2>
    </div>
  );
}

export default Home;
