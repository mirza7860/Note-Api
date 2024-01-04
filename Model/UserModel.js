import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserModel = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
      required: true,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserModel.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});
UserModel.methods.isPasswordCorrect = async function (password) {
  if (this.password) {
    return await bcrypt.compare(password, this.password);
  }
};
const User = mongoose.model("User", UserModel);
export default User ;
