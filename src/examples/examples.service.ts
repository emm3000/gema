import { Injectable } from '@nestjs/common'
import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ExamplesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createExampleDto: CreateExampleDto) {
    return this.prisma.flashcardExample.create({ data: createExampleDto })
  }

  createAll(createExampleDto: CreateExampleDto[]) {
    return this.prisma.flashcardExample.createMany({ data: createExampleDto })
  }

  findAll() {
    return this.prisma.flashcardExample.findMany()
  }

  findOne(id: string) {
    return this.prisma.flashcardExample.findUnique({ where: { id } })
  }

  update(id: string, updateExampleDto: UpdateExampleDto) {
    return this.prisma.flashcardExample.update({
      where: { id },
      data: updateExampleDto,
    })
  }

  remove(id: string) {
    return this.prisma.flashcardExample.delete({ where: { id } })
  }
}
