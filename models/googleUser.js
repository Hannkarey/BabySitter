import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";

const googleUserSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  clientType: String,
});

googleUserSchema.plugin(passportLocalMongoose);
googleUserSchema.plugin(findOrCreate);

export default mongoose.model("googleUser", googleUserSchema);
