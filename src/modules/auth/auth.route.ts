

import { Router } from "express";
import { authController } from "./auth.controller";


const authRouter = Router()

authRouter.post('/api/login',authController.login)
authRouter.post('/api/register',authController.register)


export const authRoute = {authRouter}

// const authOperation = {
//     POST_REQ:'http://localhost:4001/api/login" 
//     ,POST:'http://localhost:4001/api/register" 
//      }
