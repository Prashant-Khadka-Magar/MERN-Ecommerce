import asyncHandler from "express-async-handler";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import uploadOnCloudinary, {
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { request } from "express";

// to get all the products
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.send(products);
});

//get fetaured products
const fetauredProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true });
    if (!products) {
      throw new ApiError(401, "PRODUCTS NOT FOUND");
    }
    res.status(200).json(products);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//Search SUggestion || Auto Complete
const getSearchSuggestions = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: "i" } }
      : {};
    const suggestions = await Product.find({ ...keyword }).limit(5);

    res.status(200).json(suggestions);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//get a single product
const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(401, "PRODUCT NOT FOUND");
    }

    res.status(200).json(product);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//get related products
const getRelatedProducts = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id);

    if (!product) {
      throw new ApiError(401, "PRODUCT NOT FOUND");
    }

    const related = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    }).limit(4);

    res.status(200).json(related);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//create a product -- admin only
const createProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.create({
      name: "Sample Name",
      price: 0,
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample Description",
      images: [
        {
          imageUrl: "/images/sample.jpg",
          publicId: "ADDF546SDF",
        },
      ],
      isFeatured: false,
    });

    res.status(201).json(product);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//update a product -- admin only
const updateProduct = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      brand,
      category,
      countInStock,
      isFeatured,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "PRODUCT NOT FOUND" });
    }

    let updatedImages = [];
    const imagePaths = req.files?.images;

    if (imagePaths) {
      for (const imagePath of imagePaths) {
        try {
          const uploadedImage = await uploadOnCloudinary(imagePath.path);
          updatedImages.push({
            imageUrl: uploadedImage.url,
            publicId: uploadedImage.public_id,
          });
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError);
          return res
            .status(500)
            .json({ error: "ERROR UPLOADING IMAGE TO CLOUDINARY" });
        }
      }
    }

    product.name = name;
    product.price = price;
    product.description = description;
    product.images = updatedImages;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.isFeatured = Boolean(isFeatured);

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

//Delete A PRODUCT along with cloudinary image -ADMIN ONLY
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.body.productId);

  if (product) {
    for (const image of product.images) {
      await deleteFromCloudinary(image.publicId);
    }
    await Product.deleteOne({ _id: product._id });

    res.status(200).json({ message: "PRODUCT DELETED" });
  } else {
    res.status(404);
    throw new ApiError(404, "RESOURCE NOT FOUND");
  }
});

//Create a new review for a product
const createProductReview = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    const { rating, comment } = req.body;

    if (!product) {
      throw new ApiError(401, "Product Not Found");
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      throw new ApiError(401, "Product already reviewed");
    }

    if (req.user.isAdmin) {
      throw new ApiError(401, "Admin Can't review");
    }

    const review = {
      name: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
      avatar: req.user.avatar,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(200).json("Product reviewed successfully");
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

// REPLY TO REVIEWS
const reviewReply = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const { adminReply, reviewId } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(401, "Product not found");
    }

    const review = product.reviews.find((r) => r._id.toString() === reviewId);

    if (!review) {
      throw new ApiError(401, "Review not found");
    }
    if (review.reply) {
      throw new ApiError(401, "Cannot reply twice");
    }

    review.reply = adminReply;

    await product.save();

    res.status(200).json("Replied Successfully");
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

export {
  getAllProducts,
  fetauredProducts,
  getSearchSuggestions,
  getRelatedProducts,
  getSingleProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  reviewReply,
};
