import { Injectable } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { Course } from 'generated/prisma'

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User, createCourseDto: CreateCourseDto): Promise<Course> {
    return this.prisma.course.create({
      data: {
        name: createCourseDto.name,
        grade: createCourseDto.grade,
        section: createCourseDto.section,
        level: createCourseDto.level,
        shift: createCourseDto.shift,
        academicYear: createCourseDto.academicYear,
        teacherId: user.id,
      },
    })
  }

  async findAll(): Promise<Course[]> {
    return this.prisma.course.findMany()
  }

  async findOne(id: string): Promise<Course> {
    return this.prisma.course.findUnique({ where: { id } })
  }

  async update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    })
  }

  remove(id: string): Promise<Course> {
    return this.prisma.course.delete({ where: { id } })
  }
}
