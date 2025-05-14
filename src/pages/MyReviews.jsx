import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { getMyReviews } from "../../Backend/api/api";
import ReviewCard from "../constants/components/ReviewCard";
import "../pages/MovieDetails.css";

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await getMyReviews({
        userId: user._id,
      });
      setReviews(response.data);
      console.log("Fetched reviews:", response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <ClipLoader color="#0d6efd" size={60} />
        </div>
      ) : (
        <div className="container mt-5 reviews-container">
          <h1 style={{ display: "inline-block" }} className="mb-5 col-12">
            {user.name}'s Reviews
          </h1>
          <br />
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 reviews-container ">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} goToMovie={true} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyReviews;
