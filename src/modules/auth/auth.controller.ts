import { Request, Response } from "express";

const login = async (req: Request, res: Response) => {
    try {
        console.log("login");
        res.status(200).json({
            success: true,
            message: "login"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "login"
        })
    }
}

// Register 

const register = async (req: Request, res: Response) => {
    try {
        console.log("register");
        res.status(200).json({
            success: true,
            message: "register"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "register"
        })
    }
}

export const authController = { login, register };