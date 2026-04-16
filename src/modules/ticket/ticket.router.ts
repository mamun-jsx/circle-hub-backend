import express from "express";
import { ticketController } from "./ticket.controller.ts";
const router = express.Router();

router.post("/api/buy-ticket", ticketController.buyTicket);

export const ticketRouter = router;
