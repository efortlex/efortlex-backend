-- CreateEnum
CREATE TYPE "APARTMENT_REQUESTS_STATUS" AS ENUM ('FOUND', 'UNAVAILABLE', 'IN_PROGRESS');

-- CreateTable
CREATE TABLE "apartment_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "apartmentType" "APARTMENT_TYPE" NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "status" "APARTMENT_REQUESTS_STATUS" NOT NULL,

    CONSTRAINT "apartment_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "apartment_requests_userId_key" ON "apartment_requests"("userId");

-- AddForeignKey
ALTER TABLE "apartment_requests" ADD CONSTRAINT "apartment_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
