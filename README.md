# Justme.dev
This is my personal portfolio site.
Looking for the cheapest cold start solution Next.js app.

I'm using Github Actions to run code inspection and tests.
Gooogle Cloud Build to build and deploy the app to Cloud Run.
The app is hosted on Cloud Run and should use Cloudflare for DNS and CDN.

## Todo
- [ ] describe cloud build setup
- [ ] describe cloud run setup


## Next.js
This uses the standalone build of Next.js. It is not using the Next.js server.
- includes supabase client on server and client side

Before running the app, you must build the app with `npm run build`.
after the build phase make sure to run `npm run export` to generate the static files and copy these to the standalone server build. The static part should be on a CDN or edge network anyways.

## Supabase
This uses Supabase as the backend. be sure to update env.local with your Supabase credentials. [Seeds](./seed/seed.sql)  can be found in the seed folder.

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
Test framwork is undetermined at this time.

## Cloud build CD
Cloud build will recieve a webhook from github and build the app. It will then deploy the app to Cloud Run.
Main should be protected and only allow PRs to be merged into main. This will trigger the build and deploy workflow.

## Docker
The Dockerfile will import the static files during build for the standalone server.
```bash
docker build -t nextjs-docker .
docker run -p 3000:3000 nextjs-docker
```