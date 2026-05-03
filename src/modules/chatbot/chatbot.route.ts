import { Router } from "express";
import { chatbotController } from "./chatbot.controller.js";

const chatbotRouter = Router();

chatbotRouter.post("/api/chatbot", chatbotController.chatWithAI);

export const chatbotRoute = { chatbotRouter };
