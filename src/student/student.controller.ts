import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { StudentService } from './student.service'
import { CreateStudentDto } from './dto/create-student.dto'
import { UpdateStudentDto } from './dto/update-student.dto'
import { Student } from 'generated/prisma'
import { CurrentUser } from 'src/auth/user.decorator'
import { User } from 'src/users/entities/user.entity'

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

  @Post('create-student-with-course')
  async createStudentWithCourse(
    @Body() createStudentDto: CreateStudentDto,
  ): Promise<Student> {
    try {
      return await this.studentService.createStudentWithCourse(createStudentDto)
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('students-with-course/:courseId')
  async findStudentsWithCourse(
    @Param('courseId') courseId: string,
    @CurrentUser() user: User,
  ): Promise<Student[]> {
    return await this.studentService.findStudentsWithCourse(user, courseId)
  }
}
