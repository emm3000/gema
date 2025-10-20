/*
  Warnings:

  - Made the column `nextReviewAt` on table `FlashcardReview` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lastReviewedAt` on table `FlashcardReview` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "FlashcardReview" ALTER COLUMN "nextReviewAt" SET NOT NULL,
ALTER COLUMN "lastReviewedAt" SET NOT NULL;
