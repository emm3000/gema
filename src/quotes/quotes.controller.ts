import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { QuotesService } from './quotes.service'
import { CreateQuoteDto } from './dto/create-quote.dto'
import { UpdateQuoteDto } from './dto/update-quote.dto'
import { Public } from 'src/auth/public.decorator'

@Controller('quotes')
@Public()
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quotesService.create(createQuoteDto)
  }

  @Get()
  findAll() {
    return this.quotesService.findAll()
  }

  @Post('all')
  async createMany(@Body() createQuoteDto: CreateQuoteDto[]) {
    await this.quotesService.createMany(createQuoteDto)
    return {
      success: true,
      message: 'Quotes created successfully',
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quotesService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuoteDto: UpdateQuoteDto) {
    return this.quotesService.update(id, updateQuoteDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(id)
  }
}
