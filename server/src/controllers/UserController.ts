import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserInstance from "../model/user";

dotenv.config();

class UserController {
  async createUser(req: Request, res: Response) {
    const id = uuidv4();
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log(req.body);
    try {
      const newUser = await UserInstance.create({
        ...req.body,
        id,
        username,
        password: hashedPassword,
      });
      res.status(200).json({ newUser, msg: "User created!" });
    } catch (error) {
      console.log(error, req.body);
      res.status(500).json({ msg: "failed", route: "/register", error: error });
    }
  }

  async loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await UserInstance.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ msg: "User not found", route: "/login" });
    } else {
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (isPasswordValid) {
        const accessToken = jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1d",
          },
        );
        res.status(200).json({ accessToken, msg: "User logged in!" });
      } else {
        res.status(401).json({ msg: "Invalid password", route: "/login" });
      }
    }
  }
}

export default new UserController();
