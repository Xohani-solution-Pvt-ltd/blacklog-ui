import { models, model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: { type: Date, default: new Date() },
});

const UserModel = models.User || model("User", UserSchema);

export default UserModel;
