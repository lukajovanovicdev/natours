const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllReviews = catchAsync(
  async (req, res, next) => {
    let filter = {};
    if (req.params.tourId)
      filter = { tour: req.params.tourId }; // if there is tourId after tours then show just reviews for that tour tours/5c88fa8cf4afda39709c2961/reviews

    const reviews = await Review.find(filter);

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: {
        reviews,
      },
    });
  }
);

exports.createReview = catchAsync(
  async (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    const newReview = await Review.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        review: newReview,
      },
    });
  }
);
