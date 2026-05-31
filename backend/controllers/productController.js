import { v2 as Cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding a product
const addProduct = async (req, res) => {
  try {
    console.log("🔵 [ADD PRODUCT] Request received");
    console.log("📋 Request body:", JSON.stringify(req.body, null, 2));
    console.log("📁 Files:", req.files ? Object.keys(req.files) : "No files");

    // Extract form data from req.body
    const {
      name,
      description,
      category,
      price,
      subCategory,
      sizes,
    } = req.body;

    console.log("✅ Extracted fields:", { name, description, category, price, subCategory, sizes });

    // Validate required fields
    if (!name || !description || !category || !price || !sizes) {
      console.log("❌ Validation failed - Missing fields:", { name: !!name, description: !!description, category: !!category, price: !!price, sizes: !!sizes });
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Access the uploaded files, check if they exist before accessing the first element
    const image1 = req.files["image1"] ? req.files["image1"][0] : null;
    const image2 = req.files["image2"] ? req.files["image2"][0] : null;
    const image3 = req.files["image3"] ? req.files["image3"][0] : null;
    const image4 = req.files["image4"] ? req.files["image4"][0] : null;

    console.log("🖼️  Images found:", { image1: !!image1, image2: !!image2, image3: !!image3, image4: !!image4 });

    // Filter out images that were not uploaded (null values)
    const uploadedImages = { image1, image2, image3, image4 };
    const validImages = {};

    // Only include non-null images in the response
    Object.keys(uploadedImages).forEach((key) => {
      if (uploadedImages[key]) {
        validImages[key] = uploadedImages[key];
      }
    });

    console.log("✅ Valid images count:", Object.keys(validImages).length);

    // Check if at least one image is uploaded
    if (Object.keys(validImages).length === 0) {
      console.log("❌ No images uploaded");
      return res.status(400).json({ message: "No files were uploaded" });
    }

    // Upload images to Cloudinary with optimization:
    // - fetch_format auto → WebP for supported browsers (25-35% smaller)
    // - quality auto:good → Cloudinary picks best quality (40-60% smaller)
    // - width 800 + crop limit → max 800px wide, never enlarges small images
    console.log("☁️  Starting Cloudinary upload...");
    let imagesUrl = await Promise.all(
      Object.values(validImages).map(async (image) => {
        try {
          console.log("📤 Uploading image:", image.filename || image.originalname);
          let result = await Cloudinary.uploader.upload(image.path, {
            resource_type: "image",
            folder: "products",
            transformation: [
              {
                width: 800,
                crop: "limit",
                quality: "auto:good",
                fetch_format: "auto",
              },
            ],
          });
          console.log("✅ Image uploaded:", result.secure_url);
          return result.secure_url;
        } catch (uploadError) {
          console.log("❌ Cloudinary upload failed:", uploadError.message);
          throw uploadError;
        }
      })
    );

    console.log("✅ All images uploaded:", imagesUrl);

    // Build the product data to save
    let parsedSizes;
    try {
      parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
      console.log("✅ Sizes parsed:", parsedSizes);
    } catch (sizeError) {
      console.log("❌ Size parsing error:", sizeError.message);
      return res.status(400).json({ success: false, message: "Invalid sizes format. Must be valid JSON array." });
    }

    const productsData = {
      name,
      description,
      category,
      price: Number(price), // Ensure price is a number
      subCategory: subCategory || "", // Handle optional subCategory
      sizes: parsedSizes,
      image: imagesUrl, // Store the array of image URLs
      date: Date.now(),
    };

    console.log("💾 Product data to save:", JSON.stringify(productsData, null, 2));

    const product = new productModel(productsData);
    console.log("📝 Product created (before save)");

    await product.save();
    console.log("✅ Product saved to database:", product._id);

    // Respond with success
    res.status(200).json({
      message: "Product added successfully",
      product, // Return the saved product info including images
    });
  } catch (error) {
    console.log("💥 ERROR:", error.message);
    console.log("Stack:", error.stack);
    res.status(500).json({ message: "Error adding product", error: error.message });
  }
};

const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({ isDeleted: false });
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.body.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Soft delete: mark as deleted instead of removing from database
    product.isDeleted = true;
    await product.save();

    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (!product || product.isDeleted) {
      return res.json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
