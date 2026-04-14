import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

// Define the shape of your decoded User (matching your JWT payload)
export interface IUserPayload extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

// Extend the Express Request
export interface AuthRequest extends Request {
  user?: IUserPayload;
}