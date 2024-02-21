-- CreateEnum
CREATE TYPE "PROVIDER" AS ENUM ('GOOGLE', 'EMAIL', 'APPLE');

-- CreateEnum
CREATE TYPE "GENDER" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "VERIFICATION_CODE_TYPE" AS ENUM ('EMAIL', 'PASSWORD');

-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('TENANT', 'ADMIN', 'LANDLORD', 'AGENT');

-- CreateEnum
CREATE TYPE "DURATION_OF_RENT" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'QUATERLY', 'SIX_MONTHS', 'ANNUALLY');

-- CreateEnum
CREATE TYPE "APARTMENT_TYPE" AS ENUM ('ONE_BEDROOM', 'SELF_CONTAINED', 'TWO_BEDROOM_OR_MORE', 'DUPLEX', 'BUNGALOW', 'MINI_FLAT', 'PENTHOUSE');

-- CreateEnum
CREATE TYPE "APARTMENT_TAGS" AS ENUM ('ROOMS', 'FLATS', 'ESTATE', 'DUPLEX', 'HOSTELS');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "providers" "PROVIDER"[],
    "gender" "GENDER",
    "role" "ROLE"[],
    "dateOfBirth" TIMESTAMP(3),
    "address" TEXT,
    "state" TEXT,
    "country" TEXT,
    "landmark" TEXT,
    "password" TEXT,
    "emailVerified" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employments" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "employmentStatus" TEXT NOT NULL,
    "employerName" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "monthlyIncome" TEXT NOT NULL,

    CONSTRAINT "employments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nextofkins" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "nextofkins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_codes" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "type" "VERIFICATION_CODE_TYPE" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verification_codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "slug" TEXT NOT NULL,
    "durationOfRent" "DURATION_OF_RENT"[],
    "apartmentType" "APARTMENT_TYPE" NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "numberOfBedroom" INTEGER NOT NULL,
    "numberOfBathroom" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tags" "APARTMENT_TAGS"[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "apartments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_pricings" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "duration" "DURATION_OF_RENT" NOT NULL,
    "rent" DOUBLE PRECISION NOT NULL,
    "serviceCharge" DOUBLE PRECISION NOT NULL,
    "cautionFee" DOUBLE PRECISION NOT NULL,
    "agreementFee" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "apartment_pricings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "approximate" TEXT NOT NULL,
    "precised" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apartment_booking_options" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "installment" BOOLEAN NOT NULL DEFAULT false,
    "selfCheckIn" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "apartment_booking_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "bathtub" BOOLEAN NOT NULL DEFAULT false,
    "fireSmokeDetector" BOOLEAN NOT NULL DEFAULT false,
    "cctvCamera" BOOLEAN NOT NULL DEFAULT false,
    "sittingBar" BOOLEAN NOT NULL DEFAULT false,
    "acUnit" BOOLEAN NOT NULL DEFAULT false,
    "doorBell" BOOLEAN NOT NULL DEFAULT false,
    "laundry" BOOLEAN NOT NULL DEFAULT false,
    "waterHeater" BOOLEAN NOT NULL DEFAULT false,
    "outdoorGrill" BOOLEAN NOT NULL DEFAULT false,
    "others" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "house_rules" (
    "id" TEXT NOT NULL,
    "apartmentId" TEXT NOT NULL,
    "smoking" BOOLEAN NOT NULL DEFAULT false,
    "illegalActivities" BOOLEAN NOT NULL DEFAULT false,
    "gateClose" TEXT NOT NULL,
    "inflammables" TEXT NOT NULL,
    "landlordPermission" TEXT NOT NULL,
    "keyLost" TEXT NOT NULL,
    "loudMusic" INTEGER NOT NULL,
    "nightParties" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "house_rules_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "employments_userId_key" ON "employments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "nextofkins_userId_key" ON "nextofkins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "apartments_slug_key" ON "apartments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "apartment_pricings_apartmentId_key" ON "apartment_pricings"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "locations_apartmentId_key" ON "locations"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "apartment_booking_options_apartmentId_key" ON "apartment_booking_options"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "amenities_apartmentId_key" ON "amenities"("apartmentId");

-- CreateIndex
CREATE UNIQUE INDEX "house_rules_apartmentId_key" ON "house_rules"("apartmentId");

-- AddForeignKey
ALTER TABLE "employments" ADD CONSTRAINT "employments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nextofkins" ADD CONSTRAINT "nextofkins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartments" ADD CONSTRAINT "apartments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_pricings" ADD CONSTRAINT "apartment_pricings_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations" ADD CONSTRAINT "locations_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apartment_booking_options" ADD CONSTRAINT "apartment_booking_options_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "amenities" ADD CONSTRAINT "amenities_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "house_rules" ADD CONSTRAINT "house_rules_apartmentId_fkey" FOREIGN KEY ("apartmentId") REFERENCES "apartments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
