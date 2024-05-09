import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (token == null) return res.sendStatus(401); // if there's no token

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403); // if the token has expired or is invalid
    req.user = user;
    next();
  });
}

export default authenticateToken;
