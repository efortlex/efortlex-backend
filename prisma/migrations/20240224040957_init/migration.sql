-- CreateEnum
CREATE TYPE "APARTMENT_BOOKINGS_STATUS" AS ENUM ('BOOKED', 'UNAVAILABLE', 'PENDING', 'SCHEDULED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photoURL" TEXT;

-- CreateTable
CREATE TABLE "apartment_bookings" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "APARTMENT_BOOKINGS_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apartment_bookings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apartment_bookings_apartmentId_key" ON "apartment_bookings"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "apartment_bookings_userId_key" ON "apartment_bookings"("userId");

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
