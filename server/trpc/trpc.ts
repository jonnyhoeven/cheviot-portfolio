/**
 * This is your entry point to setup the root configuration for tRPC on the server.
 * - `initTRPC` should only be used once per app.
 * - We export only the functionality that we use so we can enforce which base procedures should be used
 *
 * Learn how to create protected base procedures and other things below:
 * @see https://trpc.io/docs/v10/router
 * @see https://trpc.io/docs/v10/procedures
 */
import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { Role } from '@prisma/client'
import { Context } from '~/server/trpc/context'

const t = initTRPC.context<Context>().create({
  transformer: superjson
})

const isAuthed = t.middleware(async (opts) => {
  const user = await opts.ctx.user
  if ((user?.role === Role.USER || user?.role === Role.ADMIN) && user?.active) {
    return opts.next({ ctx: { user } })
  }

  throw new TRPCError({ code: 'UNAUTHORIZED' })
})

const isAdmin = t.middleware(async (opts) => {
  const user = await opts.ctx.user

  if (user?.role === Role.ADMIN && user?.active) {
    return opts.next({ ctx: { user } })
  }
  throw new TRPCError({ code: 'UNAUTHORIZED' })
})

export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuthed)
export const adminProcedure = t.procedure.use(isAdmin)

export const router = t.router
export const middleware = t.middleware
