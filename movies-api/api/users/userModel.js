import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const Schema = mongoose.Schema;

const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true},
  password: { 
    type: String, 
    required: true,
    validate: {
      validator: (value) => passwordValidator.test(value),
      message: 'Password must be at least 8 characters long, and include at least one letter, one number, and one special character.'
    }
  },
  favorites: { 
    type: [Number],
    default: [] 
  },
  mustWatch: {
    type: [Number], 
    default: [] 
  },
});

UserSchema.methods.comparePassword = async function (passw) { 
  return await bcrypt.compare(passw, this.password); 
}

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({ username: username });
};

UserSchema.statics.addFavorite = function(username, movieId) {
  return this.findOneAndUpdate(
    { username: username },
    { $addToSet: { favorites: movieId } },
    { new: true }
  );
};

UserSchema.statics.removeFavorite = function(username, movieId) {
  return this.findOneAndUpdate(
    { username: username },
    { $pull: { favorites: movieId } },
    { new: true }
  );
};

UserSchema.statics.getFavorites = async function (username) {
  const user = await this.findOne({ username: username.toLowerCase() }).select('favorites');
  return user ? user.favorites || [] : [];
};

UserSchema.statics.addMustWatch = function (username, movieId) {
  return this.findOneAndUpdate(
    { username: username },
    { $addToSet: { mustWatch: movieId } },
    { new: true }
  );
};

UserSchema.statics.removeMustWatch = function (username, movieId) {
  return this.findOneAndUpdate(
    { username: username },
    { $pull: { mustWatch: movieId } },
    { new: true }
  );
};

UserSchema.statics.getMustWatch = async function (username) {
  const user = await this.findOne({ username }).select('mustWatch');
  return user ? user.mustWatch || [] : [];
};

UserSchema.pre('save', async function(next) {
  const saltRounds = 10; // You can adjust the number of salt rounds
  //const user = this;
  if (this.isModified('password') || this.isNew) {
    try {
      const hash = await bcrypt.hash(this.password, saltRounds);
      this.password = hash;
      next();
  } catch (error) {
     next(error);
  }

  } else {
      next();
  }
});


export default mongoose.model('User', UserSchema);