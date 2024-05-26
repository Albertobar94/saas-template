# SaaS Starter Kit

The Open Source Turbo SaaS boilerplate.

Please star ⭐ the repo if you want us to continue developing and improving the SaaS Starter Kit! 😀

## Principles

- Colocation
- Modularized code
- Simplicity for DX

## 🛠️ Built With

- [Next.js](https://nextjs.org)
  This is a React framework that provides features such as server-side rendering and static site generation. It's used for building the user interface of your application. The main configuration for Next.js can be found in next.config.js.
- [Tailwind CSS](https://tailwindcss.com)
  This is a utility-first CSS framework for rapidly building custom user interfaces. It's used for styling the application. The configuration for Tailwind CSS can be found in postcss.config.js.
- [Postgres](https://www.postgresql.org)
  This is a powerful, open source object-relational database system. It's used for storing application data. The connection to Postgres is likely managed through Prisma.
- [React](https://reactjs.org)
  This is a JavaScript library for building user interfaces. It's used for creating the interactive elements of your application. The React components are located in the components directory.
- [Drizzle](https://orm.drizzle.team/)
  Drizzle ORM is a headless TypeScript ORM with a head 🐲. It’s the only ORM with both relational and SQL-like query APIs, providing you best of both worlds when it comes to accessing your relational data. Drizzle is lightweight, performant, typesafe, non lactose, gluten-free, sober, flexible and serverless-ready by design.
- [TypeScript](https://www.typescriptlang.org)
  This is a typed superset of JavaScript that compiles to plain JavaScript. It's used to make the code more robust and maintainable. TypeScript definitions and configurations can be found in files like next-env.d.ts and i18next.d.ts.
- [Stripe](https://stripe.com) (Provides Payments)
  This is a service for handling payments. It's used to process payments for the application. The integration of Stripe is likely found in the files associated with billing and subscriptions.
- [Playwright](https://playwright.dev) (Provides E2E tests)
  This is a Node.js library for automating browsers. It's used to run end-to-end tests on the application. The Playwright configuration and tests can be found in the tests directory.
- [Docker](https://www.docker.com) (Provides Docker Compose)
  This is a platform for developing, shipping, and running applications. It's used to containerize the application and its dependencies. The Docker configuration can be found in the Dockerfile and docker-compose.yml.
- [NextAuth.js](https://next-auth.js.org) (Provides Authentication)
  This is a complete open-source authentication solution for Next.js applications. It's used to handle user authentication and authorization. The NextAuth.js configuration and providers can be found in the pages/api/auth/[...nextauth].ts file.

## 🚀 Deployment

<!-- https%3A%2F%2Fgithub.com%2Fboxyhq%2Fsaas-starter-kit&env=NEXTAUTH_SECRET,SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASSWORD,SMTP_FROM,DATABASE_URL,APP_URL -->

<a href="https://vercel.com/new/clone?repository-url=// TODO: implement me ">
<img width="90" alt="Deploy with Vercel" src="https://vercel.com/button" />
</a>

## ✨ Getting Started

Please follow these simple steps to get a local copy up and running.

### Prerequisites

- Node.js (Version: >=18.x)
- PNPM

### Development

#### 1. Setup

- [Fork](https://github.com/Albertobar94/saas-template) the repository
- Clone the repository by using this command:

```bash
git clone https://github.com/<your_github_username>/saas-template.git
```

#### 2. Go to the project folder

```bash
cd saas-template
```

#### 3. Install dependencies

```bash
pnpm install --frozen-lockfile
```

#### 4. Configure Vercel

1. Create vercel account
1. Create project
1. Disable `Automatically expose System Environment Variables`
1. Get values for repo .env file
1. Duplicate `.env.example` to `.env` and add values.

```bash
cp .env.example .env
```

#### 5. Set up your apps/portal .env.local file

1. Configure all providers and get values
1. Add the env vars on each environment

- Preview
- Development
- Production

1. Fetch env vars

```bash
pnpm env:{preview / dev / prod}
```

#### 6. Start the server

In a development environment:

```bash
pnpm dev
```

#### 7. Start the Drizzle Studio or Connect to Neon

Drizzle Studio is a visual editor for the data in your database.

```bash
pnpm db:studio
```

#### 7. Testing

```bash
pnpm test
pnpm test:server
# pnpm test:integration SOON!
# pnpm test:e2e SOON!
```

### 🚀 Apps and Packages

Apps

- `@app/portal`: Main Web Portal with authorization for Admins and Users. Built with [Next.js](https://nextjs.org/).
- `@app/portal-e2e`: E2E test repo for Portal app. Built with [Playwright](https://playwright.dev/)

Packages

- `@package/auth`: authentication module. Built with [Auth.js](https://authjs.dev/).
- `@package/analytics`: analytics focused module. Built with [Analytics](https://getanalytics.io/).
- `@module/shared`: shared code for all apps and packages.
- `@package/config`: repo configuration files.
- `@package/database`: portal database. Built with [Drizzle](https://orm.drizzle.team/)
- `@module/dto`: data transfer objects for portal app. Built with [Zod](https://zod.dev/)
- `@package/eslint-config`: eslint config files. Built with [Eslint](https://eslint.org/)
- `@package/logger`: shared external libraries that require some configuration and are reused in all apps and packages.
- `@package/stripe`: module dedicated to stripe code. Built with [Stripe](https://stripe.com).
- `@package/trpc`: client server library settings for portal app. Built with [Trpc](https://trpc.io/).
- `@module/ui`: a component library shared by all apps. Built with [Shadcn/ui](https://ui.shadcn.com/)

## 🥇 Features

- Create account
- Sign in with Magic Link
- Sign in with Google [[Setting up Google OAuth](https://support.google.com/cloud/answer/6158849?hl=en)]
- Sign in with GitHub [[Creating a Github OAuth App](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)]
- Internationalization
- Dark mode
- Roles and Permissions
- Email notifications
- E2E tests
- Drizzle Studio
- Payments
- Security Headers
- Unit and integration tests

## 🛡️ License

[Apache 2.0 License](https://github.com/boxyhq/saas-starter-kit/blob/main/LICENSE)
