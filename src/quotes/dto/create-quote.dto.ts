export class CreateQuoteDto {
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
  readonly category: string
  readonly createdAt: number
  readonly updatedAt: number
}
