import mongoose, { Schema, models } from 'mongoose';

const gamesSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    games: {
      type: {
        owned: [gamesSchema],
        wishlist: [gamesSchema],
      },
      default: {
        owned: [],
        wishlist: [],
      },
    },
  },
  { timestamps: true }
);

const User = models.User || mongoose.model('User', userSchema);
export default User;
