export class CreateCourseDto {
  readonly name: string
  readonly grade: string
  readonly section: string
  readonly level: string
  readonly shift: string | null
  readonly academicYear: number
}
