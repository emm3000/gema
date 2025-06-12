import { Injectable } from '@nestjs/common'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Student } from 'generated/prisma'

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
}
