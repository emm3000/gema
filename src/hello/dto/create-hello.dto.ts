export class CreateHelloDto {
  readonly androidId: string
  readonly decks: DeckDto[]
  readonly flashcards: FlashcardDto[]
  readonly flashcardExamples: FlashcardExampleDto[]
  readonly quotes: QuoteDto[]
  readonly flashcardReviews: FlashcardReviewDto[]
}

export class DeckDto {
  readonly deckId: string
  readonly name: string
  readonly description: string
  readonly createdAt: number
  readonly updatedAt: number
}

export class FlashcardDto {
  readonly id: string
  readonly word: string
  readonly meaning: string
  readonly translation: string
  readonly phonetic: string
  readonly audioPath: string
  readonly imagePath: string
  readonly note: string
  readonly createdAt: number
  readonly deckId: string
  readonly updatedAt: number
}

export class FlashcardExampleDto {
  readonly id: string
  readonly text: string
  readonly translation: string
  readonly type: string
  readonly flashcardId: string
  readonly createdAt: number
  readonly updatedAt: number
}

export class QuoteDto {
  readonly id: string
  readonly title: string
  readonly phrase: string
  readonly description: string
  readonly translation: string
  readonly example: string
  readonly context: string
  readonly pronunciation: string
  readonly formality: string
  readonly tags: string
  readonly createdAt: number
  readonly updatedAt: number
}

export class FlashcardReviewDto {
  readonly flashcardId: string
  readonly lastReviewedAt: number
  readonly nextReviewAt: number
  readonly easeFactor: number
  readonly interval: number
  readonly repetitions: number
  readonly lapses: number
  readonly createdAt: number
  readonly updatedAt: number
}
