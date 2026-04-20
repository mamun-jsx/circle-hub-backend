import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

// get all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();

    if (allUsers?.length === 0) {
      res.status(200).json({
        success: true,
        message: "No user found",
      });
    }
    return res.status(200).json({
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// create an event
const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      title,
      image,
      description,
      date,
      time,
      venue,
      type,
      registrationFee,
      isFeatured,
      organizer,
    } = req.body;
    const organizerEmail = organizer?.email;
    const organizerName = organizer?.name;
    // save data into database
    const result = await prisma.event.create({
      data: {
        title,
        image,
        description,
        date,
        time,
        venue,
        type,
        registrationFee: Number(registrationFee),
        isFeatured: Boolean(isFeatured),
        organizerName,
        organizerEmail,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Event created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Creation Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// update an events by id
const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const {
      title,
      image,
      description,
      date,
      time,
      venue,
      type,
      registrationFee,
      isFeatured,
      organizer,
    } = req.body;
    const result = await prisma.event.update({
      where: {
        id,
      },
      data: {
        title,
        image,
        description,
        date,
        time,
        venue,
        type,
        registrationFee: Number(registrationFee),
        isFeatured: Boolean(isFeatured),
        organizerName: organizer?.name,
        organizerEmail: organizer?.email,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const deleteEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await prisma.event.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const adminController = {
  getAllUser,
  createEvent,
  updateEvent,
  deleteEventById,
};
