const router = require("express").Router();
const Review = require("../models/Product");
const { verifyToken } = require("../utils/verify");

// Tạo đánh giá mới
router.post("/:productId", async (req, res, next) => {
  const newReview = new Review({
    userId: req.user.id,
    productId: req.params.productId,
    rating: req.body.rating,
    comment: req.body.comment
  });

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    next(err);
  }
});

// Lấy tất cả đánh giá cho một sản phẩm
router.get("/:productId", async (req, res, next) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId });
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

module.exports = router;