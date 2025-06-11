import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { User } from 'src/auth/user.decorator'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@User() user: object): string {
    console.log(user)
    return this.appService.getHello()
  }
}
