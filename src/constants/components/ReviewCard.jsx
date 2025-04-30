import "../../pages/MovieDetails.css";

import React ,{useState} from "react";

export default function ReviewCard (props)  {
  const { review, index } = props;

  const reviewDate = new Date(review.created_at);
  const formattedDate = reviewDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Extract rating if available
  const ratingMatch = review.content.match(
    /Rating:\s*(\d+(\.\d+)?)\s*\/\s*10/i
  );
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

  // Handle long reviews with read more/less
  const isLongReview = review.content.length > 300;
  
  return (
    <div className="review-card" key={review.id || index}>
      <div className="review-header">
        <div className="reviewer-info">
          <div className="avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="reviewer-details">
            <h4 className="reviewer-name">{review.author}</h4>
            <span className="review-date">{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="review-body">
        {isLongReview ? (
          <ReviewContent content={review.content} />
        ) : (
          <p>{review.content}</p>
        )}
      </div>
    </div>
  );
};
const ReviewContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const shortContent = content.substring(0, 300) + "...";

  return (
    <>
      {expanded ? (
        <>
          <p>{content.substring(0,500)}</p>
          <button className="btn-read-less" onClick={() => setExpanded(false)}>
            Read less
          </button>
        </>
      ) : (
        <>
          <p>{shortContent}</p>
          <button className="btn-read-more" onClick={() => setExpanded(true)}>
            Read more
          </button>
        </>
      )}
    </>
  );
};
