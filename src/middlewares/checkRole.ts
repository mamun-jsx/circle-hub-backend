import { Request, Response, NextFunction } from "express";

export const checkRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No user information found",
      });
    }

    if (!roles.map(r => r.toUpperCase()).includes(user.role.toUpperCase())) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient permissions",
      });
    }

    next();
  };
};
