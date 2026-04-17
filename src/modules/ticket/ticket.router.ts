import express from "express";
import { ticketController } from "./ticket.controller.ts";
const router = express.Router();

router.post("/api/buy-ticket", ticketController.buyTicket);
router.post("/api/success-payment/:id", ticketController.successPayment);
router.post("/api/fail-payment", ticketController.failPayment);
router.post("/api/cancel-payment/:id", ticketController.cancelPayment);
export const ticketRouter = router;
