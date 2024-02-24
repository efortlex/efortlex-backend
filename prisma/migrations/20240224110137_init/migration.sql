-- CreateEnum
CREATE TYPE "MAINTENANCE_STATUS" AS ENUM ('RESOLVED', 'CANCELED', 'PENDING');

-- CreateEnum
CREATE TYPE "MAINTENANCE_URGENCY" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- CreateTable
CREATE TABLE "maintenance_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "urgency" "MAINTENANCE_URGENCY" NOT NULL,
    "status" "MAINTENANCE_STATUS" NOT NULL,
    "attachment" TEXT NOT NULL,
    "preferredDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "maintenance_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_requests_userId_key" ON "maintenance_requests"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "maintenance_requests_ticketId_key" ON "maintenance_requests"("ticketId");

-- AddForeignKey
ALTER TABLE "maintenance_requests" ADD CONSTRAINT "maintenance_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
