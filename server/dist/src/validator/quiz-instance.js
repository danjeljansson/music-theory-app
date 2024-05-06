"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const ajvInstance = new ajv_1.default({ formats: { uuid: true, allErrors: true } });
(0, ajv_formats_1.default)(ajvInstance);
exports.default = ajvInstance;
