import React, { useState, useEffect } from "react";

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

// Enhanced movie database with metadata
const movieDatabase = {
  Action: [
    { title: "Mad Max: Fury Road", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "John Wick", length: "90–120 mins", era: "Modern", vibe: "Dark" },
    { title: "Die Hard", length: "90–120 mins", era: "Classic", vibe: "Feel-good" },
    { title: "The Matrix", length: "> 120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Raiders of the Lost Ark", length: "90–120 mins", era: "Classic", vibe: "Feel-good" }
  ],
  Comedy: [
    { title: "Superbad", length: "90–120 mins", era: "Modern", vibe: "Funny" },
    { title: "The Grand Budapest Hotel", length: "90–120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Groundhog Day", length: "90–120 mins", era: "Classic", vibe: "Feel-good" },
    { title: "Bridesmaids", length: "90–120 mins", era: "Modern", vibe: "Funny" },
    { title: "Airplane!", length: "< 90 mins", era: "Classic", vibe: "Funny" }
  ],
  Drama: [
    { title: "The Shawshank Redemption", length: "> 120 mins", era: "Classic", vibe: "Thought-provoking" },
    { title: "Parasite", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "The Godfather", length: "> 120 mins", era: "Classic", vibe: "Dark" },
    { title: "Marriage Story", length: "> 120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Good Will Hunting", length: "> 120 mins", era: "Classic", vibe: "Feel-good" }
  ],
  Horror: [
    { title: "Hereditary", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "The Conjuring", length: "90–120 mins", era: "Modern", vibe: "Dark" },
    { title: "Psycho", length: "< 90 mins", era: "Classic", vibe: "Dark" },
    { title: "Get Out", length: "90–120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "The Shining", length: "> 120 mins", era: "Classic", vibe: "Dark" }
  ],
  "Sci-Fi": [
    { title: "Interstellar", length: "> 120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "Blade Runner 2049", length: "> 120 mins", era: "Modern", vibe: "Dark" },
    { title: "Back to the Future", length: "90–120 mins", era: "Classic", vibe: "Funny" },
    { title: "Arrival", length: "90–120 mins", era: "Modern", vibe: "Thought-provoking" },
    { title: "2001: A Space Odyssey", length: "> 120 mins", era: "Classic", vibe: "Thought-provoking" }
  ]
};

export default function MovieRecommendation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isFinalStep, setIsFinalStep] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getRecommendations = () => {
    if (answers.length < 4) return [];
    
    const [genre, length, era, vibe] = answers;
    const genreMovies = movieDatabase[genre] || [];
    
    const scoredMovies = genreMovies.map(movie => {
      let score = 0;
      if (movie.length === length) score += 3;
      if (movie.era === era) score += 2;
      if (movie.vibe === vibe) score += 2;
      return { ...movie, score };
    });
    
    const sortedMovies = scoredMovies.sort((a, b) => b.score - a.score);
    
    return sortedMovies.slice(0, 3).map(movie => ({
      title: movie.title,
      matchScore: `${Math.round((movie.score / 7) * 100)}%`,
      details: `${movie.length} • ${movie.era} • ${movie.vibe}`
    }));
  };

  useEffect(() => {
    if (isFinalStep) {
      setRecommendations(getRecommendations());
    }
  }, [isFinalStep, answers]);

  const handleOptionClick = (option) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);
  
      if (step < questions.length - 1) {
        setStep(step + 1);
      } else {
        setIsFinalStep(true);
      }
      
      setIsTransitioning(false);
    }, 300);
  };

  const restart = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setStep(0);
      setAnswers([]);
      setRecommendations([]);
      setIsFinalStep(false);
      setIsTransitioning(false);
    }, 300);
  };

  const getThemeColor = () => {
    if (answers.length === 0) return "bg-gradient-to-r from-purple-600 to-blue-500";
    
    const genreColors = {
      "Action": "bg-gradient-to-r from-red-600 to-orange-500",
      "Comedy": "bg-gradient-to-r from-yellow-400 to-orange-500",
      "Drama": "bg-gradient-to-r from-blue-600 to-indigo-600",
      "Horror": "bg-gradient-to-r from-gray-800 to-gray-900",
      "Sci-Fi": "bg-gradient-to-r from-teal-500 to-blue-500"
    };
    
    return genreColors[answers[0]] || "bg-gradient-to-r from-purple-600 to-blue-500";
  };

  const getThemeTextColor = () => {
    if (answers.length === 0) return "text-purple-600";
    
    const genreTextColors = {
      "Action": "text-red-600",
      "Comedy": "text-yellow-600",
      "Drama": "text-blue-600",
      "Horror": "text-gray-800",
      "Sci-Fi": "text-teal-600"
    };
    
    return genreTextColors[answers[0]] || "text-purple-600";
  };
  
  const getButtonHoverColor = () => {
    if (answers.length === 0) return "hover:bg-purple-100";
    
    const genreButtonColors = {
      "Action": "hover:bg-red-100",
      "Comedy": "hover:bg-yellow-100",
      "Drama": "hover:bg-blue-100",
      "Horror": "hover:bg-gray-200",
      "Sci-Fi": "hover:bg-teal-100"
    };
    
    return genreButtonColors[answers[0]] || "hover:bg-purple-100";
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-8 bg-dark rounded-2xl shadow-xl">
      {/* Header with dynamic background */}
      <div className={`absolute top-0 left-0 w-full h-32 ${getThemeColor()} rounded-t-2xl -z-10`}></div>
      
      
      {/* Card content */}
      <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-3">
            {questions.map((_, index) => (
              <div 
                key={index} 
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                  index < step ? "scale-90 bg-green-500 text-white" : 
                  index === step ? "scale-110 shadow-md " + getThemeColor() + " text-white" : 
                  "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getThemeColor()} rounded-full transition-all duration-500`}
              style={{ width: `${(step / (questions.length - 1)) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Question section */}
        {!isFinalStep ? (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">{questions[step].question}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`p-4 bg-gray-50 ${getButtonHoverColor()} ${getThemeTextColor()} rounded-xl font-medium transition-all duration-200 border border-gray-200 hover:shadow-md transform hover:-translate-y-1`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">Your Perfect Movie Matches</h2>
            
            {/* Selected preferences summary */}
            <div className="mb-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-medium mb-3 text-gray-700">Your preferences:</h3>
              <div className="flex flex-wrap gap-2">
                {answers.map((answer, index) => (
                  <span key={index} className={`px-3 py-1 ${getThemeColor()} text-white rounded-full text-sm font-medium shadow-sm`}>
                    {answer}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Recommendations */}
            {recommendations.length > 0 ? (
              <div className="space-y-5">
                {recommendations.map((rec, index) => (
                  <div 
                    key={index} 
                    className="p-5 border rounded-xl bg-dark shadow-md transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                      <h3 className="font-bold text-xl">{rec.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        parseInt(rec.matchScore) > 70 ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {rec.matchScore} match
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{rec.details}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-gray-50 rounded-xl">
                <p className="text-gray-600">No recommendations found. Please try different preferences.</p>
              </div>
            )}
            
            <button 
              onClick={restart}
              className={`w-full mt-8 p-4 ${getThemeColor()} hover:opacity-90 text-white rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1`}
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}