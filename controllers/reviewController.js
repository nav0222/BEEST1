const Product = require('../models/product');
const Review = require('../models/review');

// Add a new review to a product
const addReviewToProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await Review.create(req.body);
    product.reviews.push(review._id);
    await product.save();

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all reviews for a specific product with pagination
const getReviewsForProduct = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const product = await Product.findById(req.params.productId).populate({
      path: 'reviews',
      options: { skip: (page - 1) * limit, limit: limit },
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product.reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a review by ID within a product
const updateReviewByIdInProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a review by ID within a product
const deleteReviewByIdInProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    product.reviews = product.reviews.filter(
      (id) => id.toString() !== req.params.reviewId
    );
    await product.save();

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addReviewToProduct,
  getReviewsForProduct,
  updateReviewByIdInProduct,
  deleteReviewByIdInProduct,
};
