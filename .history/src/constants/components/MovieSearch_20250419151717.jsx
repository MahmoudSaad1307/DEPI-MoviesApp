import React, { useState } from 'react';

const API_TOKEN = "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"; // ⛔ Don't expose real keys in production!

export default function Tess() {
  const [description, setDescription] = useState('');
  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(false);

  const guessMovie = async () => {
    setLoading(true);
    setMovieName('');

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-xl",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: `Guess the movie: ${description}`,
          }),
        }
      );

      const data = await response.json();
      const guess = data?.[0]?.generated_text || "Couldn't guess. Try again.";
      setMovieName(guess);
    } catch (error) {
      setMovieName("Error while guessing. Check your connection or API key.");
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
        <p><strong>AI Guess:</strong> {movieName}</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px'
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  }
};
