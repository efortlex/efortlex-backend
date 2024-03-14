/*
  Warnings:

  - You are about to drop the column `approximate` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `precised` on the `locations` table. All the data in the column will be lost.
  - Added the required column `avaliableUnits` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalUnit` to the `apartments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "avaliableUnits" INTEGER NOT NULL,
ADD COLUMN     "policies" TEXT[],
ADD COLUMN     "totalUnit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "locations" DROP COLUMN "approximate",
DROP COLUMN "precised",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
