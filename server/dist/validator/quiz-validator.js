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
        question: { type: "string", minLength: 10 },
        answer: { type: "string", minLength: 1 },
    },
    required: ["question", "answer"],
};
const ajvValidate = ajv.compile(schema);
const data = {
    question: "",
    answer: "",
};
if (ajvValidate(data)) {
    console.log();
}
else {
    console.log(ajvValidate.errors);
}
exports.default = ajvValidate;
