"use strict";
// import express from "express";
// import dotenv from "dotenv";
// import db from "./config/database.config";
// import QuizInstance from "./model/model";
// import { v4 as uuidv4 } from "uuid";
// import ajvValidate from "./validator/quiz-validator";
// import ajvValidateIdParam from "./validator/id-param";
// import validateDto from "./middleware/validate-dto";
//
// dotenv.config();
//
// db.sync().then(() => {
//   console.log("Database connected");
// });
//
// const PORT = process.env.PORT;
// const app = express();
// app.use(express.json());
//
// app.get("/", validateDto(ajvValidate), (request, response) => {
//   console.log(request.body);
//   return response.send("Hello World");
// });
//
// app.post("/create", validateDto(ajvValidate), async (req, res) => {
//   const id = uuidv4();
//   try {
//     const question = await QuizInstance.create({ ...req.body, id });
//     res.json({ question, msg: "Success" });
//   } catch (e) {
//     res.status(500).json({ msg: "failed", route: "/create" });
//   }
// });
//
// app.put("/update/:id", ajvValidateIdParam, async (req, res) => {
//   try {
//     const id = req.params.id;
//     const question = await QuizInstance.findOne({ where: { id } });
//     if (!question) {
//       return res.status(404).json({ msg: "Question not found" });
//     }
//     const updatedQuestion = await question.update(req.body);
//     res.json({ updatedQuestion, msg: "Success" });
//   } catch (error: string | any) {
//     res
//       .status(500)
//       .json({ msg: "failed", error: error.message, route: "/update" });
//   }
// });
//
// app.get("/all/:id", ajvValidateIdParam, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const question = await QuizInstance.findOne({ where: { id: id } });
//     if (!question) {
//       return res.status(404).json({ msg: "Question not found" });
//     }
//     res.json({ question, msg: "Success" });
//   } catch (e) {
//     res.status(500).json({ msg: "failed", route: "/all:id" });
//   }
// });
//
// app.get("/all", async (req, res) => {
//   try {
//     const page = parseInt(req.query.page as string) || 0;
//     const size = parseInt(req.query.size as string) || 10;
//     const offset = page * size;
//     if (isNaN(page) || isNaN(size)) {
//       return res.status(400).json({
//         msg: "Invalid input, page and size should be numbers",
//         route: "/all",
//       });
//     }
//     const questions = await QuizInstance.findAndCountAll({
//       limit: size,
//       offset: offset,
//     });
//     res.json({
//       currentPage: page,
//       totalPage: Math.ceil(questions.count / size),
//       questions,
//       msg: "Success",
//     });
//   } catch (e) {
//     res.status(500).json({ msg: "failed", route: "/all" });
//   }
// });
//
// app.delete("/delete/:id", ajvValidateIdParam, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const question = await QuizInstance.findOne({ where: { id: id } });
//     if (!question) {
//       return res.status(404).json({ msg: "Question not found" });
//     }
//     await question.destroy();
//     res.json({ msg: "Question deleted." });
//   } catch (e) {
//     res.status(500).json({ msg: "failed", route: "/delete:id" });
//   }
// });
//
// app
//   .listen(PORT, () => {
//     console.log("Server running at PORT: ", PORT);
//   })
//   .on("error", (error) => {
//     // gracefully handle error
//     throw new Error(error.message);
//   });
