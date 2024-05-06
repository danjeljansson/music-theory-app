import express from "express";
import QuizController from "../controllers/index";
import ajvValidateIdParam from "../validator/id-param";
import ajvValidate from "../validator/quiz-validator";
import validateDto from "../middleware/validate-dto";

const router = express.Router();

router.get("/", validateDto(ajvValidate));

router.get("/all", QuizController.getPagination);

router.get("all/:id", ajvValidateIdParam, QuizController.getById);

router.post("/create", validateDto(ajvValidate), QuizController.createQuestion);

router.delete("/delete/:id", ajvValidateIdParam, QuizController.deleteById);

router.put("/update/:id", ajvValidateIdParam, QuizController.updateById);

export default router;
