import { Injectable } from '@nestjs/common'
import { CreateDeckDto } from './dto/create-deck.dto'
import { UpdateDeckDto } from './dto/update-deck.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Deck } from 'generated/prisma'

@Injectable()
export class DecksService {
  constructor(private readonly prisma: PrismaService) {}

  create(createDeckDto: CreateDeckDto): Promise<Deck> {
    return this.prisma.deck.create({
      data: {
        id: createDeckDto.id,
        name: createDeckDto.name,
        description: createDeckDto.description,
        createdAt: createDeckDto.createdAt,
        updatedAt: createDeckDto.updatedAt,
      },
    })
  }

  createAll(createDeckDto: CreateDeckDto[]) {
    return this.prisma.deck.createMany({
      data: createDeckDto,
    })
  }

  findAll() {
    return this.prisma.deck.findMany()
  }

  findOne(id: string) {
    return this.prisma.deck.findUnique({ where: { id } })
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return this.prisma.deck.update({
      where: { id },
      data: updateDeckDto,
    })
  }

  remove(id: string) {
    return this.prisma.deck.delete({ where: { id } })
  }
}
