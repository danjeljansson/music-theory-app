"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var database_config_1 = require("./config/database.config");
var app_1 = require("./app");
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
database_config_1.default.sync().then(function () {
    console.log("Database connected");
});
var PORT = process.env.PORT;
app_1.default.listen(PORT, function () {
    console.log("server is running on port " + PORT);
});
