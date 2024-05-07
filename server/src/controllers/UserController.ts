import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserInstance from "../model/model";

class UserController {
  async createUser(req: Request, res: Response) {
    const id = uuidv4();
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const newUser = await UserInstance.create({
        ...req.body,
        id,
        username,
        hashedPassword,
      });
      res.status(200).json({ newUser, msg: "User created!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "failed", route: "/register", error: error });
    }
  }

  async userLogin(req: Request, res: Response) {
    try {
      res.status(200).json({
        msg: "User logged in!",
        code: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "failed", route: "/login" });
    }
  }

  async userLogout(req: Request, res: Response) {
    try {
      res.status(200).json({
        msg: "User logged out!",
        code: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "failed", route: "/logout" });
    }
  }
}

export default new UserController();
