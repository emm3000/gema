import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { ReviewsService } from './reviews.service'
import { CreateReviewDto } from './dto/create-review.dto'
import { UpdateReviewDto } from './dto/update-review.dto'
import { Public } from 'src/auth/public.decorator'

@Controller('reviews')
@Public()
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto)
  }

  @Post('all')
  async createAll(@Body() createReviewDto: CreateReviewDto[]) {
    await this.reviewsService.createAll(createReviewDto)
    return { message: 'Reviews created successfully' }
  }

  @Get()
  findAll() {
    return this.reviewsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(id, updateReviewDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(id)
  }
}
