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
const uuid_1 = require("uuid");
const model_1 = __importDefault(require("../model/model"));
class QuizController {
    createQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            try {
                const question = yield model_1.default.create(Object.assign(Object.assign({}, req.body), { id }));
                res.json({ question, msg: "Success" });
            }
            catch (e) {
                res.status(500).json({ msg: "failed", route: "/create" });
            }
        });
    }
    getPagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 0;
                const size = parseInt(req.query.size) || 10;
                const offset = page * size;
                if (isNaN(page) || isNaN(size)) {
                    return res.status(400).json({
                        msg: "Invalid input, page and size should be numbers",
                        route: "/all",
                    });
                }
                const questions = yield model_1.default.findAndCountAll({
                    limit: size,
                    offset: offset,
                });
                res.json({
                    currentPage: page,
                    totalPage: Math.ceil(questions.count / size),
                    questions,
                    msg: "Success",
                });
            }
            catch (e) {
                res.status(500).json({ msg: "failed", route: "/all" });
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const question = yield model_1.default.findOne({ where: { id: id } });
                if (!question) {
                    return res.status(404).json({ msg: "Question not found" });
                }
                res.json({ question, msg: "Success" });
            }
            catch (e) {
                res.status(500).json({ msg: "failed", route: "/all:id" });
            }
        });
    }
    updateById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const question = yield model_1.default.findOne({ where: { id } });
                if (!question) {
                    return res.status(404).json({ msg: "Question not found" });
                }
                const updatedQuestion = yield question.update(req.body);
                res.json({ updatedQuestion, msg: "Success" });
            }
            catch (error) {
                res
                    .status(500)
                    .json({ msg: "failed", error: error.message, route: "/update" });
            }
        });
    }
    deleteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const question = yield model_1.default.findOne({ where: { id } });
                if (!question) {
                    return res.status(404).json({ msg: "Question not found" });
                }
                yield question.destroy();
                res.json({ msg: "Success" });
            }
            catch (e) {
                res.status(500).json({ msg: "failed", route: "/delete" });
            }
        });
    }
    none(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(404).json({ msg: "Route not found" });
            }
            catch (e) {
                res.status(500).json({ msg: "failed", route: "/*" });
            }
        });
    }
}
exports.default = new QuizController();
