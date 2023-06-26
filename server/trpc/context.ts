import { inferAsyncReturnType } from '@trpc/server'
import type { H3Event } from 'h3'
import { getServerSession } from '#auth'

const getUser = async (event: H3Event) => {
  const auth = await getServerSession(event)

  if (auth && auth.user?.email) {
    return event.context.prisma.user.upsert({
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        role: true,
        active: true
      },
      where: { email: auth.user?.email },
      update: {
        name: auth.user?.name,
        image: auth.user?.image
      },
      create: {
        email: auth.user?.email,
        name: auth.user?.name,
        image: auth.user?.image
      }
    })
  }

  return null
}
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export function createContext (event: H3Event) {
  return {
    prisma: event.context.prisma,
    user: getUser(event)
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
