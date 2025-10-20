import { Controller, Get, Res } from '@nestjs/common'
import { ExportsService } from './exports.service'
import { Public } from 'src/auth/public.decorator'
import * as archiver from 'archiver'
import { Response } from 'express'
import { createChunkedJsonStream } from './export-stream.util'

@Controller('exports')
@Public()
export class ExportsController {
  constructor(private readonly exportsService: ExportsService) {}

  @Get()
  async create(@Res() res: Response) {
    res.setHeader('Content-Type', 'application/zip')
    res.setHeader(
      'Content-Disposition',
      'attachment; filename="flashcards.zip"',
    )
    const archive = archiver('zip', {
      zlib: { level: 9 },
    })
    archive.on('error', (err) => {
      console.error(err)
      res.status(500).send('Error creating zip file')
    })

    archive.pipe(res)

    const decksStream = createChunkedJsonStream(
      (offset, limit) => this.exportsService.findDecks(offset, limit),
      100,
      (deck) => ({
        id: deck.id,
        name: deck.name,
        description: deck.description,
        createdAt: Number(deck.createdAt),
        updatedAt: Number(deck.updatedAt),
      }),
    )
    const flashcard = createChunkedJsonStream(
      (offset, limit) => this.exportsService.findFlashcards(offset, limit),
      100,
      (flashcard) => ({
        id: flashcard.id,
        word: flashcard.word,
        meaning: flashcard.meaning,
        translation: flashcard.translation,
        phonetic: flashcard.phonetic,
        note: flashcard.note,
        deckId: flashcard.deckId,
        createdAt: Number(flashcard.createdAt),
        updatedAt: Number(flashcard.updatedAt),
      }),
    )
    const examplesStream = createChunkedJsonStream(
      (offset, limit) =>
        this.exportsService.findFlashcardExamples(offset, limit),
      100,
      (example) => ({
        id: example.id,
        text: example.text,
        translation: example.translation,
        type: example.type,
        flashcardId: example.flashcardId,
        createdAt: Number(example.createdAt),
        updatedAt: Number(example.updatedAt),
      }),
    )
    const reviewsStream = createChunkedJsonStream(
      (offset, limit) =>
        this.exportsService.findFlashcardReviews(offset, limit),
      100,
      (review) => ({
        flashcardId: review.flashcardId,
        lastReviewedAt: Number(review.lastReviewedAt),
        nextReviewAt: Number(review.nextReviewAt),
        easeFactor: review.easeFactor,
        interval: review.interval,
        repetitions: review.repetitions,
        lapses: review.lapses,
        createdAt: Number(review.createdAt),
        updatedAt: Number(review.updatedAt),
      }),
    )
    archive.append(decksStream, { name: 'decks.json' })
    archive.append(flashcard, { name: 'flashcards.json' })
    archive.append(examplesStream, { name: 'examples.json' })
    archive.append(reviewsStream, { name: 'reviews.json' })
    await archive.finalize()
  }
}
