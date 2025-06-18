export class CreateStudentDto {
  readonly fullName: string
  readonly dni: string | null
  readonly email: string | null
  readonly birthDate: string | null
  readonly gender: string | null
  readonly coursesId: string[]
}
