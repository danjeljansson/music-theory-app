import express from "express";
import dotenv from "dotenv";
import db from "./config/database.config";
import QuizInstance from "./model/model";
import { v4 as uuidv4 } from "uuid";
import ajvValidate from "./validator/quiz-validator";
import validateDto from "./middleware/validate-dto";
import next from "ajv/dist/vocabularies/next";

dotenv.config();

db.sync().then(() => {
  console.log("Database connected");
});

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.body);
  return response.send("Hello World");
});

app.post("/create", validateDto(ajvValidate), async (req, res) => {
  const id = uuidv4();
  try {
    const question = await QuizInstance.create({ ...req.body, id });
    res.json({ question, msg: "Success" });
  } catch (e) {
    res.status(500).json({ msg: "failed", route: "/create" });
  }
});

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
  });
