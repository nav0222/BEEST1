const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/', reviewController.addReviewToProduct);
router.get('/', reviewController.getReviewsForProduct);
router.put('/:reviewId', reviewController.updateReviewByIdInProduct);
router.delete('/:reviewId', reviewController.deleteReviewByIdInProduct);

module.exports = router;
