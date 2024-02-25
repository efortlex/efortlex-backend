-- DropForeignKey
ALTER TABLE "maintenance_requests" DROP CONSTRAINT "maintenance_requests_userId_fkey";

-- DropIndex
DROP INDEX "maintenance_requests_userId_key";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "maintenanceRequestsId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_maintenanceRequestsId_fkey" FOREIGN KEY ("maintenanceRequestsId") REFERENCES "maintenance_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;
