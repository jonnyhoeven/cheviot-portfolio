import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler(
  {
    theme: {
      logo: '/android-chrome-192x192.png'
    },
    secret: process.env.AUTH_SECRET,
    providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
      GithubProvider.default({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
      })
    ]
  }
)
