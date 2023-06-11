import express from 'express'
import { SemesterRoute } from '../modules/academicSemester/academicSemester.routes'
import { UserRoutes } from '../modules/users/route'
import { FacultyRoute } from '../modules/academicFaculty/academicFaculty.router'
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
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
