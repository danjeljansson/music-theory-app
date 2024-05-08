import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv({ allErrors: true });
import { Request, Response, NextFunction } from "express";

interface ValidateUser {
  username: string;
  password: string;
}

const schema: JSONSchemaType<ValidateUser> = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 4, maxLength: 50 },
    password: { type: "string", minLength: 4, maxLength: 50 },
  },
  required: ["username", "password"],
};

const validateUser = ajv.compile(schema);

function ajvValidateUser(req: Request, res: Response, next: NextFunction) {
  const valid = validateUser(req.body);
  console.log(req.body);
  if (!valid) {
    res.status(400).json({
      errors: validateUser.errors,
      msg: "Correct username and password required.",
    });
  } else {
    next();
  }
}

export default ajvValidateUser;
