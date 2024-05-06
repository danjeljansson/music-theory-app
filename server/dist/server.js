"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_config_1 = __importDefault(require("./config/database.config"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
database_config_1.default.sync().then(() => {
    console.log("Database connected");
});
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log("server is running on port " + PORT);
});
