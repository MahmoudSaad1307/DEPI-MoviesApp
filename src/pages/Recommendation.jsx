import React, { useState } from "react";

const questions = [
  {
    question: "What genre are you in the mood for?",
    options: ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"]
  },
  {
    question: "How long do you want the movie to be?",
    options: ["< 90 mins", "90–120 mins", "> 120 mins"]
  },
  {
    question: "Do you prefer old or recent movies?",
    options: ["Classic", "Modern"]
  },
  {
    question: "Pick a vibe:",
    options: ["Feel-good", "Thought-provoking", "Dark", "Funny"]
  }
];

// Mock movie database with metadata
const mockRecommendations = {
  Action: [
    { title: "Mad Max: Fury Road", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "John Wick", length: "90–120 mins", era: "Modern", vibe: "Dark" },
    { title: "Die Hard", length: "90–120 mins", era: "Classic", vibe: "Feel-good" }
  ],
  Comedy: [
    { title: "Superbad", length: "90–120 mins", era: "Modern", vibe: "Funny" },
    { title: "The Grand Budapest Hotel", length: "90–120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Groundhog Day", length: "90–120 mins", era: "Classic", vibe: "Feel-good" }
  ],
  Drama: [
    { title: "The Shawshank Redemption", length: "> 120 mins", era: "Classic", vibe: "Thought-provoking" },
    { title: "Parasite", length: "90–120 mins", era: "Modern", vibe: "Dark" }
  ],
  Horror: [
    { title: "Hereditary", length: "90–120 mins", era: "Modern", vibe: "Dark" },
    { title: "The Conjuring", length: "90–120 mins", era: "Modern", vibe: "Dark" },
    { title: "Psycho", length: "< 90 mins", era: "Classic", vibe: "Dark" }
  ],
  "Sci-Fi": [
    { title: "Interstellar", length: "> 120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Blade Runner 2049", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "Back to the Future", length: "90–120 mins", era: "Classic", vibe: "Funny" }
  ]
};

export default function MovieRecommendation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const handleOptionClick = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Enhanced logic using all answers
      const [genre, length, era, vibe] = newAnswers;
      const genreMovies = mockRecommendations[genre] || [];

      const filteredMovies = genreMovies.filter(
        (movie) =>
          movie.length === length &&
          movie.era === era &&
          movie.vibe === vibe
      );

      setRecommendations(filteredMovies.map((m) => m.title));
    }
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
    setRecommendations([]);
  };

  return (
    <div style={{
      maxWidth: "600px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      fontFamily: "Arial"
    }}>
      {step < questions.length ? (
        <div>
          <h2>{questions[step].question}</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "10px" }}>
            {questions[step].options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                style={{
                  padding: "10px 15px",
                  borderRadius: "8px",
                  border: "1px solid #333",
                  cursor: "pointer"
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>Recommended Movies:</h2>
          {recommendations.length > 0 ? (
            <ul>
              {recommendations.map((movie) => (
                <li key={movie}>{movie}</li>
              ))}
            </ul>
          ) : (
            <p>No recommendations found based on your preferences.</p>
          )}
          <button onClick={restart} style={{
            marginTop: "20px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #333",
            cursor: "pointer"
          }}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
