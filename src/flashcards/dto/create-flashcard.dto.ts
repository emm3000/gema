export class CreateFlashcardDto {
  readonly id: string
  readonly deckId: string
  readonly word: string
  readonly meaning: string
  readonly translation: string
  readonly phonetic: string
  readonly note: string
  readonly createdAt: number
  readonly updatedAt: number
}
