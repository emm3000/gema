import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { Attendance, Student } from 'generated/prisma'
import { CreateAttendanceDto } from './dto/create-attendance.dto'

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get()
  async findAll(): Promise<Attendance[]> {
    return await this.attendanceService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Attendance> {
    return await this.attendanceService.findOne(id)
  }

  @Get('student/:studentId')
  async findByStudentId(
    @Param('studentId') studentId: string,
  ): Promise<Attendance[]> {
    return await this.attendanceService.findByStudentId(studentId)
  }

  @Patch()
  async update(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance[]> {
    return await this.attendanceService.update(createAttendanceDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Attendance> {
    return await this.attendanceService.remove(id)
  }

  @Get('course/:courseId')
  async findByCourseId(
    @Param('courseId') courseId: string,
    @Query('date') date: string,
  ): Promise<{ student: Student; status: string }[]> {
    return await this.attendanceService.findByCourseId(courseId, date)
  }
}
