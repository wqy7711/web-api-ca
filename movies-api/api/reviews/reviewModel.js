import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movieId: { type: Number, required: true },
  author: { type: String, required: true }, 
  content: { type: String, required: true },
  rating: { 
    type: Number, 
    required: true,
    min: 0,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be an integer between 0 and 5'
    }
  },
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ReviewSchema.statics.findByMovieId = function(id) {
  return this.find({ movieId: id }).sort('-createdAt');
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