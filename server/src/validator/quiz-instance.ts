import Ajv from "ajv";
import addFormats from "ajv-formats";

const ajvInstance: Ajv = new Ajv({ allErrors: true });

addFormats(ajvInstance);

export default ajvInstance;
