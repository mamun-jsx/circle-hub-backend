import { prisma } from "./src/lib/prisma.js";

async function test() {
  try {
    console.log("Testing DB connection...");
    const events = await prisma.event.findMany({ take: 1 });
    console.log("Success! Found event:", events[0]?.title);
  } catch (error: any) {
    console.error("DB Error:", error.message || error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
