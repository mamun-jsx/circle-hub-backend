import { Router } from "express";
import { userController } from "./user.controller.ts";
import { verifyAuth } from "../../middlewares/verifyAuth.ts";

const userRouter = Router();
userRouter.get("/api/events", userController.getAllEvents);
userRouter.get("/api/events/:id", userController.getSingleEvent);
userRouter.get("/api/my-ticket/:email", verifyAuth, userController.getMyTicket);
userRouter.post("/api/review", verifyAuth, userController.provideReview);
export const userRoute = { userRouter };

const user__Operation = {
  get: "http://localhost:4001/api/events",
  getSingle: "http://localhost:4001/api/events/:id",
  getMyTicket: "http://localhost:4001/api/my-ticket/:email",
  provideReview: "http://localhost:4001/api/review",
};
