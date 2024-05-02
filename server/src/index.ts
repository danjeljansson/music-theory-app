import express from "express";
import dotenv from "dotenv";
import db from "./config/database.config";
import QuizInstance from "./model/model";
import { v4 as uuidv4 } from "uuid";
import ajvValidate from "./validator/quiz-validator";
import validateDto from "./middleware/validate-dto";

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

app.get("/all", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 0;
    const size = parseInt(req.query.size as string) || 10;
    const offset = page * size;
    if (isNaN(page) || isNaN(size)) {
      return res.status(400).json({
        msg: "Invalid input, page and size should be numbers",
        route: "/all",
      });
    }
    const questions = await QuizInstance.findAndCountAll({
      limit: size,
      offset: offset,
    });
    res.json({
      currentPage: page,
      totalPage: Math.ceil(questions.count / size),
      questions,
      msg: "Success",
    });
  } catch (e) {
    res.status(500).json({ msg: "failed", route: "/all" });
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
