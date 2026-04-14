

import { Router } from "express";
import { adminController } from "./admin.controller.ts";


const adminRouter = Router()

adminRouter.get("/api/admin/get-all-users",adminController.getAllUser)
adminRouter.post("/api/admin/create-event",adminController.createEvent)
adminRouter.put("/api/admin/update-event/:id",adminController.updateEvent)



export const adminRoute = {adminRouter}


const adminOperation ={
    get:'http://localhost:4001/api/admin/get-all-users'
}