/*
  Warnings:

  - You are about to drop the column `androidId` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `audioPath` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `imagePath` on the `Flashcard` table. All the data in the column will be lost.
  - You are about to drop the column `isGenerated` on the `Flashcard` table. All the data in the column will be lost.
  - Made the column `updatedAt` on table `Flashcard` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "androidId",
DROP COLUMN "audioPath",
DROP COLUMN "imagePath",
DROP COLUMN "isGenerated",
ALTER COLUMN "updatedAt" SET NOT NULL;
