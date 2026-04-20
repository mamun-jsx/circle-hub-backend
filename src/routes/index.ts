import { Router } from "express";
import { userRoute } from "../modules/user/user.route.js";
import { adminRoute } from "../modules/admin/admin.route.js";
import { authRoute } from "../modules/auth/auth.route.js";
import { ticketRouter } from "../modules/ticket/ticket.router.js";

const router = Router();

// user routes
router.use(userRoute.userRouter);

// admin routes
router.use(adminRoute.adminRouter);

// login routes
router.use(authRoute.authRouter);

// ticket routes
router.use(ticketRouter);
export default router;
