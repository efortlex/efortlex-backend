-- CreateEnum
CREATE TYPE "TWO_FACTOR_AUTHENTICATION" AS ENUM ('SMS', 'EMAIL');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "twoFactorAuthentication" "TWO_FACTOR_AUTHENTICATION";

-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "documentNumber" TEXT,
    "frontUrl" TEXT NOT NULL,
    "backUrl" TEXT NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "documents_userId_key" ON "documents"("userId");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
