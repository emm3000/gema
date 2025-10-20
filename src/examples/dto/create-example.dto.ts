export class CreateExampleDto {
  readonly id: string
  readonly flashcardId: string
  readonly text: string
  readonly translation: string
  readonly type: string
  readonly createdAt: number
  readonly updatedAt: number
}
