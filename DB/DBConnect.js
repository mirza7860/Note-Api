import mongoose from "mongoose";
const DBConnect = async () => {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("DB CONNECTED"))
    .catch((ERR) => console.log(`ERROR : ${ERR}`));
};

export { DBConnect };
