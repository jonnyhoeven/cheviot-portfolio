import { z } from 'zod'
import { adminProcedure, router } from '../trpc'
import { throwNotFound, throwError, logToConsole } from './helpers'

export const adminRouter = router({
  postById: adminProcedure
    .input(
      z.object({
        id: z.number().optional()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const q = {
          where: {
            id: { equals: input.id }
          },
          include: { type: true }
        }
        const data = await ctx.prisma.post.findFirst(q)
        if (!data) { throwNotFound() }
        logToConsole('Post', q, 1)
        return data
      } catch (e) { throwError(e) }
    }),
  updatePost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        data: z.object({
          type: z.string().nullish(),
          slug: z.string(),
          published: z.boolean(),
          frontpage: z.boolean(),
          title: z.string(),
          subtitle: z.string().nullish(),
          intro: z.string().nullish(),
          content: z.string().nullish(),
          imageUrl: z.string().nullish(),
          imageAlt: z.string().nullish(),
          linkUrl: z.string().nullish(),
          linkLabel: z.string().nullish()
        })
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const q = {
          where: {
            id: { equals: input.id }
          },
          data: input.data
        }
        const data = await ctx.prisma.post.update(q)
        if (!data) { throwNotFound() }
        logToConsole('Post', q, 1)
        return data
      } catch (e) { throwError(e) }
    })
})

// export type definition of API
export type AppRouter = typeof adminRouter;
