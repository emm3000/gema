/*
  Warnings:

  - You are about to drop the column `androidId` on the `FlashcardExample` table. All the data in the column will be lost.
  - Made the column `createdAt` on table `FlashcardExample` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `FlashcardExample` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FlashcardExample" DROP COLUMN "androidId",
ALTER COLUMN "createdAt" SET NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;
