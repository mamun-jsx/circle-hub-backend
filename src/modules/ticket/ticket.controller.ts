import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import { prisma } from "../../lib/prisma.ts";

const store_id = process.env.store_id_SSLcommerz || "";
const store_passwd = process.env.store_passwd_SSLcommerz || "";
const is_live = false; // Set to true for production
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4001";

const buyTicket = async (req: Request, res: Response) => {
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
      type,
      email,
    } = req.body;

    const transactionId = `REF${Date.now()}`;

    const paymentData = {
      total_amount: Number(price),
      currency: "BDT",
      tran_id: transactionId,
      success_url: `http://localhost:4001/api/success-payment/${transactionId}`,
      fail_url: "http://localhost:4001/api/fail-payment",
      cancel_url: `http://localhost:4001/api/cancel-payment/${transactionId}`,
      ipn_url: "http://localhost:4001/api/ipn",
      shipping_method: "NO",
      product_name: title,
      product_category: type || "Ticket",
      product_profile: "general",

      cus_name: userName,
      cus_email: email,
      cus_phone: mobile,
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_country: "Bangladesh",
      cus_postcode: "1000",
      ship_name: userName,
      ship_add1: "Dhaka",
      ship_city: "Dhaka",
      ship_country: "Bangladesh",
      ship_postcode: 1000,
    };

    // 1. Initialize SSLCommerz
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(paymentData);

    if (apiResponse?.GatewayPageURL) {
      // 2. Create the Booking record in DB with PENDING status
      await prisma.booking.create({
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
          status: "PENDING",
        },
      });

      // 3. Return the gateway URL to the frontend
      return res.status(200).json({
        success: true,
        message: "Payment session initiated",
        url: apiResponse.GatewayPageURL,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "SSLCommerz session failed",
      });
    }
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
// for success the payment data
const successPayment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updateStatus = await prisma.booking.update({
    where: {
      transactionId: id,
    },
    data: {
      status: "SUCCESS",
    },
  });
  if (updateStatus) {
    return res.redirect(`http://localhost:3000/dashboard/my-tickets`);
  }
};
// payment failed..
const failPayment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string; // Get transactionId from URL

    // Update status to FAILED in DB
    await prisma.booking.update({
      where: { transactionId: id },
      data: { status: "FAILED" },
    });

    // Redirect to frontend dashboard with an error message
    return res.redirect(`http://localhost:3000/dashboard/my-tickets`);
  } catch (error) {
    console.error("Fail Payment Error:", error);
    return res.redirect(`http://localhost:3000/dashboard/my-tickets`);
  }
};

// cancle any payments
const cancelPayment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const updateStatus = await prisma.booking.update({
    where: {
      transactionId: id,
    },
    data: {
      status: "CANCELLED",
    },
  });
  if (updateStatus) {
    return res.redirect(`http://localhost:3000/dashboard/my-tickets`);
  }
};
export const ticketController = {
  buyTicket,
  successPayment,
  failPayment,
  cancelPayment,
};
