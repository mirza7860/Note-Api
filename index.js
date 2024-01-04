//Run with `node index.js`
//"/" => Documentation 
//Hosted on digitalocean App Platform
import dotenv from "dotenv";
import { DBConnect } from "./DB/DBConnect.js";
import { RunServer } from "./App.js";

dotenv.config();

const NoteApi = async () => {
  try {
    await DBConnect();
    await RunServer();
    console.log(`NoteApi Is Running and Ready To Use.`);
  } catch (error) {
    console.log(error);
  }
};

NoteApi();
  