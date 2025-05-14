import { useEffect, useState } from "react";
import { findUserById } from "../../../Backend/api/api";
import "../../pages/MovieDetails.css";
import { Link } from "react-router-dom";

export default function ReviewCard(props) {
  const { review,goToMovie=false } = props;
  
  const [user, setUser] = useState(null);
  useEffect(() => {
    // console.log(review);
    // console.log("review from the card:",review);

    findUser();
  }, []);

  const findUser = async () => {
    try {
      const response = await findUserById({ userId: review?.userId });
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  let text = review?.content.text;
  // text = "jsdkljgklasklfj;klasd;jklfjklsjs;fkljsdjklfkkfsjklgjkldjgklj;kl";
  const reviewDate = new Date(review?.timestamps.createdAt);
  const formattedDate = reviewDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Handle long reviews with read more/less
  const isLongReview = text?.length > 300;

  return (
    

    <Link  to={goToMovie && `/movie-details/movie/${review?.movieId}`} >
    
    
    
    <div className="review-card mx-0" key={review._id}>
      <div className="review-header">
        <div className="reviewer-info">
          <img
            src={user?.photoURL}
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            alt=""
          />
          <div className="reviewer-details">
            <h4 className="reviewer-name">{user?.name}</h4>
            <span className="review-date">{formattedDate}</span>
          </div>
        </div>
      </div>
      <div className="review-body p-3">
        {isLongReview ? <ReviewContent content={text} /> : <p>{text}</p>}
      </div>
    </div>
    </Link>
  );
}

const ReviewContent = ({ content }) => {
  const [expanded, setExpanded] = useState(false);
  const shortContent = content.substring(0, 300) + "...";

  return (
    <>
      {expanded ? (
        <>
          <p>{content.substring(0, 500)}</p>
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
