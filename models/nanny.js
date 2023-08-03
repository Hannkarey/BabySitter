import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const nannySchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    // required: true,
  },
  googleId: String,
  username: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },

  fullName: String,
  phone: {
    type: String,
    // required: true
  },
  serviceType: {
    type: String,
    // required: true
  },
  city: {
    type: String,
    lowercase: true,
    //required:true
  },
  lat: Number,
  lng: Number,
  pricing: {
    type: Number,
    //required
  },
  image: String,
  certificate: String,
  rating: Number,
  age: {
    type: Number,
    //  required: true
  },
  availability: Boolean,
  shiftStart: Number,
  shiftEnd: Number,
  shiftW: [Number],
});

nannySchema.plugin(passportLocalMongoose);
nannySchema.plugin(findOrCreate);

export default mongoose.model("nanny", nannySchema);
