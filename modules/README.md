# Workspace: Modules

## Goal
1. To encapsulate context based logic that will be used in `apps` and `features`
2. Logic should be generic and not related to business

## What can do
- Import Packages
- Import Modules
- Import External Libraries

## What can not do
- Import Apps

## Folder Structure
```sh
├── package.json
├── .eslintrc.js
├── src
│   ├── index.ts
│   └── lib
│       ├── ./*/*.ts
│       └── index.ts
└── tsconfig.json
```