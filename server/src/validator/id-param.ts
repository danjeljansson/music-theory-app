import Ajv, { JSONSchemaType } from "ajv";
import addFormats from "ajv-formats";
import { Request, Response, NextFunction } from "express";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

interface IdParam {
  id: string;
}
const idParamSchema: JSONSchemaType<IdParam> = {
  type: "object",
  properties: {
    id: { type: "string", format: "uuid" },
  },
  required: ["id"],
  additionalProperties: false,
};

const validateIdParam = ajv.compile(idParamSchema);

function ajvValidateIdParam(req: Request, res: Response, next: NextFunction) {
  const valid = validateIdParam({ id: req.params.id });
  if (!valid) {
    res
      .status(400)
      .json({ errors: idParamSchema.errors, msg: "Correct UUID required." });
  } else {
    next();
  }
}

export default ajvValidateIdParam;
