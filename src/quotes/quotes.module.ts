import { Module } from '@nestjs/common'
import { QuotesService } from './quotes.service'
import { QuotesController } from './quotes.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [QuotesController],
  providers: [QuotesService],
  imports: [PrismaModule],
})
export class QuotesModule {}
