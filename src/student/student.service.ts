import { Injectable } from '@nestjs/common'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Student } from 'generated/prisma'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  create(createStudentDto: CreateStudentDto): Promise<Student> {
    return this.prisma.student.create({
      data: {
        fullName: createStudentDto.fullName,
        dni: createStudentDto.dni,
        email: createStudentDto.email,
        birthDate: new Date(createStudentDto.birthDate),
        gender: createStudentDto.gender,
      },
    })
  }

  findAll(): Promise<Student[]> {
    return this.prisma.student.findMany()
  }

  findOne(id: string): Promise<Student> {
    return this.prisma.student.findUnique({ where: { id } })
  }

  update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    })
  }

  remove(id: string): Promise<Student> {
    return this.prisma.student.delete({ where: { id } })
  }

  addCourse(studentId: string, courseIds: string[]): Promise<Student> {
    return this.prisma.student.update({
      where: { id: studentId },
      data: {
        course: {
          connect: courseIds.map((id) => ({ id })),
        },
      },
      include: {
        course: true,
      },
    })
  }

  createStudentWithCourse(
    createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    return this.prisma.student.create({
      data: {
        fullName: createStudentDto.fullName,
        dni: createStudentDto.dni,
        email: createStudentDto.email,
        gender: createStudentDto.gender,
        course: {
          connect: createStudentDto.coursesId.map((id) => ({ id })),
        },
      },
      include: {
        course: true,
      },
    })
  }

  findStudentsWithCourse(user: User, courseId: string): Promise<Student[]> {
    return this.prisma.student.findMany({
      where: {
        course: {
          some: {
            id: courseId,
            teacherId: user.id,
          },
        },
      },
    })
  }
}
