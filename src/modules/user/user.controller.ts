import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.ts";

// get all events
const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany();
    if (allEvents?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No event found",
      });
    }
    // show all events
    res.status(200).json({
      success: true,
      data: allEvents,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get single event

const getSingleEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = await prisma.event.findUnique({
      where: {
        id: id,
      },
    });
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }
    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userController = { getAllEvents, getSingleEvent };