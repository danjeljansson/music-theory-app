"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv = new ajv_1.default();
const schema = {
    type: "object",
    properties: {
        question: { type: "string" },
        answer: { type: "string" },
    },
    required: ["question", "answer"],
};
const validate = ajv.compile(schema);
const data = {
    question: "",
    answer: "",
};
if (validate(data)) {
    console.log();
}
else {
    console.log(validate.errors);
}
exports.default = validate;
