import { Injectable } from '@nestjs/common'
import { CreateFlashcardDto } from './dto/create-flashcard.dto'
import { UpdateFlashcardDto } from './dto/update-flashcard.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class FlashcardsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFlashcardDto: CreateFlashcardDto) {
    return this.prisma.flashcard.create({ data: createFlashcardDto })
  }

  createAll(createFlashcardDto: CreateFlashcardDto[]) {
    return this.prisma.flashcard.createMany({ data: createFlashcardDto })
  }

  findAll() {
    return this.prisma.flashcard.findMany()
  }

  findOne(id: string) {
    return this.prisma.flashcard.findUnique({ where: { id } })
  }

  update(id: string, updateFlashcardDto: UpdateFlashcardDto) {
    return this.prisma.flashcard.update({
      where: { id },
      data: updateFlashcardDto,
    })
  }

  remove(id: string) {
    return this.prisma.flashcard.delete({ where: { id } })
  }
}
