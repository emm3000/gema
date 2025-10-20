import { Injectable } from '@nestjs/common'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createReviewDto: CreateReviewDto) {
    return this.prisma.flashcardReview.create({
      data: {
        flashcardId: createReviewDto.flashcardId,
        lastReviewedAt: createReviewDto.lastReviewedAt,
        nextReviewAt: createReviewDto.nextReviewAt,
        easeFactor: createReviewDto.easeFactor,
        interval: createReviewDto.interval,
        repetitions: createReviewDto.repetitions,
        lapses: createReviewDto.lapses,
        createdAt: createReviewDto.createdAt,
        updatedAt: createReviewDto.updatedAt,
      },
    })
  }

  createAll(createReviewDto: CreateReviewDto[]) {
    return this.prisma.$transaction(
      createReviewDto.map((review) => {
        return this.prisma.flashcardReview.upsert({
          where: {
            flashcardId: review.flashcardId,
          },
          create: {
            flashcardId: review.flashcardId,
            lastReviewedAt: Number(review.lastReviewedAt),
            nextReviewAt: Number(review.nextReviewAt),
            easeFactor: review.easeFactor,
            interval: review.interval,
            repetitions: review.repetitions,
            lapses: review.lapses,
            createdAt: Number(review.createdAt),
            updatedAt: Number(review.updatedAt),
          },
          update: {
            flashcardId: review.flashcardId,
            lastReviewedAt: Number(review.lastReviewedAt),
            nextReviewAt: Number(review.nextReviewAt),
            easeFactor: review.easeFactor,
            interval: review.interval,
            repetitions: review.repetitions,
            lapses: review.lapses,
            createdAt: Number(review.createdAt),
            updatedAt: Number(review.updatedAt),
          },
        })
      }),
    )
  }

  findAll() {
    return this.prisma.flashcardReview.findMany()
  }

  findOne(id: string) {
    return this.prisma.flashcardReview.findUnique({
      where: { flashcardId: id },
    })
  }

  update(id: string, updateReviewDto: UpdateReviewDto) {
    return this.prisma.flashcardReview.update({
      where: { flashcardId: id },
      data: updateReviewDto,
    })
  }

  remove(id: string) {
    return this.prisma.flashcardReview.delete({ where: { flashcardId: id } })
  }
}
