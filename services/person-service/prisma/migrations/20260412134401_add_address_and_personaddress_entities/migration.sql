/*
  Warnings:

  - Added the required column `ethnicity` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pncId` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('HOUSE', 'FLAT', 'HMO', 'CARAVAN');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('RESIDES', 'LAST_KNOWN', 'PREVIOUS_ADDRESS');

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "ethnicity" TEXT NOT NULL,
ADD COLUMN     "pncId" TEXT NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Comms" (
    "id" TEXT NOT NULL,
    "contactType" TEXT NOT NULL,
    "contactValue" TEXT NOT NULL,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Comms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "houseNumber" INTEGER,
    "houseName" TEXT,
    "flatNumber" TEXT,
    "streetName" TEXT NOT NULL,
    "townOrCity" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL DEFAULT 'HOUSE',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonAddress" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "addressId" TEXT NOT NULL,
    "relationshipType" "RelationshipType" NOT NULL DEFAULT 'RESIDES',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonAddress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comms" ADD CONSTRAINT "Comms_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAddress" ADD CONSTRAINT "PersonAddress_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAddress" ADD CONSTRAINT "PersonAddress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
