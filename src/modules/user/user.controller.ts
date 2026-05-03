import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";

// get all events
const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: getMyTicket || [],
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
    const allReview = await prisma.review.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
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

// get user's review by user id...
const getMyReview = async (req: Request, res: Response) => {
  const userId = req.params.id as string; // get user id

  try {
    const myReviews = await prisma.review.findMany({
      where: { userId: userId },
      include: {
        event: {
          select: {
            title: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: myReviews || [],
    });
  } catch (error) {
    console.error("Get My Reviews Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// update review
const updateReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { rating, comment } = req.body;
    const updatedReview = await prisma.review.update({
      where: {
        id: id,
      },
      data: {
        rating: rating,
        comment: comment,
      },
    });
    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// get single review by id
export const getSingleReview = async (req: Request, res: Response) => {
  const reviewId = req.params.id as string;
  try {
    const singleReview = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!singleReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }
    res.status(200).json({
      success: true,
      data: singleReview,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
// buy free ticket
const buyFreeTicket = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      title,
      image,
      date,
      time,
      venue,
      price,
      organizerEmail,
      userName,
      mobile,
      email,
    } = req.body;

    const transactionId = `FREE${Date.now()}`;

    const result = await prisma.booking.create({
      data: {
        transactionId,
        eventId,
        title,
        image,
        date,
        time,
        venue,
        price: Number(price),
        organizerEmail,
        userName,
        email,
        mobile,
        status: "SUCCESS", // Free tickets are automatically successful
      },
    });

    res.status(201).json({
      success: true,
      message: "Free ticket booked successfully",
      data: result,
    });
  } catch (error) {
    console.error("Free Booking Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const deleteReview = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.review.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const userController = {
  getAllEvents,
  getSingleEvent,
  getMyTicket,
  provideReview,
  updateReview,
  getSingleReview,
  getAllReview,
  getMyReview,
  buyFreeTicket,
  deleteReview,
};

