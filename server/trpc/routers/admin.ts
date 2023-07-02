import { z } from 'zod'
import { adminProcedure, router } from '../trpc'
import { throwNotFound, throwError, logToConsole } from './helpers'

const postSchema = z.object({
  slug: z.string().nullish(),
  published: z.boolean().default(false),
  frontpage: z.boolean().default(false),
  title: z.string().nullish(),
  subtitle: z.string().nullish(),
  intro: z.string().nullish(),
  content: z.string().nullish(),
  imageUrl: z.string().nullish(),
  imageAlt: z.string().nullish(),
  linkUrl: z.string().nullish(),
  linkLabel: z.string().nullish()
})

export const adminRouter = router({
  allPosts: adminProcedure
    .input(
      z.object({
        limit: z.number().optional().default(10)
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const q = {
          /* include: { type: true }, */
          take: input.limit
        }
        const data = await ctx.prisma.post.findMany(q)
        // if (!data || data.length === 0) { throwNotFound() }
        logToConsole('allPosts', q, data.length)
        return input.limit === 1 ? data[0] : data
      } catch (e) { throwError(e) }
    }),
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
        logToConsole('postById', q, 1)
        return data
      } catch (e) { throwError(e) }
    }),
  updatePost: adminProcedure
    .input(
      z.object({
        id: z.number(),
        data: postSchema
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        if (!input.data?.title) { throwError('Missing Title') }
        if (!input.data?.slug) { throwError('Missing Slug') }
        const q = {
          where: {
            id: input.id
          },
          data: {
            type: { connect: { id: 1 } },
            user: { connect: { id: ctx.user.id } },
            ...input.data
          }
        }
        // @ts-expect-error
        const updatePost = await ctx.prisma.post.update(q)
        logToConsole('updatePost', q, 1)
        return updatePost
      } catch (e) { throwError(e) }
    }),
  createPost: adminProcedure
    .input(
      z.object({
        data: postSchema
      })
    )
    .query(async ({ input, ctx }) => {
      if (!input.data?.title) { throwError('Missing Title') }
      if (!input.data?.slug) { throwError('Missing Slug') }
      try {
        const q = {
          data: {
            type: { connect: { id: 1 } },
            user: { connect: { id: ctx.user.id } },
            ...input.data
          }
        }
        // @ts-expect-error
        const createPost = await ctx.prisma.post.create(q)
        logToConsole('createPost', q, 1)
        return createPost
      } catch (e) { throwError(e) }
    }),
  deletePost: adminProcedure
    .input(
      z.object({
        id: z.number()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const q = {
          where: {
            id: input.id
          }
        }
        const deletePost = await ctx.prisma.post.delete(q)
        logToConsole('deletePost', q, 1)
        return deletePost
      } catch (e) { throwError(e) }
    })
})

// export type definition of API
export type AppRouter = typeof adminRouter;
