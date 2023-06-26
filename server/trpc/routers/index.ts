import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, protectedProcedure, adminProcedure, router } from '../trpc'

const throwNotFound = () => {
  throw new TRPCError({
    code: 'NOT_FOUND',
    message: 'No records found'
  })
}

const throwError = (e: Error | unknown) => {
  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: `Exception: ${e}`
  })
}

const logToConsole = (name: string, q: object, length: number) => {
  console.info(`${name} query: \n`, q, `\nResults: ${length}`)
}

export const appRouter = router({
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
        return data
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
  test: adminProcedure
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
        logToConsole('Test', q, data.length)
        return { data }
      } catch (e) { throwError(e) }
    })
})

// export type definition of API
export type AppRouter = typeof appRouter;
