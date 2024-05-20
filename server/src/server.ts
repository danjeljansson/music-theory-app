import db from "./config/database.config";
import app from "./app";
import dotenv from "dotenv";
import { QuestionInstance, AnswerInstance } from "./model/Association";
dotenv.config();

db.sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database connection failed", error);
  });

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
