# Workspace: Packages

## Goal
1. To encapsulate configuration of external libraries. Thus providing a clean import on `apps` and `features`

## What can do
- Import Packages
- Import External Libraries

## What can not do
- Import Apps

## Folder Structure
```sh
├── package.json
├── .eslintrc.js
├── src
│   ├── ./*/*.ts
│   └── index.ts
└── tsconfig.json
```