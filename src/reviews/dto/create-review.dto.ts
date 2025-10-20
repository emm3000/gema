export class CreateReviewDto {
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
