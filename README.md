A webapp for a made up gardening company En Garden!

## Stack

- Next.js 15 & React 19
- Shadcn & Tailwind
- Neondb Postgres & DrizzleORM
- React-hook-form & zod
- Tanstack Query
- Kinde Auth
- Sentry

## Development

Run `npm run dev` to start a local app instance. There is a [problem](https://github.com/getsentry/sentry-javascript/issues/8105) with dev instance and turbopack with Sentry, so in case Sentry is needed use `npx next dev`.

[middleware](./src/middleware.ts) checks if user needs to be logged in to access url. If a page doesn't require authentification, it has to be added to config matcher inside [middleware](./src/middleware.ts).

### DB

Postgres instance is hosted on [Neondb](https://neon.tech). Drizzle [schema](./src/db/schema.ts) file contains whole db schema.

## Deployment

App is deployed on Vercel - [link](en-garden.vercel.app)
