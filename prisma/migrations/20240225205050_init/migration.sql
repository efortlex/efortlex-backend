-- CreateEnum
CREATE TYPE "NOTIFICATION_ENUM" AS ENUM ('EMAIL', 'PUSH');

-- CreateTable
CREATE TABLE "notifications" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "loginAlerts" "NOTIFICATION_ENUM"[],
    "bookingAlerts" "NOTIFICATION_ENUM"[],
    "newApartmentAlerts" "NOTIFICATION_ENUM"[],

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "notifications_userId_key" ON "notifications"("userId");

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
