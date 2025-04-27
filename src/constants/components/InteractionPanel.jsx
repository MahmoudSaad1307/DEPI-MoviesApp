import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './InteractionPanel.css'; 
export default function MovieActionBar() {
  const [activeRating, setActiveRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [activeButtons, setActiveButtons] = useState({
    watched: false,
    addToList: false,
    watchLater: false
  });

  // Get effective rating (hovered or active)
  const effectiveRating = hoveredRating !== null ? hoveredRating : activeRating;

  // Handle clicking on action buttons
  const toggleButton = (buttonName) => {
    setActiveButtons(prev => ({
      ...prev,
      [buttonName]: !prev[buttonName]
    }));
  };

  // Get CSS class for a segment based on its score and current rating
  const getSegmentClass = (segmentScore) => {
    if (segmentScore > effectiveRating) {
      return "segment"; // Default class
    }
    
    if (effectiveRating < 4) {
      return "segment segment-low"; // Red for low ratings
    } else if (effectiveRating < 7) {
      return "segment segment-medium"; // Yellow for medium ratings
    } else {
      return "segment segment-high"; // Green for high ratings
    }
  };

  return (
      <div className="movie-actions-container">
        {/* Action Buttons */}
        <div className="action-buttons">
          <button 
            className={`action-btn mx-1 my-1 ${activeButtons.watched ? 'active' : ''}`}
            onClick={() => toggleButton('watched')}
          >
          <i class="fa-solid fa-eye"></i> Watched
          </button>
          
          <button 
            className={`action-btn mx-1 my-1 ${activeButtons.addToList ? 'active' : ''}`}
            onClick={() => toggleButton('addToList')}
          >
            <i className="fas fa-plus"></i> Add to List
          </button>
          
          {/* <div style={{height:'1px', display:'block ',backgroundColor:'gray',width:'50000px'}}></div> */}
          <button 
            className={`action-btn mx-1 my-1 ${activeButtons.watchLater ? 'active' : ''}`}
            onClick={() => toggleButton('watchLater')}
          >
            <i className="fas fa-clock"></i> Watch Later
          </button>  
          <button 
            className={`action-btn mx-1 my-1 ${activeButtons.favorite ? 'active' : ''}`}
            onClick={() => toggleButton('favorite')}
          >
            <i className="fas fa-heart"></i> Favorite
          </button>
        </div>
        
        {/* Rating Strip */}
        <div className="score-container">
          <div className="score-bar">
            {[...Array(10)].map((_, i) => {
              const segmentScore = i + 1;
              return (
                <div
                  key={segmentScore}
                  className={getSegmentClass(segmentScore)}
                  onMouseEnter={() => setHoveredRating(segmentScore)}
                  onMouseLeave={() => setHoveredRating(null)}
                  onClick={() => setActiveRating(segmentScore)}
                >
                  {i < 9 && <div className="segment-divider"></div>}
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="user-rating">
          <span>Your Rating: <span className="your-rating">
            {hoveredRating ? `${hoveredRating}/10` : activeRating?`${activeRating}/10`: "Not Rated"}
          </span></span>
        </div>
      </div>
  );
}