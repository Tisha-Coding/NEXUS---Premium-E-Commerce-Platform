import express from "express";
import {
  addReview,
  getProductReviews,
  deleteReview,
  getUserProductReview,
} from "../controllers/reviewController.js";
import authUser from "../middleware/auth.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", authUser, addReview);
reviewRouter.post("/get", getProductReviews);
reviewRouter.post("/user-review", authUser, getUserProductReview);
reviewRouter.post("/delete", authUser, deleteReview);

export default reviewRouter;
