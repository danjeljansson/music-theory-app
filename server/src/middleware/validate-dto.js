"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// You may want to make this generic if you have multiple DTOs.
function validateDto(ajvValidate) {
    return function (req, res, next) {
        var valid = ajvValidate(req.body);
        if (!valid) {
            // Copy the errors to a constant to ensure they are not overwritten
            // by subsequent AJV validations in case of asynchronous operations.
            var errors = ajvValidate.errors;
            // Only respond with errors if there are any, otherwise call next()
            if (errors) {
                res.status(400).json(errors);
                return; // Important to return here to avoid calling next() after sending a response
            }
        }
        next();
    };
}
exports.default = validateDto;
