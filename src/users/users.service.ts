import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private service: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    const user: User | null = await this.service.user.findUnique({
      where: { email },
    })
    return user
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = await this.service.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    })
    return user
  }

  async findAll(): Promise<User[]> {
    return await this.service.user.findMany()
  }

  async remove(id: string) {
    await this.service.user.delete({
      where: { id },
    })
  }
}
