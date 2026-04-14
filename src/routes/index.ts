import { Router } from "express";
import { userRoute } from "../modules/user/user.route.ts";
import { adminRoute } from "../modules/admin/admin.route.ts";
import { authRoute } from "../modules/auth/auth.route.ts";

const router = Router();

// user routes
router.use(userRoute.userRouter)    

// admin routes
router.use(adminRoute.adminRouter)


// login routes 
router.use(authRoute.authRouter)
export default router;  
