import React, { useEffect, useState } from "react";
import { getMyReviews } from "../api/api";
import ReviewCard from "../constants/components/ReviewCard";
import "../pages/MovieDetails.css"

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getMyReviews({
        userId: "680f57fe84a68879a79ff410",
      });
      setReviews(response.data);
      console.log("Fetched reviews:", response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="mb-5">Mahmoud Saad's Reviews</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 ">
        {reviews.map((review) => (
          <div>

            <ReviewCard key={review._id} review={review} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyReviews;