import { IGenericErrorMessage } from './erros'

export type IGenaricErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}
