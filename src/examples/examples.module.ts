import { Module } from '@nestjs/common'
import { ExamplesService } from './examples.service'
import { ExamplesController } from './examples.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ExamplesController],
  providers: [ExamplesService],
  imports: [PrismaModule],
})
export class ExamplesModule {}
