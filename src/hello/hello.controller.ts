import { Controller, Post, Body, Get } from '@nestjs/common'
import { HelloService } from './hello.service'
import { CreateHelloDto } from './dto/create-hello.dto'
import { Public } from 'src/auth/public.decorator'

@Controller('hello')
@Public()
export class HelloController {
  constructor(private readonly helloService: HelloService) {}

  @Post()
  async create(@Body() createHelloDto: CreateHelloDto) {
    console.log('createHelloDto', 'entrmos')
    const result = await this.helloService.create(createHelloDto)
    console.log('result', result)
    return result
  }

  @Get()
  async fetchAll() {
    return await this.helloService.fetchAll()
  }
}
