"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ajv_1 = require("ajv");
var ajv_formats_1 = require("ajv-formats");
var ajv = new ajv_1.default({ allErrors: true });
(0, ajv_formats_1.default)(ajv);
var idParamSchema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
    },
    required: ["id"],
    additionalProperties: false,
};
var validateIdParam = ajv.compile(idParamSchema);
function ajvValidateIdParam(req, res, next) {
    var valid = validateIdParam({ id: req.params.id });
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
