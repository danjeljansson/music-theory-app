"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var index_1 = require("./routes/index");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", index_1.default);
exports.default = app;
