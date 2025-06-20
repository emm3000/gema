import { Injectable } from '@nestjs/common'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Attendance, AttendanceStatus, Student } from 'generated/prisma'

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  private parseRoleOrThrow(value: string): AttendanceStatus {
    if (Object.values(AttendanceStatus).includes(value as AttendanceStatus)) {
      return value as AttendanceStatus
    }
    return AttendanceStatus.ABSENT
  }

  findAll(): Promise<Attendance[]> {
    return this.prisma.attendance.findMany()
  }

  findOne(id: string): Promise<Attendance> {
    return this.prisma.attendance.findUnique({ where: { id } })
  }

  findByStudentId(studentId: string): Promise<Attendance[]> {
    return this.prisma.attendance.findMany({ where: { studentId } })
  }

  update(updateAttendanceDto: CreateAttendanceDto): Promise<Attendance[]> {
    return this.prisma.$transaction(
      updateAttendanceDto.students.map((attendance) =>
        this.prisma.attendance.upsert({
          where: {
            date_studentId_courseId: {
              studentId: attendance.studentId,
              courseId: updateAttendanceDto.courseId,
              date: new Date(updateAttendanceDto.date),
            },
          },
          create: {
            date: new Date(updateAttendanceDto.date),
            status: this.parseRoleOrThrow(attendance.status),
            studentId: attendance.studentId,
            courseId: updateAttendanceDto.courseId,
          },
          update: {
            status: this.parseRoleOrThrow(attendance.status),
          },
        }),
      ),
    )
  }

  remove(id: string): Promise<Attendance> {
    return this.prisma.attendance.delete({ where: { id } })
  }

  async findByCourseId(
    courseId: string,
    date: string,
  ): Promise<{ student: Student; status: string }[]> {
    const students = await this.prisma.student.findMany({
      where: {
        course: {
          some: {
            id: courseId,
          },
        },
      },
    })
    const attendance = await this.prisma.attendance.findMany({
      where: {
        courseId,
        date: new Date(date),
      },
    })

    const attendanceMap = new Map<string, Attendance>()
    attendance.forEach((attendance) => {
      attendanceMap.set(attendance.studentId, attendance)
    })

    return students.map((student) => ({
      student,
      status: attendanceMap.get(student.id)?.status ?? AttendanceStatus.ABSENT,
    }))
  }
}
