import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { User } from 'src/users/entities/user.entity'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user: User | null = await this.userService.findOne(email)

    if (!user) {
      throw new BadRequestException('User not found')
    }

    const isMatch: boolean = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      throw new BadRequestException('Password does not match')
    }

    return user
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { id: user.id, email: user.email }
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async register(user: CreateUserDto): Promise<{ access_token: string }> {
    const existingUser: User | null = await this.userService.findOne(user.email)
    if (existingUser) {
      throw new BadRequestException('User already exists')
    }

    const hashedPassword: string = bcrypt.hashSync(user.password, 10)
    user.password = hashedPassword

    const newUser: User = await this.userService.create(user)
    return this.login(newUser)
  }
}
