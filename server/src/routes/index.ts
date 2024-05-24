import express from "express";
import QuizController from "../controllers/index";
import UserController from "../controllers/UserController";
import ajvValidateUser from "../validator/user-validator";
import ajvValidateIdParam from "../validator/id-param";
import ajvValidate from "../validator/quiz-validator";
import validateDto from "../middleware/validate-dto";
import authenticateToken from "../validator/cookie-validate";
import {
  validatePostData,
  validateGetData,
} from "../validator/session-validator";
import logActiveUser from "../middleware/UserActivity";

const router = express.Router();

router.get("/", validateDto(ajvValidate));

router.get("/all", QuizController.getPagination);

router.get("/all/:id", ajvValidateIdParam, QuizController.getById);

router.get("/random", QuizController.getRandomQuestion);

router.get("/quiz", QuizController.getSession);

router.post("/create", validateDto(ajvValidate), QuizController.createQuestion);

router.post("/bulk-create", validatePostData, QuizController.createQuestions);

router.delete("/delete/:id", ajvValidateIdParam, QuizController.deleteById);

router.put("/update/:id", ajvValidateIdParam, QuizController.updateById);

router.post("/register", ajvValidateUser, UserController.createUser);

router.post("/login", ajvValidateUser, UserController.loginUser);

router.post("/logout", UserController.logOutUser);

router.get(
  "/protected",
  logActiveUser,
  authenticateToken,
  UserController.getUsers,
);

router.all("/*", QuizController.none);

//

export default router;
