import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ExportsService {
  constructor(private readonly prisma: PrismaService) {}

  findDecks(offset: number, limit: number) {
    return this.prisma.deck.findMany({
      skip: offset,
      take: limit,
    })
  }

  findFlashcards(offset: number, limit: number) {
    return this.prisma.flashcard.findMany({
      skip: offset,
      take: limit,
    })
  }

  findFlashcardExamples(offset: number, limit: number) {
    return this.prisma.flashcardExample.findMany({
      skip: offset,
      take: limit,
    })
  }

  findQuotes(offset: number, limit: number) {
    return this.prisma.quote.findMany({
      skip: offset,
      take: limit,
    })
  }

  findFlashcardReviews(offset: number, limit: number) {
    return this.prisma.flashcardReview.findMany({
      skip: offset,
      take: limit,
    })
  }
}
