import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { AttendanceService } from './attendance.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'
import { Attendance } from 'generated/prisma'

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post()
  async create(
    @Body() createAttendanceDto: CreateAttendanceDto,
  ): Promise<Attendance> {
    return await this.attendanceService.create(createAttendanceDto)
  }

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceDto,
  ): Promise<Attendance> {
    return await this.attendanceService.update(id, updateAttendanceDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Attendance> {
    return await this.attendanceService.remove(id)
  }
}
