export class CreateHelloDto {
  readonly androidId: string
  readonly decks: DeckDto[]
  readonly flashcards: FlashcardDto[]
  readonly flashcardExamples: FlashcardExampleDto[]
  readonly quotes: QuoteDto[]
}

export class DeckDto {
  readonly deckId: string
  readonly name: string
  readonly description: string
  readonly createdAt: string
  readonly updatedAt: string
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
  readonly createdAt: string
  readonly isGenerated: number
  readonly deckId: string
  readonly updatedAt: string
}

export class FlashcardExampleDto {
  readonly id: string
  readonly text: string
  readonly translation: string
  readonly type: string
  readonly flashcardId: string
  readonly createdAt: string
  readonly updatedAt: string
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
  readonly createdAt: string
  readonly updatedAt: string
}
