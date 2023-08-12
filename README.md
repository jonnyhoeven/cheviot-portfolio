# Justme.dev

This is my personal cheviot 🐑 portfolio site.

I'm using Github Actions to run code/container inspection and tests.
Google Cloud Build to build and deploy the app to Cloud Run.

## Next.js
This uses the standalone build of Next.js. It is not using the Next.js server.
- includes supabase client on server and client side

Before running the app, you must build the app with `npm run build`.
after the build phase make sure to run `npm run export` to generate the static files and copy these to the standalone server build. The static part should be on a CDN or edge network.

## Supabase
This uses Supabase as the backend. be sure to update env.local with your Supabase credentials. [Seeds](./seed/seed.sql) can be found in the seed folder.

## Development
```bash
npm install
npm run dev
```

## Production
```bash
npm run build
npm run export
npm run start
```

## Github Actions CI
Code inspection workflow will add static files to the standalone server build before testing.
Test framework is undetermined at this time.

## Cloud build CD
Cloud build will recieve a webhook from github and build the app. It will then deploy the app to Cloud Run.

## Docker
The Dockerfile will import the static files during build for the standalone server.
`SERVER` arg is needed during build so public env can be baked into standalone server.

```bash
docker build --build-arg SERVER=http://localhost:3000 --build-arg HOSTNAME=localhost:3000 -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```

# todo
- warn Experimental features are not covered by semver, and may cause unexpected or broken application behavior. Use at your own risk.
- warn No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
Attention: Next.js now collects completely anonymous telemetry regarding usage.
