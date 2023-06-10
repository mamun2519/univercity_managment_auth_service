import { Model } from 'mongoose'

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type IAcademicSemesterTitle = 'Autumn' | 'Summer' | 'Fall'
export type IAcademicSemesterCode = '01' | '02' | '03'
export type IAcademicSemester = {
  title: IAcademicSemesterTitle
  year: string
  code: IAcademicSemesterCode
  startMonth: Month
  endMonth: Month
}
// Using Method or static
export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>

export type IAcademicSemesterFilters = {
  searchTerm: string
}
