# Scripts Documentation

## Single-step Scripts

### Build scripts

- `build`: Executes all build scrips on repo
- `build:portal`: Executes build on portal app
```json
{ 
    "build": "turbo build",
    "build:portal": "turbo run build --filter=./apps/portal",
}
```

### CI scripts

```json
{ "ci:prepare": "turbo ci:prepare" }
```

### Database scripts

```json
{
    "db:up": "turbo db:up",
    "db:down": "turbo db:down",
}
```

### Run App scripts

- `dev`: Executes all dev comands

```json
{ "dev": "turbo dev" }
```

### Enviroment Pull scripts

- `env:*`: Pulls env vars from vercel

```json
{
    "env:preview": "dotenv -- cross-env-shell \"turbo env:preview\"",
    "env:dev": "dotenv -- cross-env-shell \"turbo env:dev\"",
    "env:prod": "dotenv -- cross-env-shell \"turbo env:prod\"",
}
```

### Prettier scripts

```json
{ "format": "eslint --no-cache --fix && prettier --write \"**/*.{ts,tsx,md}\"" }
```

### Eslint scripts

```json
{
    "lint": "turbo lint",
    "lint:fix": "turbo lint:fix",
}
```

### Database scripts

```json
{
    "db:generate": "dotenv -e ./apps/portal/.env.local -- turbo run db:generate",
    "db:migrate": "dotenv -e ./apps/portal/.env.local -- turbo db:migrate",
    "db:seed": "dotenv -e ./apps/portal/.env.local -- turbo db:seed",
    "db:studio": "dotenv -e ./apps/portal/.env.local -- turbo db:studio",
}
```

### Npm scripts

```json
{ "prepare": "husky install" }
```

"reset": "turbo clean && git clean -xdf node_modules .turbo && pnpm install",

### Testing Scripts

- `test`: Executes all test scripts (multi-step)
- `test:server`: Executes server tests (Custom App server folder)
- `test:watch`: Executes all tests on watch mode (exept app server tests)

```json
{
    "test": "NODE_ENV=test dotenv -e ./apps/portal/.env.local -- turbo test && turbo test:server",
    "test:server": "NODE_ENV=test dotenv -e ./apps/portal/.env.local -- turbo test:server",
    "test:watch": "NODE_ENV=test dotenv -e ./apps/portal/.env.local -- turbo test:watch",
}
```

## Multi-step scripts

### Setup of repo

- `setup:local`: executes all single-step commands to setup the repo. The goal is to be able to execute `pnpm dev` after this script
- `setup:remove`: executes all single step command to remove previous setup. A use-case can be `switching branches`

```json
{
    "setup:local": "pnpm db:up",
    "setup:remove": "pnpm db:down"
}
```