import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ReviewContainer = styled.div`
  margin-top: 30px;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StarRating = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 24px;
  color: ${(props) => (props.selected ? "gold" : "gray")};
`;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  cursor: pointer;
`;

const ReviewList = styled.div`
  margin-top: 20px;
`;

const ReviewItem = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px 0;
`;

const ReviewsAndComments = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const user = useSelector((state) => state.user.currentUser);
  const token = user?.token;
  //console.log(token)

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/products/${productId}/reviews`
      );
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please log in to submit a review");
      return;
    }
    try {
      const newReviewData = {
        rating: newReview.rating,
        comment: newReview.comment,
        userName: user.username || "Anonymous",
      };
      await axios.post(
        `http://localhost:8000/api/products/${productId}/reviews`,
        newReviewData,
        { withCredentials: true }
      );
      fetchReviews();
      setNewReview({ rating: 0, comment: "" });
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        selected={index < rating}
        onClick={() => setNewReview({ ...newReview, rating: index + 1 })}
      >
        ★
      </Star>
    ));
  };

  return (
    <ReviewContainer>
      <h3>Reviews and Comments</h3>
      <ReviewForm onSubmit={handleSubmitReview}>
        <StarRating>{renderStars(newReview.rating)}</StarRating>
        <TextArea
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          placeholder="Write your review..."
          required
        />
        <SubmitButton type="submit">Submit Review</SubmitButton>
      </ReviewForm>
      <ReviewList>
        {reviews.map((review) => (
          <ReviewItem key={review._id}>
            <p>User: {review.userName || "Anonymous"}</p>
            <p>Rating: {renderStars(review.rating)}</p>
            <p>{review.comment}</p>
          </ReviewItem>
        ))}
      </ReviewList>
    </ReviewContainer>
  );
};

export default ReviewsAndComments;
