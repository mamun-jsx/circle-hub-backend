import { Router } from "express";
import { authController } from "./auth.controller.ts";

const authRouter = Router();

authRouter.post("/auth/login", authController.login);
authRouter.post("/auth/register", authController.register);
authRouter.get("/auth/user-profile", authController.userProfile);
export const authRoute = { authRouter };


