import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import passport from "passport";

const parentSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  googleId: String,
  password: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    //unique: true,
    // required: true,
  },
  fullName: String,
  phone: String,
  age: Number,

  city: { type: String, lowercase: true },
  lat: Number,
  lng: Number,
  rating: Number,
  priceMin: Number,
  priceMax: Number,
  NannyPrice: Number,
});
parentSchema.plugin(
  passportLocalMongoose
  //{ usernameField: "email" }
);
parentSchema.plugin(findOrCreate);
export default mongoose.model("parent", parentSchema);
