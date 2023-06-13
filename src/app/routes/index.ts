import express from 'express'
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes'
import { UserRoutes } from '../modules/users/route'
import { FacultyRoute } from '../modules/academicFaculty/academicFaculty.router'
import { DepartmentRoute } from '../modules/acadmicDepartment/academicDepartment.route'
import { StudentRoute } from '../modules/student/student.route'

const router = express.Router()

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semester',
    route: SemesterRoute,
  },
  {
    path: '/academic-faculty',
    route: FacultyRoute,
  },
  {
    path: '/academic-department',
    route: DepartmentRoute,
  },
  {
    path: '/student',
    route: StudentRoute,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
