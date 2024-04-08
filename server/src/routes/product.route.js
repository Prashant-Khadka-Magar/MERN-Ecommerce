import express from "express";
import {
  createProduct,
  createProductReview,
  deleteProduct,
  fetauredProducts,
  getAllProducts,
  getRelatedProducts,
  getSearchSuggestions,
  getSingleProduct,
  reviewReply,
  updateProduct,
} from "../controllers/product.controller.js";
import { admin, protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured-products", fetauredProducts);
router.get("/search-suggestions", getSearchSuggestions);
router.get("/:id", getSingleProduct);
router.get("/related-products/:id", getRelatedProducts);
router.post("/create-product", protect, admin, createProduct);
router.delete("/delete-product", protect, admin, deleteProduct);
router.post(
  "/update-product/:id",
  protect,
  admin,
  upload.fields([{ name: "images", maxCount: 3 }]),
  updateProduct
);
router.post("/create-review/:id", protect, createProductReview);
router.post("/review-reply/:id", protect, admin, reviewReply);

export default router;
