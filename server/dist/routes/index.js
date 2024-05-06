"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../controllers/index"));
const id_param_1 = __importDefault(require("../validator/id-param"));
const quiz_validator_1 = __importDefault(require("../validator/quiz-validator"));
const validate_dto_1 = __importDefault(require("../middleware/validate-dto"));
const router = express_1.default.Router();
router.get("/", (0, validate_dto_1.default)(quiz_validator_1.default));
router.get("/all", index_1.default.getPagination);
router.get("all/:id", id_param_1.default, index_1.default.getById);
router.post("/create", (0, validate_dto_1.default)(quiz_validator_1.default), index_1.default.createQuestion);
router.delete("/delete/:id", id_param_1.default, index_1.default.deleteById);
router.put("/update/:id", id_param_1.default, index_1.default.updateById);
exports.default = router;
