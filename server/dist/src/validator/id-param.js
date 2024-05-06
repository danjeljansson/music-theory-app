"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
const idParamSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
    },
    required: ["id"],
    additionalProperties: false,
};
const validateIdParam = ajv.compile(idParamSchema);
function ajvValidateIdParam(req, res, next) {
    const valid = validateIdParam({ id: req.params.id });
    if (!valid) {
        res
            .status(400)
            .json({ errors: idParamSchema.errors, msg: "Correct UUID required." });
    }
    else {
        next();
    }
}
exports.default = ajvValidateIdParam;
