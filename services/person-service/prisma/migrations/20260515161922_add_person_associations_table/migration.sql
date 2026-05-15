-- CreateEnum
CREATE TYPE "RelationType" AS ENUM ('UNKNOWN');

-- CreateTable
CREATE TABLE "PersonAssociation" (
    "id" TEXT NOT NULL,
    "sourcePersonId" TEXT NOT NULL,
    "targetPersonId" TEXT NOT NULL,
    "relationType" "RelationType" NOT NULL DEFAULT 'UNKNOWN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonAssociation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PersonAssociation" ADD CONSTRAINT "PersonAssociation_sourcePersonId_fkey" FOREIGN KEY ("sourcePersonId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersonAssociation" ADD CONSTRAINT "PersonAssociation_targetPersonId_fkey" FOREIGN KEY ("targetPersonId") REFERENCES "Person"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
