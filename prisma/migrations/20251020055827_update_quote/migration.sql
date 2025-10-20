/*
  Warnings:

  - You are about to drop the column `androidId` on the `Quote` table. All the data in the column will be lost.
  - Changed the type of `createdAt` on the `Flashcard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `Flashcard` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `createdAt` on the `FlashcardExample` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `updatedAt` on the `FlashcardExample` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Flashcard" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" BIGINT NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "FlashcardExample" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" BIGINT NOT NULL,
DROP COLUMN "updatedAt",
ADD COLUMN     "updatedAt" BIGINT NOT NULL;

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "androidId";
