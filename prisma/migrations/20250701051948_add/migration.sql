/*
  Warnings:

  - You are about to drop the column `lastReviewAt` on the `FlashcardReview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FlashcardReview" DROP COLUMN "lastReviewAt",
ADD COLUMN     "lastReviewedAt" INTEGER;
