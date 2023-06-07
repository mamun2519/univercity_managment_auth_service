import { NextFunction, Request, Response } from 'express'
import { AcademicSemesterService } from './academicSemester.service'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'

const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body
    const semester = await AcademicSemesterService.createSemester(
      academicSemesterData
    )
    next()
    // res.status(200).json({
    //   success: true,
    //   message: 'Academic Semester is crated successfully!',
    //   data: semester,
    // })
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Academic Semester is crated successfully!',
      data: semester,
    })
  }
)

export const AcademicSemesterController = {
  createSemester,
}
