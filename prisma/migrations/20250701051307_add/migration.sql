/*
  Warnings:

  - Added the required column `createdAt` to the `FlashcardReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FlashcardReview` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FlashcardReview" ADD COLUMN     "createdAt" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TEXT NOT NULL;
