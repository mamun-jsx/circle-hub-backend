import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "../../lib/prisma.js";

const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error(
        "[Chatbot]: GEMINI_API_KEY is missing from environment variables.",
      );
      return res.status(500).json({
        success: false,
        message: "AI configuration error on server",
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let events = [];
    try {
      events = await prisma.event.findMany({
        select: {
          title: true,
          description: true,
          venue: true,
          registrationFee: true,
        },
      });
    } catch (dbError) {
      console.error("[Chatbot DB Error]:", dbError);
    }

    const systemInstruction = `
      You are a helpful AI assistant for "Circle Events". 
      Use the following event data to help users: ${JSON.stringify(events)}.
      If a user asks about events not listed, tell them to check back later.
      Keep answers concise and friendly.
    `;

    const chat = model.startChat({
      history:
        history?.map((h: any) => ({
          role: h.role === "user" ? "user" : "model",
          parts: [{ text: h.content || h.text }],
        })) || [],
    });

    const fullPrompt = `${systemInstruction}\n\nUser Question: ${message}`;

    const result = await chat.sendMessage(fullPrompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({
      success: true,
      data: text,
    });
  } catch (error: any) {
    console.error("[Chatbot Global Error]:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

export const chatbotController = {
  chatWithAI,
};
