/*
  Warnings:

  - You are about to drop the column `duration` on the `apartment_pricings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "apartment_pricings" DROP COLUMN "duration";

-- AlterTable
ALTER TABLE "apartments" ALTER COLUMN "durationOfRent" DROP DEFAULT;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "postalCode" DROP NOT NULL;
