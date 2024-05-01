"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var dotenv_1 = require("dotenv");
var database_config_1 = require("./config/database.config");
dotenv_1.default.config();
database_config_1.default.sync().then(function () {
    console.log("Database connected");
});
var PORT = process.env.PORT;
var app = (0, express_1.default)();
app.get("/", function (response) {
    return response.send("Hello World");
});
app
    .listen(PORT, function () {
    console.log("Server running at PORT: ", PORT);
})
    .on("error", function (error) {
    // gracefully handle error
    throw new Error(error.message);
});
// Path: server/src/index.ts
