import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import QuizInstance from "../model/model";

class QuizController {
  async createQuestion(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const question = await QuizInstance.create({ ...req.body, id });
      res.json({ question, msg: "Success" });
    } catch (e) {
      res.status(500).json({ msg: "failed", route: "/create" });
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
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const question = await QuizInstance.findOne({ where: { id: id } });
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
      const question = await QuizInstance.findOne({ where: { id } });
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
      const question = await QuizInstance.findOne({ where: { id } });
      if (!question) {
        return res.status(404).json({ msg: "Question not found" });
      }
      await question.destroy();
      res.json({ msg: "Success" });
    } catch (e) {
      res.status(500).json({ msg: "failed", route: "/delete" });
    }
  }
}

export default new QuizController();
