import { Router } from "express";
import { userController } from "./user.controller.ts";
import { verifyAuth } from "../../middlewares/verifyAuth.ts";

const userRouter = Router();
userRouter.get("/api/events", userController.getAllEvents);
userRouter.get("/api/events/:id", userController.getSingleEvent);
userRouter.get("/api/my-ticket/:email", verifyAuth, userController.getMyTicket);
userRouter.post("/api/review", verifyAuth, userController.provideReview);
userRouter.get("/api/all-review", userController.getAllReview);
userRouter.get("/api/review/:id", verifyAuth, userController.getSingleReview);
userRouter.get(
  "/api/my-review/:userId",
  verifyAuth,
  userController.getMyReview,
);
userRouter.patch("/api/review/:id", verifyAuth, userController.updateReview);

export const userRoute = { userRouter };
