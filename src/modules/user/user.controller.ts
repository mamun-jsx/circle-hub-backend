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

const getMyTicket = async (req: Request, res: Response) => {
  try {
    const userEmiail = req.params.email as string;
    const getMyTicket = await prisma.booking.findMany({
      where: {
        email: userEmiail,
      },
    });
    if (getMyTicket?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No ticket found",
      });
    }
    res.status(200).json({
      success: true,
      data: getMyTicket,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// provide review
const provideReview = async (req: Request, res: Response) => {
  try {
    const { eventId, userId, rating, comment } = req.body;

    // 1. Basic Validation
    if (!eventId || !userId) {
      return res.status(400).json({
        success: false,
        message: "eventId and userId are required",
      });
    }

    // 2. Direct Create (Let the DB handle the "IsExist" check via unique constraint)
    const review = await prisma.review.create({
      data: {
        eventId,
        userId,
        rating: rating ? Number(rating) : 10,
        comment: comment || null,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review,
    });
  } catch (error: any) {
    // 3. Specific Error Handling
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "You have already reviewed this event",
      });
    }

    if (error.code === "P2003") {
      return res.status(400).json({
        success: false,
        message: "Invalid eventId or userId. Record not found.",
      });
    }

    console.error("Review Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllReview = async (req: Request, res: Response) => {
  try {
    const allReview = await prisma.review.findMany();
    if (allReview?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No review found",
      });
    }
    res.status(200).json({
      success: true,
      data: allReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getMyReview = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  try {
    const myReviews = await prisma.review.findMany({
      where: { userId: userId },
    });
    if (myReviews?.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No review found",
      });
    }
    res.status(200).json({
      success: true,
      data: myReviews,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export const userController = {
  getAllEvents,
  getSingleEvent,
  getMyTicket,
  provideReview,
  getAllReview,
  getMyReview,
};
