"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_config_1 = __importDefault(require("./config/database.config"));
const model_1 = __importDefault(require("./model/model"));
const uuid_1 = require("uuid");
const quiz_validator_1 = __importDefault(require("./validator/quiz-validator"));
const validate_dto_1 = __importDefault(require("./middleware/validate-dto"));
dotenv_1.default.config();
database_config_1.default.sync().then(() => {
    console.log("Database connected");
});
const PORT = process.env.PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (request, response) => {
    console.log(request.body);
    return response.send("Hello World");
});
app.post("/create", (0, validate_dto_1.default)(quiz_validator_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = (0, uuid_1.v4)();
    try {
        const question = yield model_1.default.create(Object.assign(Object.assign({}, req.body), { id }));
        res.json({ question, msg: "Success" });
    }
    catch (e) {
        res.status(500).json({ msg: "failed", route: "/create" });
    }
}));
app
    .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
})
    .on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
