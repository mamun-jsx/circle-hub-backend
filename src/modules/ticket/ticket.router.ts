import express from "express";
import { ticketController } from "./ticket.controller.ts";
import { checkRole } from "../../middlewares/checkRole.ts";
import { verifyAuth } from "../../middlewares/verifyAuth.ts";
const router = express.Router();

router.post("/api/buy-ticket", ticketController.buyTicket);
router.post("/api/success-payment/:id", ticketController.successPayment);
router.post("/api/fail-payment", ticketController.failPayment);
router.post("/api/cancel-payment/:id", ticketController.cancelPayment);



router.get(
  "/api/all-tickets",
  verifyAuth,
  checkRole(["ADMIN"]),
  ticketController.getAllTickets,
);
export const ticketRouter = router;

