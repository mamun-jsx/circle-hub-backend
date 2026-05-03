import { prisma } from "./src/lib/prisma.js";

async function test() {
  try {
    const users = await prisma.user.findMany({ select: { email: true } });
    console.log("Existing Users:", users.map(u => u.email));
  } catch (error: any) {
    console.error("DB Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
