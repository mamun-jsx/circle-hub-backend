import { Router } from "express";
import { adminController } from "./admin.controller.js";
import { verifyAuth } from "../../middlewares/verifyAuth.js";
import { checkRole } from "../../middlewares/checkRole.js";

const adminRouter = Router();

adminRouter.get(
  "/api/admin/get-all-users",
  verifyAuth,
  checkRole(["ADMIN"]),
  adminController.getAllUser,
);
adminRouter.post(
  "/api/admin/create-event",
  verifyAuth,
  checkRole(["ADMIN"]),
  adminController.createEvent,
);
adminRouter.put(
  "/api/admin/update-event/:id",
  verifyAuth,
  checkRole(["ADMIN"]),
  adminController.updateEvent,
);
adminRouter.delete(
  "/api/admin/delete-event/:id",
  verifyAuth,
  checkRole(["ADMIN"]),
  adminController.deleteEventById,
);

export const adminRoute = { adminRouter };

const adminOperation = {
  get: "http://localhost:4001/api/admin/get-all-users",
};
