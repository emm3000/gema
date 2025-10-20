import { Module } from '@nestjs/common'
import { FlashcardsService } from './flashcards.service'
import { FlashcardsController } from './flashcards.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
  imports: [PrismaModule],
})
export class FlashcardsModule {}
