import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { DecksService } from './decks.service'
import { CreateDeckDto } from './dto/create-deck.dto'
import { UpdateDeckDto } from './dto/update-deck.dto'
import { Public } from 'src/auth/public.decorator'

@Controller('decks')
@Public()
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  create(@Body() createDeckDto: CreateDeckDto) {
    return this.decksService.create(createDeckDto)
  }

  @Post('all')
  createAll(@Body() createDeckDto: CreateDeckDto[]) {
    return this.decksService.createAll(createDeckDto)
  }

  @Get()
  findAll() {
    return this.decksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.decksService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeckDto: UpdateDeckDto) {
    return this.decksService.update(id, updateDeckDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.decksService.remove(id)
  }
}
