import mongoose from 'mongoose';
import reviewModel from './reviewModel';


const ReviewSchema = new mongoose.Schema({
  movieId: { type: String, required: true },
  userId: { type: String, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});


ReviewSchema.statics.findByMovieId = function (id) {
  return this.findOne({ movieId: id }).sort('-createdAt');
};

ReviewSchema.statics.findByUserId = function(userId) {
  return this.find({ userId: userId }).sort('-createdAt');
};

ReviewSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = Date.now();
  }
  next();
});

export default mongoose.model('Review', ReviewSchema);