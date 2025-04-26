import React, { useState } from "react";

const API_TOKEN =
  "BO2G3Dm3081LL4t2EGfmNRkhdvamYA"; // ⛔ Don't expose real keys in production!

export default function Tess() {
  const [description, setDescription] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);

  const guessMovie = async () => {
    setLoading(true);
    setMovieName("");

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `What movie is this based on the following description: ${description}? Reply with just the movie name.`,
              },
            ],
            temperature: 0.7,
            max_tokens: 100,
          }),
        }
      );

      const data = await response.json();
      const guess =
        data.choices?.[0]?.message?.content || "Couldn't guess. Try again.";
      setMovieName(guess.trim());
    } catch (error) {
      setMovieName("Error with AI model. Check API key or internet.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>🎬 Movie Memory Assistant</h2>
      <textarea
        style={styles.textarea}
        rows="5"
        placeholder="Describe the movie you remember..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button style={styles.button} onClick={guessMovie} disabled={loading}>
        {loading ? "Thinking..." : "Guess Movie"}
      </button>
      {movieName && (
        <p>
          <strong>AI Guess:</strong> {movieName}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  },
};
