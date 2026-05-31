import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { getCloudinarySrcSet } from "../utils/cloudinary";
import { sanitizeInput } from "../utils/sanitize";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, token, navigate, backendUrl } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [reviews, setReviews] = useState([]);
  const [ratingInput, setRatingInput] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [sizeError, setSizeError] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Fetch reviews from backend
  const loadReviews = async () => {
    try {
      setLoadingReviews(true);
      const response = await axios.post(
        `${backendUrl}/api/review/get`,
        { productId }
      );
      if (response.data.success) {
        setReviews(response.data.reviews || []);
      }
    } catch (error) {
      setReviews([]);
    } finally {
      setLoadingReviews(false);
    }
  };

  // Submit review to backend
  const submitReviewToBackend = async (rating, comment) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/review/add`,
        { productId, rating, comment: sanitizeInput(comment) },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Review saved successfully!");
        await loadReviews();
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      toast.error("Failed to save review");
      return false;
    }
  };

  useEffect(() => {
    if (productId) {
      loadReviews();
    }
  }, [productId, backendUrl]);

  const reviewCount = reviews.length;
  const averageRating =
    reviewCount === 0
      ? 0
      : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviewCount;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!ratingInput) {
      setReviewError("Please select a rating.");
      return;
    }
    if (!commentInput.trim()) {
      setReviewError("Please write a short review.");
      return;
    }
    if (commentInput.trim().length < 5) {
      setReviewError("Review must be at least 5 characters.");
      return;
    }

    const success = await submitReviewToBackend(ratingInput, commentInput.trim());
    if (success) {
      setRatingInput(0);
      setCommentInput("");
      setReviewError("");
    }
  };

  const handleAddToCart = () => {
    if (!size) {
      setSizeError("Please select a size");
      return;
    }
    addToCart(productData._id, size);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return productData ? (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden bg-gray-100 h-96 sm:h-[500px] lg:h-[600px] flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={image}
                srcSet={getCloudinarySrcSet(image, [400, 700, 1000])}
                sizes="(max-width: 640px) 100vw, 50vw"
                alt={productData.name}
                loading="eager"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {productData.image.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    item === image
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={item}
                    srcSet={getCloudinarySrcSet(item, [200, 400])}
                    sizes="80px"
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {productData.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                {productData.saleApplied &&
                productData.finalPrice &&
                Math.abs(productData.finalPrice - productData.price) > 0.01 ? (
                  <div className="flex items-center gap-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {currency}
                      {Number(productData.finalPrice).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      {currency}
                      {Number(productData.price).toLocaleString("en-US", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span className="bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                      {productData.saleDiscountPercentage ||
                        Math.round(
                          ((productData.price - productData.finalPrice) /
                            productData.price) *
                            100
                        )}
                      % OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    {currency}
                    {Number(productData.price).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                )}
              </div>

              {/* Description */}
              <div className="text-gray-600 text-base leading-relaxed mb-8 pb-8 border-b border-gray-200">
                <p>
                  {productData.description?.split("\n")[0] ||
                    "Premium quality product designed for comfort and style."}
                </p>
              </div>

              {/* Size Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Size
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {productData.sizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSize(sizeOption);
                        setSizeError("");
                      }}
                      className={`py-3 px-4 font-semibold text-sm rounded-lg border-2 transition-all ${
                        sizeOption === size
                          ? "border-black bg-black text-white"
                          : "border-gray-200 text-gray-900 hover:border-gray-300"
                      }`}
                    >
                      {sizeOption}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="text-red-500 text-sm mt-2 font-medium">
                    {sizeError}
                  </p>
                )}
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 rounded-lg font-bold text-lg transition-all transform ${
                  addedToCart
                    ? "bg-green-500 text-white"
                    : "bg-black text-white hover:bg-gray-900 active:scale-95"
                }`}
              >
                {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-gray-200 space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">✓</span>
                <div>
                  <p className="font-semibold text-gray-900">100% Authentic</p>
                  <p className="text-sm text-gray-600">Original product guaranteed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📦</span>
                <div>
                  <p className="font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-600">Ships within 2-3 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">↩️</span>
                <div>
                  <p className="font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-sm text-gray-600">7-day hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs */}
        <div className="flex gap-0 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("description")}
            className={`px-6 py-4 font-semibold text-sm sm:text-base border-b-2 transition-all ${
              activeTab === "description"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`px-6 py-4 font-semibold text-sm sm:text-base border-b-2 transition-all ${
              activeTab === "reviews"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Reviews ({reviewCount})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "description" ? (
          <div className="prose prose-sm max-w-none">
            {productData.description ? (
              productData.description.split(/\n\n|\n/).map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph.trim()}
                  </p>
                )
              ))
            ) : (
              <p className="text-gray-500 italic">
                No description available for this product.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            {/* Write Review */}
            {token ? (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Share Your Review
                </h3>
                <form className="space-y-5" onSubmit={handleSubmitReview}>
                  {/* Rating */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Your Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRatingInput(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <svg
                            className={`w-8 h-8 ${
                              star <= ratingInput
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Your Review
                    </label>
                    <textarea
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition-all resize-none"
                      placeholder="Share your experience with this product..."
                    />
                  </div>

                  {reviewError && (
                    <p className="text-red-500 text-sm font-medium">{reviewError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
                  >
                    Submit Review
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
                <p className="text-gray-700 font-medium mb-4">
                  Log in to share your review and help other customers
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all"
                >
                  Log In to Review
                </button>
              </div>
            )}

            {/* Reviews List */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Customer Reviews
              </h3>
              {loadingReviews ? (
                <div className="text-center py-12 text-gray-600">
                  <p>Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-lg mb-2">No reviews yet</p>
                  <p className="text-sm">Be the first to review this product!</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-lg border border-gray-200 p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (rev.rating || 0)
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(rev.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      <div className="bg-white border-t border-gray-200">
        <RelatedProducts
          category={productData.category}
          subCategory={productData.subCategory}
        />
      </div>
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
