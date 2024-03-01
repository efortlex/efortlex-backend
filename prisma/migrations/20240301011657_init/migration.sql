-- DropForeignKey
ALTER TABLE "apartment_bookings" DROP CONSTRAINT "apartment_bookings_apartmentId_fkey";

-- DropForeignKey
ALTER TABLE "apartment_bookings" DROP CONSTRAINT "apartment_bookings_userId_fkey";

-- DropIndex
DROP INDEX "apartment_bookings_apartmentId_key";

-- DropIndex
DROP INDEX "apartment_bookings_userId_key";

-- AlterTable
ALTER TABLE "apartments" ADD COLUMN     "apartmentBookingsId" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "apartmentBookingsId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_apartmentBookingsId_fkey" FOREIGN KEY ("apartmentBookingsId") REFERENCES "apartment_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_apartmentBookingsId_fkey" FOREIGN KEY ("apartmentBookingsId") REFERENCES "apartment_bookings"("id") ON DELETE SET NULL ON UPDATE CASCADE;
