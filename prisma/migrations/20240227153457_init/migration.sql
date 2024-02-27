/*
  Warnings:

  - Added the required column `inspectionDate` to the `apartment_bookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apartment_bookings" ADD COLUMN     "inspectionDate" TIMESTAMP(3) NOT NULL;
