import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, ProgressBar, Image } from 'react-bootstrap';
import styles from './Recommendation.module.css';
import { API_KEY, BASE_URL, IMAGE_URL, MOVIE_GENRES } from '../constants/constants';
import { Link } from 'react-router-dom';

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
    question: "Please choose any genre you're interested in. (Multiple answers are possible)",
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
      "Doesn't matter.",
      "Published in the last 5 years.",
      "Published in the last 10 years.",
      "Published in the last 25 years."
    ],
    type: "single",
  },
  {
    question: "Is the age-appropriateness rating of the movie important to you?",
    options: [
      "Yes, I would like to choose the ratings that I'm okay with.",
      "No, it doesn't matter."
    ],
    type: "single",
  },
  {
    question: "Please select all MPAA ratings that you're okay with. (Multiple answers are possible)",
    options: [
      "G-Rated: All ages admitted.",
      "PG-Rated: Some material may not be suitable for children.",
      "PG-13-Rated: Some material may be inappropriate for children under 13.",
      "R-Rated: Under 17 requires accompanying parent or adult guardian."
    ],
    type: "multiple",
  },
  {
    question: "Please select any other category you're interested in.",
    options: [
      "I don't have a preference.",
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
  const [hoveredOption, setHoveredOption] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Track window resize for responsive adjustments
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
      // Scroll to top when moving to next question on mobile
      if (windowWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      setShowResult(true);
      // Scroll to top when showing results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
      // Scroll to top when moving to previous question on mobile
      if (windowWidth < 768) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResult(false);
    setRecommendedMovies([]);
    setError(null);
    // Scroll to top when restarting
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentQ = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const isOptionSelected = (option) => {
    if (!answers[step]) return false;
    return currentQ.type === "multiple"
      ? answers[step].includes(option)
      : answers[step] === option;
  };

  const getOptionClassName = (idx, option) => {
    let className = styles.optionCard;
    if (isOptionSelected(option)) {
      className += ` ${styles.selected}`;
    }
    if (hoveredOption === idx) {
      className += ` ${styles.hovered}`;
    }
    return className;
  };

  const getColumnSize = (options) => {
    if (windowWidth < 576) return 12; 
    if (windowWidth < 768) return 6;  
    
    if (options.length <= 3) return 4;
    if (options.length <= 6) return 6;
    return 4; 
  };

  useEffect(() => {
    if (showResult) {
      const fetchRecommendations = async () => {
        setLoading(true);
        setError(null);
        try {
          let query = `api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1&include_adult=false`;

          if (answers[0]) {
            const mood = answers[0];
            if (mood === "Happy") {
              const comedyId = MOVIE_GENRES.find(g => g.name === "Comedy")?.id;
              if (comedyId) query += `&with_genres=${comedyId}`;
            } else if (mood === "Sad") {
              const dramaId = MOVIE_GENRES.find(g => g.name === "Drama")?.id;
              if (dramaId) query += `&with_genres=${dramaId}`;
            }
          }

          if (answers[2] && answers[2].length > 0) {
            const selectedGenres = answers[2]
              .map(genre => MOVIE_GENRES.find(g => g.name === genre)?.id)
              .filter(id => id);
            if (selectedGenres.length > 0) {
              query += `&with_genres=${selectedGenres.join(',')}`;
            }
          }

          const releaseAnswer = answers[3];
          const currentYear = new Date().getFullYear();
          if (releaseAnswer && releaseAnswer !== "Doesn't matter.") {
            if (releaseAnswer === "Published in the last 5 years.") {
              query += `&primary_release_date.gte=${currentYear - 5}-01-01`;
            } else if (releaseAnswer === "Published in the last 10 years.") {
              query += `&primary_release_date.gte=${currentYear - 10}-01-01`;
            } else if (releaseAnswer === "Published in the last 25 years.") {
              query += `&primary_release_date.gte=${currentYear - 25}-01-01`;
            }
          }

          if (answers[4] === "Yes, I would like to choose the ratings that I'm okay with." && answers[5] && answers[5].length > 0) {
            const ratings = answers[5].map(rating => {
              if (rating.includes("G-Rated")) return "G";
              if (rating.includes("PG-Rated")) return "PG";
              if (rating.includes("PG-13-Rated")) return "PG-13";
              if (rating.includes("R-Rated")) return "R";
              return null;
            }).filter(r => r);
            if (ratings.length > 0) {
              query += `&certification_country=US&certification=${ratings.join('|')}`;
            }
          }

          const response = await fetch(`${BASE_URL}/discover/movie?${query}`);
          if (!response.ok) throw new Error('Failed to fetch movies');
          const data = await response.json();
          
          // Determine number of movies to show based on screen size
          const moviesCount = windowWidth < 576 ? 4 : 6;
          
          if (data.results && data.results.length > 0) {
            setRecommendedMovies(data.results.slice(0, moviesCount));
          } else {
            setError('No movies found matching your preferences.');
          }
        } catch (err) {
          setError('Failed to fetch recommendations. Please try again.');
          console.error(err);
        }
        setLoading(false);
      };
      fetchRecommendations();
    }
  }, [showResult, answers, windowWidth]);

  return (
    <Container  className={`${styles.movieQuizContainer} mt-5 `}>
      <Card className={styles.quizCard}>
        <div className={styles.quizHeader}>
          <h1>Movie Recommendation Quiz</h1>
          <p>Find your perfect movie match based on your preferences</p>
          {!showResult && (
            <div className={styles.progressSection}>
              <ProgressBar now={progress} className={styles.customProgress} />
              <div className={styles.progressInfo}>
                <span>Question {step + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
            </div>
          )}
        </div>

        {!showResult ? (
          <Card.Body>
            <h3 className={styles.questionText}>{currentQ.question}</h3>
            <Row className={styles.optionsContainer}>
              {currentQ.options.map((option, idx) => (
                <Col xs={12} sm={getColumnSize(currentQ.options)} key={idx}>
                  <div
                    className={getOptionClassName(idx, option)}
                    onClick={() => handleOptionSelect(option)}
                    onMouseEnter={() => setHoveredOption(idx)}
                    onMouseLeave={() => setHoveredOption(null)}
                  >
                    <div className={styles.optionContent}>
                      <div className={`${styles.checkCircle} ${isOptionSelected(option) ? styles.checked : ''}`}>
                        {isOptionSelected(option) && <span className={styles.checkMark}>✓</span>}
                      </div>
                      <span>{option}</span>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
            <div className={styles.buttonContainer}>
              {step > 0 && (
                <Button
                  variant="outline-primary"
                  className={styles.backButton}
                  onClick={handlePrev}
                >
                  Back
                </Button>
              )}
              <Button
                variant="primary"
                className={styles.nextButton}
                onClick={handleNext}
                disabled={currentQ.type === "single" && !answers[step]}
              >
                {step + 1 < questions.length ? 'Next Question' : 'Get My Recommendations'}
              </Button>
            </div>
          </Card.Body>
        ) : (
          <Card.Body className={styles.resultsContainer}>
            <div className={styles.resultHeader}>
              <h2>🎬 Your Movie Recommendations</h2>
              <p>Based on your preferences, here are some movies you might enjoy.</p>
            </div>

            {loading && <p className="text-center">Loading recommendations...</p>}
            {error && <p className={styles.error}>{error}</p>}
            {!loading && !error && recommendedMovies.length > 0 && (
              <Row className={`${styles.movieGrid}`}>
                {recommendedMovies.map(movie => (
                  movie.poster_path&&
                  <Col xs={6} sm={6} md={4} key={movie.id} className={styles.movieCard}>
                    <Link to={`/movie-details/movie/${movie.id}`} className={styles.movieLink}>
                      <Card>
                        <Image
                          src={movie.poster_path ? `${IMAGE_URL}${movie.poster_path}` : 'https://via.placeholder.com/150'}
                          alt={movie.title}
                          className={styles.moviePoster}
                          fluid
                        />
                        <Card.Body>
                          <Card.Title className="text-truncate">{movie.title}</Card.Title>
                          <Card.Text className={styles.movieOverview}>
                            {movie.overview.length > (windowWidth < 576 ? 70 : 100)
                              ? `${movie.overview.substring(0, windowWidth < 576 ? 70 : 100)}...`
                              : movie.overview}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
            {!loading && !error && recommendedMovies.length === 0 && (
              <p className="text-center">No recommendations available. Try different preferences!</p>
            )}

            <div className={styles.resultItems}>
              <h3>Your Preferences Summary</h3>
              {questions.map((q, idx) => (
                <Card key={idx} className={styles.resultItem}>
                  <Card.Body>
                    <h4>{q.question}</h4>
                    <div className={styles.answerDisplay}>
                      {Array.isArray(answers[idx]) ? (
                        <div className={styles.tagContainer}>
                          {answers[idx] && answers[idx].length > 0 ? (
                            answers[idx].map((ans, i) => (
                              <span key={i} className={styles.answerTag}>
                                {ans}
                              </span>
                            ))
                          ) : (
                            <span className={styles.noAnswer}>No selection made</span>
                          )}
                        </div>
                      ) : (
                        <span className={answers[idx] ? styles.singleAnswer : styles.noAnswer}>
                          {answers[idx] || "No selection made"}
                        </span>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <Button
              variant="primary"
              className={styles.restartButton}
              onClick={handleRestart}
            >
              Start Over
            </Button>
          </Card.Body>
        )}

        <div className={styles.quizFooter}>
          Find the perfect movie for your mood and preferences!
        </div>
      </Card>
    </Container>
  );
};

export default MovieQuiz;