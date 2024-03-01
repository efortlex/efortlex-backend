-- DropForeignKey
ALTER TABLE "apartments" DROP CONSTRAINT "apartments_apartmentBookingsId_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_apartmentBookingsId_fkey";

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_bookings" ADD CONSTRAINT "apartment_bookings_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
