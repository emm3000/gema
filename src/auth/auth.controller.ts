import { Controller, Post, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './public.decorator'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Controller('auth')
@Public()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    return await this.authService.register(body)
  }

  @Post('login')
  async login(@Body() body: Omit<CreateUserDto, 'name'>) {
    const user = await this.authService.validateUser(body.email, body.password)
    return await this.authService.login(user)
  }
}
