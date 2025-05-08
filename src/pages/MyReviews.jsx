import React, { useEffect, useState } from "react";
import { getMyReviews } from "../api/api";
import ReviewCard from "../constants/components/ReviewCard";
import "../pages/MovieDetails.css"
import { useSelector } from "react-redux";

export const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const {user}=useSelector((state)=>state.user)

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await getMyReviews({
        userId: user._id,
      });
      setReviews(response.data);
      console.log("Fetched reviews:", response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-5">{user.name}'s Reviews</h1>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 g-5 ">
        {reviews.map((review) => (

            <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default MyReviews;