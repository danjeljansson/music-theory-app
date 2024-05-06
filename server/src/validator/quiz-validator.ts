import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv({ allErrors: true });

interface ValidateQuestion {
  question: string;
  answer: string;
}

const schema: JSONSchemaType<ValidateQuestion> = {
  type: "object",
  properties: {
    question: { type: "string", minLength: 10 },
    answer: { type: "string", minLength: 1 },
  },
  required: ["question", "answer"],
};

const ajvValidate = ajv.compile(schema);

export default ajvValidate;
