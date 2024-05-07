"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = require("ajv");
var ajv = new ajv_1.default({ allErrors: true });
var schema = {
    type: "object",
    properties: {
        question: { type: "string", minLength: 10 },
        answer: { type: "string", minLength: 1 },
    },
    required: ["question", "answer"],
};
var ajvValidate = ajv.compile(schema);
exports.default = ajvValidate;
