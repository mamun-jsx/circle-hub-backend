/*
  Warnings:

  - You are about to drop the `Participation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Participation" DROP CONSTRAINT "Participation_userId_fkey";

-- DropTable
DROP TABLE "Participation";

-- DropEnum
DROP TYPE "ParticipationStatus";

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userMobile" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "eventTitle" TEXT NOT NULL,
    "paymentSession" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_transactionId_key" ON "Booking"("transactionId");
