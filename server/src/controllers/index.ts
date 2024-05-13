import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import QuestionInstance from "../model/QuestionModel";
import AnswerInstance from "../model/AnswerModel";

interface Answer {
  answerOption: string;
  isCorrect: boolean;
}

class QuizController {
  async createQuestion(req: Request, res: Response) {
    const { question: questionText, answer: answerText } = req.body;

    try {
      console.log("Incoming answer:", answerText);

      // Create the question
      const question = await QuestionInstance.create({
        id: uuidv4(),
        question: questionText,
      });

      // Ensure 'answerText' is an array
      if (Array.isArray(answerText)) {
        const createdAnswers = await Promise.all(
          answerText.map(async (answer: Answer) => {
            return await AnswerInstance.create({
              id: uuidv4(),
              questionId: question.id,
              answerOption: answer.answerOption,
              isCorrect: answer.isCorrect,
            });
          }),
        );
        res.json({ question, answers: createdAnswers, msg: "Success" });
      } else {
        throw new Error("Answers must be provided as an array");
      }

      // Parse each answer option and create AnswerInstances
    } catch (e) {
      console.error("Error creating question:", e);
      res.status(500).json({ msg: "failed", route: "/create", error: e });
    }
  }

  async getPagination(req: Request, res: Response) {
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
      const questions = await QuestionInstance.findAndCountAll({
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
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await QuestionInstance.findOne({ where: { id: id } });
      if (!question) {
        return res.status(404).json({ msg: "Question not found" });
      }
      res.json({ question, msg: "Success" });
    } catch (e) {
      res.status(500).json({ msg: "failed", route: "/all:id" });
    }
  }

  async updateById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const question = await QuestionInstance.findOne({ where: { id } });
      if (!question) {
        return res.status(404).json({ msg: "Question not found" });
      }
      const updatedQuestion = await question.update(req.body);
      res.json({ updatedQuestion, msg: "Success" });
    } catch (error: string | any) {
      res
        .status(500)
        .json({ msg: "failed", error: error.message, route: "/update" });
    }
  }
  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await QuestionInstance.findOne({ where: { id } });
      if (!question) {
        return res.status(404).json({ msg: "Question not found" });
      }
      await question.destroy();
      res.json({ msg: "Success" });
    } catch (e) {
      res.status(500).json({ msg: "failed", route: "/delete" });
    }
  }
  async none(req: Request, res: Response) {
    try {
      res.status(404).json({ msg: "Route not found" });
    } catch (e) {
      res.status(500).json({ msg: "failed", route: "/*  " });
    }
  }
}

export default new QuizController();
