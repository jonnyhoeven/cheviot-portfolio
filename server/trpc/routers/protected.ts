import { protectedProcedure, router } from '../trpc'
import { throwNotFound, throwError, logToConsole } from './helpers'

export const protectedRouter = router({
  user: protectedProcedure
    .query(async ({ ctx }) => {
      try {
        const q = {
          where: {
            active: true,
            email: ctx.user.email.toString()
          }
        }
        const data = await ctx.prisma.user.findFirst(q)
        if (!data) { throwNotFound() }
        logToConsole('User', q, 1)
        return { ...data }
      } catch (e) { throwError(e) }
    })
})

// export type definition of API
export type AppRouter = typeof protectedRouter;
