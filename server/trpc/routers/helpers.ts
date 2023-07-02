import { TRPCError } from '@trpc/server'

export const throwNotFound = () => {
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'No records found'
  })
}

export const throwError = (e: Error | unknown) => {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: `Exception: ${e}`
  })
}

export const logToConsole = (name: string, q: object, length: number) => {
  console.info(`${name} query: \n`, JSON.stringify(q, null, 2), `\nResults: ${length}`)
}
