import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(private service: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.service.user.findUnique({
      where: { email },
    })
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.service.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
      },
    })
  }

  async findAll(): Promise<User[]> {
    return this.service.user.findMany()
  }

  async remove(id: string): Promise<User> {
    return this.service.user.delete({
      where: { id },
    })
  }
}
