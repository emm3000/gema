-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "updatedAt" TEXT;

-- AlterTable
ALTER TABLE "Flashcard" ADD COLUMN     "updatedAt" TEXT;

-- AlterTable
ALTER TABLE "FlashcardExample" ADD COLUMN     "createdAt" TEXT,
ADD COLUMN     "updatedAt" TEXT;

-- AlterTable
ALTER TABLE "Quote" ADD COLUMN     "updatedAt" TEXT,
ALTER COLUMN "createdAt" DROP NOT NULL;
