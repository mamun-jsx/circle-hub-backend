import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/interface.ts";

export const checkRole = (role: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user information found",
      });
    }
    if (!role.includes(user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient permissions",
      });
    }
    next();
  };
};
