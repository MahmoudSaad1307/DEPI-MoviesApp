import React, { useState } from 'react';

function MovieGuessingApp() {
  const [description, setDescription] = useState('');
  const [movieName, setMovieName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGuess = async () => {
    setLoading(true);
    const response = await fetch('/api/guess-movie', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description })
    });
    const data = await response.json();
    setMovieName(data.movie);
    setLoading(false);
  };

  return (
    <div>
      <textarea
        placeholder="Describe the movie..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button onClick={handleGuess}>Guess Movie</button>
      {loading ? <p>Thinking...</p> : <p><strong>Guess:</strong> {movieName}</p>}
    </div>
  );
}
