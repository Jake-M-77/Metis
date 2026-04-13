-- CreateEnum
CREATE TYPE "MarkerType" AS ENUM ('INFO');

-- CreateEnum
CREATE TYPE "ConditionType" AS ENUM ('OTHER', 'POLICE_BAIL', 'COURT_BAIL');

-- CreateEnum
CREATE TYPE "DescriptorType" AS ENUM ('IDENTIFIER');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('OTHER');

-- CreateTable
CREATE TABLE "WarningMarker" (
    "id" TEXT NOT NULL,
    "markerType" "MarkerType" NOT NULL DEFAULT 'INFO',
    "description" TEXT NOT NULL,
    "enteredBy" TEXT NOT NULL,
    "dateRecorded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "WarningMarker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BailCondition" (
    "id" TEXT NOT NULL,
    "conditionType" "ConditionType" NOT NULL DEFAULT 'OTHER',
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "imposedBy" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "BailCondition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonDescription" (
    "id" TEXT NOT NULL,
    "descriptorType" "DescriptorType" NOT NULL DEFAULT 'IDENTIFIER',
    "description" TEXT NOT NULL,
    "imageURL" TEXT NOT NULL,
    "enteredBy" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "PersonDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonAlias" (
    "id" TEXT NOT NULL,
    "aliasName" TEXT NOT NULL,
    "aliasDob" TIMESTAMP(3),
    "notes" TEXT,
    "enteredBy" TEXT NOT NULL,
    "dateRecorded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "PersonAlias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustodyPhoto" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "dateTaken" TIMESTAMP(3),
    "uploadedBy" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "CustodyPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL DEFAULT 'OTHER',
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "uploadedBy" TEXT NOT NULL,
    "uploadDate" TIMESTAMP(3) NOT NULL,
    "expiryDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonInfo" (
    "id" TEXT NOT NULL,
    "recordCreatedBy" TEXT NOT NULL,
    "sourceSystem" TEXT NOT NULL,
    "lastModifiedBy" TEXT NOT NULL,
    "lastModifiedDate" TIMESTAMP(3) NOT NULL,
    "changeNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "personId" TEXT NOT NULL,

    CONSTRAINT "PersonInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonInfo_personId_key" ON "PersonInfo"("personId");

-- AddForeignKey
ALTER TABLE "WarningMarker" ADD CONSTRAINT "WarningMarker_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BailCondition" ADD CONSTRAINT "BailCondition_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonDescription" ADD CONSTRAINT "PersonDescription_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAlias" ADD CONSTRAINT "PersonAlias_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustodyPhoto" ADD CONSTRAINT "CustodyPhoto_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonInfo" ADD CONSTRAINT "PersonInfo_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
