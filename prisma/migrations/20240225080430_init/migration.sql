/*
  Warnings:

  - You are about to drop the column `attachment` on the `maintenance_requests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "maintenance_requests" DROP COLUMN "attachment",
ADD COLUMN     "attachments" TEXT[];
