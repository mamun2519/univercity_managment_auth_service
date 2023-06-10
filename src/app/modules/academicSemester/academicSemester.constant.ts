import {
  IAcademicSemesterCode,
  IAcademicSemesterTitle,
  Month,
} from './academicSemester.interface'

export const academicSemesterMonths: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const academicSemesterTitle: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
]
export const academicSemesterCode: IAcademicSemesterCode[] = ['01', '02', '03']

export const academicSemesterTitleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
}

export const academicSemesterSearchFiled = ['title', 'code', 'year']

export const academicSemesterFilterEavbleFiled = [
  'searchTerm',
  'title',
  'code',
  'year',
]
