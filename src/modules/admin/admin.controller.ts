
import { Request, Response } from "express";



const getAllUser = async(req:Request, res:Response)=>{
    try {
        console.log("user result")
        res.status(200).json({
            success:true,
            message:"user result"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:"user result"
        })
    }
}



export const adminController = {
    getAllUser
}   