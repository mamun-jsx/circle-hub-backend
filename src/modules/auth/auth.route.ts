import { Router } from "express";
import { authController } from "./auth.controller.ts";

const authRouter = Router();

authRouter.post("/auth/login", authController.login);
authRouter.post("/auth/register", authController.register);

export const authRoute = { authRouter };

// const authOperation = {
//     POST_REQ:'http://localhost:4001/auth/login"
//     ,POST:'http://localhost:4001/auth/register"
//      }
