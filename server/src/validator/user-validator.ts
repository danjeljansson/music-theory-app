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
    username: { type: "string", minLength: 4 },
    password: { type: "string", minLength: 4 },
  },
  required: ["username", "password"],
};

const ValidateUser = ajv.compile(schema);

function ajvValidateUser(req: Request, res: Response, next: NextFunction) {
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
  } else {
    next();
  }
}

export default ajvValidateUser;
