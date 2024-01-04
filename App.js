import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouetr from "./Routes/UserRoute.js";
import NoteRouter from "./Routes/NoteRoute.js";
import morgan from "morgan";

// Create an Express App
const app = express();

// Configure middleware for the Express application
app.use(express.json({ limit: "2048kb" }));
app.use(cookieParser());
app.use(cors());
app.use(morgan());
app.use("/",express.static("Public"))

// routes

app.use("/api/v1/user", UserRouetr);
app.use("/api/v1/app", NoteRouter);

// Start Server
export const RunServer = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const port = process.env.PORT || 8000;

      const server = app.listen(port, () => {
        console.log(`Server Running At Port ${port}. http://localhost:${port}`);
        resolve(server);
      });

      server.on("error", (error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
};
