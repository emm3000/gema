import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { Student } from 'generated/prisma'

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return await this.studentService.create(createStudentDto)
  }

  @Get()
  async findAll(): Promise<Student[]> {
    return await this.studentService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Student> {
    return await this.studentService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    return await this.studentService.update(id, updateStudentDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Student> {
    return await this.studentService.remove(id)
  }

  @Post(':studentId/course')
  async addCourse(
    @Param('studentId') studentId: string,
    @Body() courseIds: string[],
  ): Promise<Student> {
    return await this.studentService.addCourse(studentId, courseIds)
  }
}
