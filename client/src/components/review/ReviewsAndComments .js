import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { format } from "date-fns";

const ReviewContainer = styled.div`
  margin-top: 30px;
  max-width: 800px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  color: #333;
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const ReviewForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const StarRating = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
`;

const Star = styled.span`
  cursor: pointer;
  font-size: 30px;
  color: ${(props) => (props.selected ? "#ffc107" : "#e4e5e9")};
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ffc107;
  }
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #45a049;
  }
`;

const ReviewList = styled.div`
  margin-top: 30px;
`;

const ReviewItem = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ReviewUser = styled.p`
  font-weight: bold;
  color: #333;
`;

const ReviewDate = styled.p`
  color: #888;
  font-size: 0.9em;
`;

const ReviewRating = styled.div`
  margin-bottom: 10px;
`;

const ReviewComment = styled.p`
  color: #555;
  line-height: 1.6;
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
        `https://louis-a89w.onrender.com/api/products/${productId}/reviews`
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
        `https://louis-a89w.onrender.com/api/products/${productId}/reviews`,
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
      <Title>Reviews and Comments</Title>
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
            <ReviewHeader>
              <ReviewUser>{review.userName || "Anonymous"}</ReviewUser>
              <ReviewDate>{format(new Date(review.createdAt), "PPP")}</ReviewDate>
            </ReviewHeader>
            <ReviewRating>{renderStars(review.rating)}</ReviewRating>
            <ReviewComment>{review.comment}</ReviewComment>
          </ReviewItem>
        ))}
      </ReviewList>
    </ReviewContainer>
  );
};

export default ReviewsAndComments;