/*
  Warnings:

  - The `attachment` column on the `maintenance_requests` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "maintenance_requests" DROP COLUMN "attachment",
ADD COLUMN     "attachment" TEXT[];
