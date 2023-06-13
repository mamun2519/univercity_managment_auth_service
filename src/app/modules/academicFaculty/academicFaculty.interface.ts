import { Model } from 'mongoose'
// Crate enastan
export type IAcademicFaculty = {
  title: string
}

// crate custom method
export type AcademicFacultyModel = Model<
  IAcademicFaculty,
  Record<string, unknown>
>

export type IAcademicFacultyFilters = {
  searchTerm: string
  title: string
}
