import { Request, Response } from "express";

const getAllEvents = async (req: Request, res: Response) => {

    try {
        console.log("Show all user")
        res.status(200).json({
            message: "Show all user", data:[{name:"Mamun", email:"[EMAIL_ADDRESS]"}]
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}


export const userController={getAllEvents};
