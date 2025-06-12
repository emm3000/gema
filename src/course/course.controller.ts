import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { CurrentUser } from 'src/auth/user.decorator'
import { User } from 'src/users/entities/user.entity'
import { Course } from 'generated/prisma'

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return await this.courseService.create(user, createCourseDto)
  }

  @Get()
  async findAll(): Promise<Course[]> {
    return await this.courseService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Course> {
    return await this.courseService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<Course> {
    return await this.courseService.update(id, updateCourseDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Course> {
    return await this.courseService.remove(id)
  }

  @Post(':courseId/student')
  async addStudent(
    @Param('courseId') courseId: string,
    @Body() studentIds: string[],
  ): Promise<Course> {
    return await this.courseService.addStudent(courseId, studentIds)
  }
}
