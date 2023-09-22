# Justme.dev

This is my personal cheviot 🐑 portfolio site.


I'm using Github Actions to run code/container inspection and tests.
Google Cloud Build to build and deploy the app to Cloud Run.

## Next.js
This uses the standalone build of Next.js. It's not using the Next.js server.
- includes supabase client on server and client side

Before running the app, you must build the app with `npm run build`.
after the build phase make sure to run `npm run export` to generate the static files.

## Supabase
This uses Supabase as the backend. be sure to update env.local with your Supabase credentials. [Seeds](./seed/seed.sql) can be found in the seed folder.

## Development
```bash
nvm use
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

## Google Cloud build CD
Cloud build will recieve a webhook from github and build the app. It will then deploy the app to Cloud Run.

## Docker
The Dockerfile will import the static files during build for the standalone server.
`SERVER` environment argument is needed during build so public env can be baked into standalone server.

```bash
source .env.local
docker build \
--no-cache \
--build-arg _NEXT_PUBLIC_SERVER=$NEXT_PUBLIC_SERVER  \
--build-arg _NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL \
--build-arg _NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY \
--progress plain \
-t nextjs-docker .
```

```bash
docker run -p 3000:3000 nextjs-docker
```
