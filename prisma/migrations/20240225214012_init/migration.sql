-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "loginAlerts" SET DEFAULT ARRAY[]::"NOTIFICATION_ENUM"[],
ALTER COLUMN "bookingAlerts" SET DEFAULT ARRAY[]::"NOTIFICATION_ENUM"[],
ALTER COLUMN "newApartmentAlerts" SET DEFAULT ARRAY[]::"NOTIFICATION_ENUM"[];