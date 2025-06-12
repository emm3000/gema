import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { CurrentUser } from 'src/auth/user.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@CurrentUser() user: object): string {
    console.log(user)
    return this.appService.getHello()
  }
}
