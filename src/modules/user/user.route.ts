import { Router } from "express";
import { userController } from "./user.controller.ts";

const userRouter = Router();
userRouter.get("/api/events", userController.getAllEvents);

export const userRoute = { userRouter };

const user__Operation = {
  get: "http://localhost:4001/api/events",
};
