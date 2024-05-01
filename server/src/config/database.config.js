"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var db = new sequelize_1.Sequelize("app", "", "", {
    dialect: "sqlite",
    storage: "./app.sqlite",
    logging: false,
});
exports.default = db;
