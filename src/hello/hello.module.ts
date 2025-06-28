import { Module } from '@nestjs/common'
import { HelloService } from './hello.service'
import { HelloController } from './hello.controller'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  controllers: [HelloController],
  providers: [HelloService],
  imports: [PrismaModule],
})
export class HelloModule {}
