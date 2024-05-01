import { Sequelize } from "sequelize";

const db = new Sequelize("app", "", "", {
  dialect: "sqlite",
  storage: "./app.sqlite",
  logging: false,
});

export default db;
