import { z } from 'zod'
import { publicProcedure, protectedProcedure, router } from '../trpc'
import { throwNotFound, throwError, logToConsole } from './helpers'

export const publicRouter = router({
  post: publicProcedure
    .input(
      z.object({
        frontpage: z.boolean().optional(),
        type: z.string().nullish(),
        slug: z.string().nullish(),
        limit: z.number().min(1).max(100).default(10)
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const q = {
          where: {
            published: true,
            frontpage: input.frontpage,
            slug: { equals: input.slug?.toString() },
            type: { is: { slug: { equals: input.type?.toString() } } }
          },
          include: { type: true },
          take: input.limit
        }
        const data = await ctx.prisma.post.findMany(q)
        if (!data || data.length === 0) { throwNotFound() }
        logToConsole('Post', q, data.length)
        return input.limit === 1 ? data[0] : data
      } catch (e) { throwError(e) }
    }),

  globalSetting: publicProcedure.query(async ({ ctx }) => {
    try {
      const menuItems = await ctx.prisma.menuItem.findMany()
      const data = await ctx.prisma.globalSetting.findMany()
      const strings = {} as { [key: string]: string | null }
      data.forEach((s) => {
        if (s.key) { strings[s.key] = s.value }
      })
      if (!data || data.length === 0) { throwNotFound() }
      logToConsole('globalSetting', {}, data.length)
      return { strings, menuItems }
    } catch (e) { throwError(e) }
  }),
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
export type AppRouter = typeof publicRouter;
