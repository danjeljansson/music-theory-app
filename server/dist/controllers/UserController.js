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
const bcrypt_1 = __importDefault(require("bcrypt"));
const model_1 = __importDefault(require("../model/model"));
class UserController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = (0, uuid_1.v4)();
            const { username, password } = req.body;
            const hashedPassword = bcrypt_1.default.hashSync(password, 10);
            try {
                const newUser = yield model_1.default.create(Object.assign(Object.assign({}, req.body), { id,
                    username,
                    hashedPassword }));
                res.status(200).json({ newUser, msg: "User created!" });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "failed", route: "/register", error: error });
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    msg: "User logged in!",
                    code: 200,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "failed", route: "/login" });
            }
        });
    }
    userLogout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    msg: "User logged out!",
                    code: 200,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ msg: "failed", route: "/logout" });
            }
        });
    }
}
exports.default = new UserController();
