import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface DecodedToken {
  id: string;
  username: string;
  iat: number;
  exp: number;
}

function logActiveUser(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1] || "";
  if (!token) {
    return next(); // No token, so not logged in
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as DecodedToken;
    console.log(`Active user: ${decoded.username} with ID ${decoded.id}`);
    // Optionally, you could store this log to a database for persistent tracking
    next();
  } catch (error) {
    console.error("Failed to decode token", error);
    next();
  }
}

export default logActiveUser;
