import { router } from '../trpc'
import { publicRouter } from './public'
import { protectedRouter } from './protected'
import { adminRouter } from './admin'

export const appRouter = router({
  public: publicRouter,
  protected: protectedRouter,
  admin: adminRouter
})

// export type definition of API
export type AppRouter = typeof appRouter;
