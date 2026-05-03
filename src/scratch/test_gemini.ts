import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function main() {
  try {
    const modelName = "gemini-2.5-flash";
    console.log(`Testing model: ${modelName}`);
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent("Hello, are you there?");
    const response = await result.response;
    console.log("Response:", response.text());
  } catch (error: any) {
    console.error("Gemini Test Error:", error.message || error);
  }
}

main();
