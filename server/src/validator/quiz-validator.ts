import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv({ allErrors: true });

interface Answer {
  answerOption: string;
  isCorrect: boolean;
}

interface ValidateQuestion {
  question: string;
  answer: Answer[];
}

const schema: JSONSchemaType<ValidateQuestion> = {
  type: "object",
  properties: {
    question: { type: "string", minLength: 10 },
    answer: {
      type: "array",
      items: {
        type: "object",
        properties: {
          answerOption: { type: "string" },
          isCorrect: { type: "boolean" },
        },
        required: ["answerOption", "isCorrect"],
      },
      minItems: 1,
    },
  },
  required: ["question", "answer"],
};

const ajvValidate = ajv.compile(schema);

export default ajvValidate;
