import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import {
  CreateHelloDto,
  DeckDto,
  FlashcardDto,
  FlashcardExampleDto,
  FlashcardReviewDto,
  QuoteDto,
} from './dto/create-hello.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class HelloService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAll() {
    const decks = await this.prisma.deck.findMany()
    const flashcards = await this.prisma.flashcard.findMany()
    const flashcardExamples = await this.prisma.flashcardExample.findMany()
    const quotes = await this.prisma.quote.findMany()
    const flashcardReviews = await this.prisma.flashcardReview.findMany()

    return {
      decks,
      flashcards,
      flashcardExamples,
      quotes,
      flashcardReviews,
    }
  }

  async create(createHelloDto: CreateHelloDto) {
    const {
      decks,
      flashcards,
      flashcardExamples,
      quotes,
      androidId,
      flashcardReviews,
    } = createHelloDto

    const errors: { type: string; reason: string }[] = []

    const synced = {
      decks: decks.length,
      flashcards: flashcards.length,
      examples: flashcardExamples.length,
      quotes: quotes.length,
      flashcardReviews: flashcardReviews.length,
    }

    try {
      try {
        await this.syncDecks(decks)
      } catch (err) {
        errors.push({ type: 'deck', reason: err.message })
      }

      try {
        await this.syncFlashcards(flashcards, androidId)
      } catch (err) {
        errors.push({ type: 'flashcard', reason: err.message })
      }

      try {
        await this.syncFlashcardExamples(flashcardExamples, androidId)
      } catch (err) {
        errors.push({ type: 'example', reason: err.message })
      }

      try {
        await this.syncQuotes(quotes, androidId)
      } catch (err) {
        errors.push({ type: 'quote', reason: err.message })
      }

      try {
        await this.syncFlashcardReviews(flashcardReviews)
      } catch (err) {
        errors.push({ type: 'flashcardReview', reason: err.message })
      }

      return {
        success: errors.length === 0,
        message:
          errors.length === 0
            ? 'Synchronization completed successfully.'
            : 'Synchronization completed with some errors.',
        synced,
        errors: errors.length ? errors : [],
      }
    } catch (fatalError) {
      console.log('entramos aqui', fatalError)
      throw new HttpException(
        {
          success: false,
          message: 'Failed to sync data',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
  }

  private async syncFlashcardReviews(
    flashcardReviewsDto: FlashcardReviewDto[],
  ) {
    return this.prisma.$transaction(
      flashcardReviewsDto.map((flashcardReviewDto) => {
        return this.prisma.flashcardReview.upsert({
          where: {
            flashcardId: flashcardReviewDto.flashcardId,
          },
          create: {
            flashcardId: flashcardReviewDto.flashcardId,
            lastReviewedAt: flashcardReviewDto.lastReviewedAt,
            nextReviewAt: flashcardReviewDto.nextReviewAt,
            easeFactor: flashcardReviewDto.easeFactor,
            interval: flashcardReviewDto.interval,
            repetitions: flashcardReviewDto.repetitions,
            lapses: flashcardReviewDto.lapses,
            createdAt: flashcardReviewDto.createdAt,
            updatedAt: flashcardReviewDto.updatedAt,
          },
          update: {
            flashcardId: flashcardReviewDto.flashcardId,
            lastReviewedAt: flashcardReviewDto.lastReviewedAt,
            nextReviewAt: flashcardReviewDto.nextReviewAt,
            easeFactor: flashcardReviewDto.easeFactor,
            interval: flashcardReviewDto.interval,
            repetitions: flashcardReviewDto.repetitions,
            lapses: flashcardReviewDto.lapses,
            createdAt: flashcardReviewDto.createdAt,
            updatedAt: flashcardReviewDto.updatedAt,
          },
        })
      }),
    )
  }

  private async syncDecks(decksDto: DeckDto[]) {
    return this.prisma.$transaction(
      decksDto.map((deckDto) => {
        return this.prisma.deck.upsert({
          where: {
            id: deckDto.deckId,
          },
          create: {
            id: deckDto.deckId,
            name: deckDto.name,
            description: deckDto.description,
            createdAt: deckDto.createdAt,
            updatedAt: deckDto.updatedAt,
          },
          update: {
            name: deckDto.name,
            description: deckDto.description,
            createdAt: deckDto.createdAt,
            updatedAt: deckDto.updatedAt,
          },
        })
      }),
    )
  }

  private async syncFlashcards(
    flashcardsDto: FlashcardDto[],
    androidId: string,
  ) {
    return this.prisma.$transaction(
      flashcardsDto.map((flashcardDto) => {
        return this.prisma.flashcard.upsert({
          where: {
            id: flashcardDto.id,
          },
          create: {
            id: flashcardDto.id,
            word: flashcardDto.word,
            meaning: flashcardDto.meaning,
            translation: flashcardDto.translation,
            phonetic: flashcardDto.phonetic,
            audioPath: flashcardDto.audioPath,
            imagePath: flashcardDto.imagePath,
            note: flashcardDto.note,
            createdAt: flashcardDto.createdAt,
            isGenerated: flashcardDto.isGenerated,
            deckId: flashcardDto.deckId,
            androidId,
          },
          update: {
            word: flashcardDto.word,
            meaning: flashcardDto.meaning,
            translation: flashcardDto.translation,
            phonetic: flashcardDto.phonetic,
            audioPath: flashcardDto.audioPath,
            imagePath: flashcardDto.imagePath,
            note: flashcardDto.note,
            createdAt: flashcardDto.createdAt,
            isGenerated: flashcardDto.isGenerated,
            deckId: flashcardDto.deckId,
            androidId,
          },
        })
      }),
    )
  }

  private async syncFlashcardExamples(
    flashcardExamplesDto: FlashcardExampleDto[],
    androidId: string,
  ) {
    return this.prisma.$transaction(
      flashcardExamplesDto.map((flashcardExampleDto) => {
        return this.prisma.flashcardExample.upsert({
          where: {
            id: flashcardExampleDto.id,
          },
          create: {
            id: flashcardExampleDto.id,
            text: flashcardExampleDto.text,
            translation: flashcardExampleDto.translation,
            type: flashcardExampleDto.type,
            flashcardId: flashcardExampleDto.flashcardId,
            androidId,
          },
          update: {
            text: flashcardExampleDto.text,
            translation: flashcardExampleDto.translation,
            type: flashcardExampleDto.type,
            flashcardId: flashcardExampleDto.flashcardId,
            androidId,
          },
        })
      }),
    )
  }

  private async syncQuotes(quotesDto: QuoteDto[], androidId: string) {
    return this.prisma.$transaction(
      quotesDto.map((quoteDto) => {
        return this.prisma.quote.upsert({
          where: {
            id: quoteDto.id,
          },
          create: {
            id: quoteDto.id,
            title: quoteDto.title,
            phrase: quoteDto.phrase,
            description: quoteDto.description,
            translation: quoteDto.translation,
            example: quoteDto.example,
            context: quoteDto.context,
            pronunciation: quoteDto.pronunciation,
            formality: quoteDto.formality,
            tags: quoteDto.tags,
            createdAt: quoteDto.createdAt,
            androidId,
          },
          update: {
            title: quoteDto.title,
            phrase: quoteDto.phrase,
            description: quoteDto.description,
            translation: quoteDto.translation,
            example: quoteDto.example,
            context: quoteDto.context,
            pronunciation: quoteDto.pronunciation,
            formality: quoteDto.formality,
            tags: quoteDto.tags,
            createdAt: quoteDto.createdAt,
            androidId,
          },
        })
      }),
    )
  }
}
