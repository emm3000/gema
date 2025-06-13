import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { Public } from 'src/auth/public.decorator'

@Controller()
@Public()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  health(): string {
    return this.appService.health()
  }
}
