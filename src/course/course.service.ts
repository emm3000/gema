import { Injectable } from '@nestjs/common'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/entities/user.entity'
import { Course } from 'generated/prisma'

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  create(user: User, createCourseDto: CreateCourseDto): Promise<Course> {
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

  findAll(user: User): Promise<Course[]> {
    return this.prisma.course.findMany({
      where: {
        teacherId: user.id,
      },
    })
  }

  findOne(id: string): Promise<Course> {
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        student: true,
      },
    })
  }

  update(id: string, updateCourseDto: UpdateCourseDto): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
      include: {
        student: true,
      },
    })
  }

  remove(id: string): Promise<Course> {
    return this.prisma.course.delete({ where: { id } })
  }

  addStudent(courseId: string, studentIds: string[]): Promise<Course> {
    return this.prisma.course.update({
      where: { id: courseId },
      data: {
        student: {
          connect: studentIds.map((id) => ({ id })),
        },
      },
    })
  }
}
