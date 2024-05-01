import { Request, Response, NextFunction } from "express";
import { ValidateFunction } from "ajv";

// Define a more specific type if you know the structure of your DTOs.
interface DTO {
  [key: string]: any;
}

// You may want to make this generic if you have multiple DTOs.
function validateDto(ajvValidate: ValidateFunction<DTO>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajvValidate(req.body);
    if (!valid) {
      // Copy the errors to a constant to ensure they are not overwritten
      // by subsequent AJV validations in case of asynchronous operations.
      const errors = ajvValidate.errors;
      // Only respond with errors if there are any, otherwise call next()
      if (errors) {
        res.status(400).json(errors);
        return; // Important to return here to avoid calling next() after sending a response
      }
    }
    next();
  };
}

export default validateDto;
