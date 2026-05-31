import reviewModel from "../models/reviewModel.js";

// Add or update review for a product
export const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.headers.token; // Using token as userId

    if (!productId || !rating || !comment) {
      return res.json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    // Validate comment length
    if (comment.trim().length < 5 || comment.length > 1000) {
      return res.json({
        success: false,
        message: "Comment must be between 5 and 1000 characters",
      });
    }

    // Check if review already exists
    const existingReview = await reviewModel.findOne({
      productId,
      userId,
    });

    let review;
    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
      existingReview.createdAt = new Date();
      review = await existingReview.save();
    } else {
      // Create new review
      const newReview = new reviewModel({
        productId,
        userId,
        rating,
        comment,
      });
      review = await newReview.save();
    }

    return res.json({
      success: true,
      message: "Review saved successfully",
      review,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get all reviews for a product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.json({
        success: false,
        message: "Product ID is required",
      });
    }

    const reviews = await reviewModel
      .find({ productId })
      .sort({ createdAt: -1 })
      .select("rating comment createdAt userName");

    // Calculate average rating
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;

    return res.json({
      success: true,
      reviews,
      averageRating: Math.round(averageRating * 10) / 10,
      reviewCount: reviews.length,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Delete a review (user can delete their own)
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.body;
    const userId = req.headers.token;

    if (!reviewId) {
      return res.json({
        success: false,
        message: "Review ID is required",
      });
    }

    const review = await reviewModel.findById(reviewId);

    if (!review) {
      return res.json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized: You can only delete your own reviews",
      });
    }

    await reviewModel.findByIdAndDelete(reviewId);

    return res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get user's review for a specific product
export const getUserProductReview = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.headers.token;

    if (!productId) {
      return res.json({
        success: false,
        message: "Product ID is required",
      });
    }

    const review = await reviewModel.findOne({
      productId,
      userId,
    });

    return res.json({
      success: true,
      review: review || null,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
