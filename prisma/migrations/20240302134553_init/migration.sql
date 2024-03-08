/*
  Warnings:

  - You are about to drop the `amenities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `house_rules` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AMENITIES" AS ENUM ('bathtub', 'fireSmokeDetector', 'cctvCamera', 'sittingBar', 'acUnit', 'doorBell', 'laundry', 'waterHeater', 'outdoorGrill');

-- DropForeignKey
ALTER TABLE "amenities" DROP CONSTRAINT "amenities_apartmentId_fkey";

-- DropForeignKey
ALTER TABLE "house_rules" DROP CONSTRAINT "house_rules_apartmentId_fkey";

-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "amenities" "AMENITIES"[] DEFAULT ARRAY[]::"AMENITIES"[],
ADD COLUMN     "houseRule" TEXT[],
ADD COLUMN     "otherAmenities" TEXT[],
ALTER COLUMN "durationOfRent" SET DEFAULT ARRAY[]::"DURATION_OF_RENT"[],
ALTER COLUMN "tags" SET DEFAULT ARRAY[]::"APARTMENT_TAGS"[];

-- DropTable
DROP TABLE "amenities";

-- DropTable
DROP TABLE "house_rules";
