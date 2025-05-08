import React, { useState } from 'react';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

const questions = [
  {
    question: "How are you today?",
    options: ["Happy", "Neutral", "Sad"],
    type: "single",
  },
  {
    question: "What comes closest to your occasion?",
    options: [
      "Just watching a movie by myself.",
      "Movie Date.",
      "Movie Night with friends.",
      "Date Night with boyfriend or girlfriend.",
      "Watching a movie with family or relatives."
    ],
    type: "single",
  },
  {
    question: "Please choose any genre you’re interested in. (Multiple answers are possible)",
    options: [
      "Action", "Comedy", "Drama", "Adventure", "Thriller", "Crime", "Romance",
      "Science Fiction", "Fantasy", "Family", "Mystery", "Biography", "History",
      "Animation", "Music", "Sport", "Disaster", "Western", "War", "Horror"
    ],
    type: "multiple",
  },
  {
    question: "How old would you like the movie to be?",
    options: [
      "Doesn’t matter.",
      "Published in the last 5 years.",
      "Published in the last 10 years.",
      "Published in the last 25 years."
    ],
    type: "single",
  },
  {
    question: "Is the age-appropriateness rating of the movie important to you?",
    options: [
      "Yes, I would like to choose the ratings that I’m okay with.",
      "No, it doesn’t matter."
    ],
    type: "single",
  },
  {
    question: "Please select all MPAA ratings that you’re okay with. (Multiple answers are possible)",
    options: [
      "G-Rated: All ages admitted.",
      "PG-Rated: Some material may not be suitable for children.",
      "PG-13-Rated: Some material may be inappropriate for children under 13.",
      "R-Rated: Under 17 requires accompanying parent or adult guardian."
    ],
    type: "multiple",
  },
  {
    question: "Please select any other category you’re interested in.",
    options: [
      "I don’t have a preference.",
      "Movies based on a true story",
      "Movies that may change the way you look at life",
      "Movies set in New York City",
      "Spy Movies and Cop Movies",
      "Space Movies",
      "Wedding Movies",
      "Heist Movies",
      "Movies based on a book",
      "Racing Movies",
      "Girl Power Movies",
      "Movies set in Las Vegas",
      "Movies with pre- or sequels",
      "IMDb Top 250 Movies"
    ],
    type: "multiple",
  }
];

const MovieQuiz = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleOptionSelect = (option) => {
    const currentQ = questions[step];
    if (currentQ.type === "single") {
      setAnswers({ ...answers, [step]: option });
    } else {
      const selected = answers[step] || [];
      const updated = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
      setAnswers({ ...answers, [step]: updated });
    }
  };

  const handleNext = () => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const currentQ = questions[step];

  return (
    <Container className="mt-5 text-center">
      {!showResult ? (
        <>
          <h3 className="mb-4">{step + 1}. {currentQ.question}</h3>
          <Row className="justify-content-center">
            {currentQ.options.map((option, idx) => {
              const isSelected =
                currentQ.type === "multiple"
                  ? answers[step]?.includes(option)
                  : answers[step] === option;

              return (
                <Col xs={12} sm={6} md={4} lg={3} key={idx} className="mb-3">
                  <Button
                    variant={isSelected ? 'success' : 'outline-success'}
                    className="w-100"
                    onClick={() => handleOptionSelect(option)}
                  >
                    {option}
                  </Button>
                </Col>
              );
            })}
          </Row>
          <Button
            variant="success"
            className="mt-4"
            onClick={handleNext}
            disabled={currentQ.type === "single" && !answers[step]}
          >
            {step + 1 < questions.length ? 'Next' : 'Show Recommendation'}
          </Button>
        </>
      ) : (
        <Card className="p-4 shadow-lg">
          <h3>🎬 Your Movie Preferences Summary:</h3>
          <ul className="text-start mt-3">
            {questions.map((q, idx) => (
              <li key={idx}>
                <strong>{q.question}</strong>
                <br />
                {Array.isArray(answers[idx])
                  ? answers[idx].join(", ")
                  : answers[idx] || "No answer"}
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Container>
  );
};

export default MovieQuiz;
