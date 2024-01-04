//Run with `node index.js`

//Test With Postman 
//- Test All Routes . Here -  https://www.postman.com/mirzasahil/workspace/note-crud-auth-api/overview

//- Publish Postman Documentation Link - https://documenter.getpostman.com/view/32121402/2s9YsFFaLp

//Hosted on digitalocean App Platform - LInk - https://walrus-app-ymnbm.ondigitalocean.app
 
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
  