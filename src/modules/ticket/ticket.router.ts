import express from "express";
import { ticketController } from "./ticket.controller.ts";
const router = express.Router();

router.post("/api/buy-ticket", ticketController.buyTicket);
router.post("/api/success-payment/:id", ticketController.successPayment);
export const ticketRouter = router;
