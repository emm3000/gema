import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ExamplesService } from './examples.service'
import { CreateExampleDto } from './dto/create-example.dto'
import { UpdateExampleDto } from './dto/update-example.dto'
import { Public } from 'src/auth/public.decorator'

@Controller('examples')
@Public()
export class ExamplesController {
  constructor(private readonly examplesService: ExamplesService) {}

  @Post()
  create(@Body() createExampleDto: CreateExampleDto) {
    return this.examplesService.create(createExampleDto)
  }

  @Post('all')
  async createAll(@Body() createExampleDto: CreateExampleDto[]) {
    await this.examplesService.createAll(createExampleDto)
    return { message: 'Examples created successfully' }
  }

  @Get()
  findAll() {
    return this.examplesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.examplesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExampleDto: UpdateExampleDto) {
    return this.examplesService.update(id, updateExampleDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.examplesService.remove(id)
  }
}
