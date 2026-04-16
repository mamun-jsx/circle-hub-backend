/*
  Warnings:

  - You are about to drop the column `amount` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `eventTitle` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `paymentSession` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `userMobile` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mobile` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizerEmail` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `venue` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "amount",
DROP COLUMN "eventTitle",
DROP COLUMN "paymentSession",
DROP COLUMN "userEmail",
DROP COLUMN "userMobile",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "mobile" TEXT NOT NULL,
ADD COLUMN     "organizerEmail" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Ticket',
ADD COLUMN     "venue" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "status" SET DATA TYPE TEXT;
