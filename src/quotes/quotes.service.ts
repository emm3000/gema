import { Injectable } from '@nestjs/common'
import { CreateQuoteDto } from './dto/create-quote.dto'
import { UpdateQuoteDto } from './dto/update-quote.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class QuotesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createQuoteDto: CreateQuoteDto) {
    return this.prisma.quote.create({
      data: createQuoteDto,
    })
  }

  findAll() {
    return this.prisma.quote.findMany()
  }

  createMany(createQuoteDto: CreateQuoteDto[]) {
    return this.prisma.$transaction(
      createQuoteDto.map((quote) => {
        return this.prisma.quote.upsert({
          where: {
            id: quote.id,
          },
          create: {
            id: quote.id,
            title: quote.title,
            phrase: quote.phrase,
            description: quote.description,
            translation: quote.translation,
            example: quote.example,
            context: quote.context,
            pronunciation: quote.pronunciation,
            formality: quote.formality,
            tags: quote.tags,
            category: quote.category,
            createdAt: quote.createdAt,
            updatedAt: quote.updatedAt,
          },
          update: {
            id: quote.id,
            title: quote.title,
            phrase: quote.phrase,
            description: quote.description,
            translation: quote.translation,
            example: quote.example,
            context: quote.context,
            pronunciation: quote.pronunciation,
            formality: quote.formality,
            tags: quote.tags,
            category: quote.category,
            createdAt: quote.createdAt,
            updatedAt: quote.updatedAt,
          },
        })
      }),
    )
  }

  findOne(id: string) {
    return this.prisma.quote.findUnique({ where: { id } })
  }

  update(id: string, updateQuoteDto: UpdateQuoteDto) {
    return this.prisma.quote.update({
      where: { id },
      data: updateQuoteDto,
    })
  }

  remove(id: string) {
    return this.prisma.quote.delete({ where: { id } })
  }
}
