import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  biography: { type: String },
  birthday: { type: String },
  deathday: { type: String },
  place_of_birth: { type: String },
  profile_path: { type: String },
  popularity: { type: Number },
  known_for_department: { type: String },
  gender: { type: Number },
  movie_credits: [{
    movieId: { type: Number },
    character: { type: String },
    title: { type: String },
    release_date: { type: String },
    poster_path: { type: String }
  }]
});

ActorSchema.statics.findByTMDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actor', ActorSchema);