import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { QuestionInstance, AnswerInstance } from "../model/Association";
import { Sequelize } from "sequelize";

interface Answer {
  answerOption: string;
  isCorrect: boolean;
}

class QuizController {
  async createQuestion(req: Request, res: Response) {
    const { question: questionText, answer: answerText } = req.body;

    try {
      console.log("Incoming answer:", answerText);

      const question = await QuestionInstance.create({
        id: uuidv4(),
        question: questionText,
      });

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
    } catch (e) {
      console.error("Error creating question:", e);
      res.status(500).json({ msg: "failed", route: "/create", error: e });
    }
  }

  async createQuestions(req: Request, res: Response) {
    const { questions } = req.body;

    if (!Array.isArray(questions)) {
      return res
        .status(400)
        .json({ msg: "Questions must be provided as an array" });
    }

    try {
      const createdQuestions = await Promise.all(
        questions.map(async (questionData: any) => {
          const { question: questionText, answer: answerText } = questionData;

          const question = await QuestionInstance.create({
            id: uuidv4(),
            question: questionText,
          });

          if (Array.isArray(answerText)) {
            const createdAnswers = await Promise.all(
              answerText.map(async (answer: any) => {
                return await AnswerInstance.create({
                  id: uuidv4(),
                  questionId: question.id,
                  answerOption: answer.answerOption,
                  isCorrect: answer.isCorrect,
                });
              }),
            );

            return { question, answers: createdAnswers };
          } else {
            throw new Error("Answers must be provided as an array");
          }
        }),
      );

      res.json({ createdQuestions, msg: "Success" });
    } catch (e) {
      console.error("Error creating questions:", e);
      res.status(500).json({
        msg: "Failed to create questions",
        route: "/bulk-create",
        error: e,
      });
    }
  }

  async getRandomQuestion(req: Request, res: Response) {
    try {
      const totalQuestions = await QuestionInstance.count();
      const randomIndex = Math.floor(Math.random() * totalQuestions);

      const randomQuestion = await QuestionInstance.findOne({
        offset: randomIndex,
        attributes: ["id", "question"],
        include: [{ model: AnswerInstance, as: "answers" }],
      });

      if (!randomQuestion) {
        return res.status(404).json({ msg: "No questions found" });
      }

      res.json({ question: randomQuestion, msg: "Success" });
    } catch (error) {
      console.error("Error fetching random question:", error);
      res.status(500).json({ msg: "Failed to fetch random question" });
    }
  }

  async getSession(req: Request, res: Response) {
    try {
      const quizSession = await QuestionInstance.findAll({
        include: [
          {
            model: AnswerInstance,
            as: "answers",
          },
        ],
        order: Sequelize.literal("RANDOM()"),
        limit: 10,
      });

      if (!quizSession) {
        return res.status(404).json({ msg: "No questions found" });
      }
      res.status(200).json(quizSession);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ msg: "Failed to fetch questions", error });
    }
  }

  async getPagination(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 0;
      const size = parseInt(req.query.size as string) || 5;
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
