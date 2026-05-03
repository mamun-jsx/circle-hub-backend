import { Request, Response } from "express";
import SSLCommerzPayment from "sslcommerz-lts";
import { prisma } from "../../lib/prisma.js";

const store_id = process.env.store_id_SSLcommerz || "";
const store_passwd = process.env.store_passwd_SSLcommerz || "";
const is_live = false; // Set to true for production
const BACKEND_URL =
  process.env.BACKEND_URL || "https://event-circle-backend.vercel.app";

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
      success_url: `https://event-circle-backend.vercel.app/api/success-payment/${transactionId}`,
      fail_url: "https://event-circle-backend.vercel.app/api/fail-payment",
      cancel_url: `https://event-circle-backend.vercel.app/api/cancel-payment/${transactionId}`,
      ipn_url: "https://event-circle-backend.vercel.app/api/ipn",
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
const successPayment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  try {
    await prisma.booking.update({
      where: { transactionId: id },
      data: { status: "SUCCESS" },
    });

    // Instead of res.redirect, send this HTML to force a browser GET
    return res.send(`
      <html>
        <head><title>Redirecting...</title></head>
        <body>
          <script>
            window.location.href = "https://event-circle-frontend.vercel.app/dashboard/my-tickets";
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    return res.status(500).send("Error processing success");
  }
};

const failPayment = async (req: Request, res: Response) => {
  return res.send(`
    <html>
      <body>
        <script>
          window.location.href = "https://event-circle-frontend.vercel.app/dashboard/my-tickets?error=payment_failed";
        </script>
      </body>
    </html>
  `);
};

const cancelPayment = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await prisma.booking.update({
    where: { transactionId: id },
    data: { status: "CANCELLED" },
  });
  return res.send(`
    <html>
      <body>
        <script>
          window.location.href = "https://event-circle-frontend.vercel.app/dashboard/my-tickets?error=payment_cancelled";
        </script>
      </body>
    </html>
  `);
};

const getAllTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.booking.findMany({
      where: {
        status: "SUCCESS",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({
      success: true,
      message: "Tickets fetched successfully",
      data: tickets,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const ticketController = {
  buyTicket,
  successPayment,
  failPayment,
  getAllTickets,
  cancelPayment,
};
