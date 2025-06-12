import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './entities/user.entity'

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(id)
  }
}
