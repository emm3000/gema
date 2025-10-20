import { Module } from '@nestjs/common'
import { ExportsService } from './exports.service'
import { ExportsController } from './exports.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [ExportsController],
  providers: [ExportsService],
  imports: [PrismaModule],
})
export class ExportsModule {}
