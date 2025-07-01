-- CreateTable
CREATE TABLE "FlashcardReview" (
    "flashcardId" TEXT NOT NULL,
    "lastReviewAt" INTEGER,
    "nextReviewAt" INTEGER,
    "easeFactor" DECIMAL(65,30) NOT NULL,
    "interval" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "lapses" INTEGER NOT NULL,

    CONSTRAINT "FlashcardReview_pkey" PRIMARY KEY ("flashcardId")
);

-- AddForeignKey
ALTER TABLE "FlashcardReview" ADD CONSTRAINT "FlashcardReview_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
