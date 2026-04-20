// import { Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import { AuthRequest } from "../types/interface.js";

// export const verifyAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized: No token provided",
//     });
//   }

//   try {
//     const secret = process.env.JWT_SECRET || "very_secret_key";
//     const decoded = jwt.verify(token, secret);

//     // Attach decoded user information to the request
//     req.user = decoded as any;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Unauthorized: Invalid token",
//     });
//   }
// };
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, secret) as JwtPayload & {
      id: string;
      email: string;
      role: string;
    };

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};