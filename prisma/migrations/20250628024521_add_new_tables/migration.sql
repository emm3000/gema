-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "androidId" TEXT NOT NULL,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "phonetic" TEXT NOT NULL,
    "audioPath" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,
    "isGenerated" INTEGER NOT NULL,
    "deckId" TEXT NOT NULL,
    "androidId" TEXT NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardExample" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "flashcardId" TEXT NOT NULL,
    "androidId" TEXT NOT NULL,

    CONSTRAINT "FlashcardExample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "phrase" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "translation" TEXT NOT NULL,
    "example" TEXT NOT NULL,
    "context" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "formality" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "androidId" TEXT NOT NULL,
    "createdAt" BIGINT NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardExample" ADD CONSTRAINT "FlashcardExample_flashcardId_fkey" FOREIGN KEY ("flashcardId") REFERENCES "Flashcard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
