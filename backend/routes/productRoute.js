import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Error handler wrapper for multer and addProduct
const handleAddProductRequest = (req, res, next) => {
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      console.error("🚨 Multer Error:", err.message);
      return res.status(400).json({ success: false, message: `File upload error: ${err.message}` });
    }
    addProduct(req, res);
  });
};

// with fields , we can parse multipart form data
productRouter.post(
  "/add",
  adminAuth,
  handleAddProductRequest
);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
