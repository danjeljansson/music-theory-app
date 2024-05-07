"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default({ allErrors: true });
const schema = {
    type: "object",
    properties: {
        username: { type: "string", minLength: 4 },
        password: { type: "string", minLength: 4 },
    },
    required: ["username", "password"],
};
const ValidateUser = ajv.compile(schema);
function ajvValidateUser(req, res, next) {
    const valid = ValidateUser({
        username: req.body.username,
        password: req.body.password,
    });
    if (!valid) {
        res
            .status(400)
            .json({
            errors: schema.errors,
            msg: "Correct username and password required.",
        });
    }
    else {
        next();
    }
}
exports.default = ajvValidateUser;
