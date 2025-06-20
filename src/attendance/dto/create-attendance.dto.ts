export class CreateAttendanceDto {
  readonly date: string
  readonly courseId: string
  readonly students: StudentAttendanceDto[]
}

export class StudentAttendanceDto {
  readonly studentId: string
  readonly status: string
}
