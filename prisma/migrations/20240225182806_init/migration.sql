/*
  Warnings:

  - Added the required column `relationship` to the `nextofkins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "nextofkins" ADD COLUMN     "relationship" TEXT NOT NULL;
