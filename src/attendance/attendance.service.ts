import { Injectable } from '@nestjs/common'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { Attendance, AttendanceStatus, Student } from 'generated/prisma'

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance> {
    return this.prisma.attendance.create({
      data: {
        date: new Date(createAttendanceDto.date),
        status: this.parseRoleOrThrow(createAttendanceDto.status),
        studentId: createAttendanceDto.studentId,
        courseId: createAttendanceDto.courseId,
      },
    })
  }

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

  update(
    id: string,
    updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return this.prisma.attendance.update({
      where: { id },
      data: {
        date: new Date(updateAttendanceDto.date),
        status: this.parseRoleOrThrow(updateAttendanceDto.status),
        studentId: updateAttendanceDto.studentId,
        courseId: updateAttendanceDto.courseId,
      },
    })
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
