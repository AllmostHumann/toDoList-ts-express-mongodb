# MERN Todo list with TypeScript

![To do list](/apps/frontend/public/gif/Animation.gif)

## [Demo](https://todolist-ts-mern-frontend.onrender.com/)

## Introduction

In order to learn something new, I decided to rewrite my task list application to a TypeScript version. I used Vite as the builder for frontend part. For styling, I used TailwindCSS. The main idea in this application was to add a backend written in Express.js, use a MongoDB as database provider, and learn the Zustand library as a replacement for Redux. In addition, I made some changes to the look of the application, including adding the functionality to change the theme. In the app you can create your own account or log in to an existing test account:

- Username: test
- Password: test123

In this version, I added the ability to edit the content of the task. We can do this by clicking on the task content. A new window dedicated to the specific task will open. There you can change the content and status of the task. 

Beyond that, it is still a simple task list application 😆.

## Running locally

If you want to have some fun locally, please pass few steps as below:

This repo use turbopack 

1. Download/clone git repository
2. In root folder pass ```pnpm install```
3. In `apps/backend` folder create ```.env``` file and create your own like below:
```
MONGO_CONNECTION_STRING=mongodb+srv://<username>:<password>@beyondthebasics.abcde.mongodb.net/test
PORT=5000
SESSION_SECRET=<your secret key>

```
4. In backend folder edit app.ts and add new origin for your localhost.
5. In `/frontend/src/api/config/apiRoutes.ts` edit `apiBaseUrl` for your localhost

That's it! If everything went well you shoudl be able to run whole app by typing `pnpm run dev` in main root folder. If you want to run backend or frontend separately just run `pnpm run dev` command in "frontend" or "backend" folder. 

Cheers!

## Description

Simple MERN To do list in React.js with TypeScript, with mobile devices responsiveness.

## Technologies

- React.js
- Vite
- TypeScript
- Zustand
- TanStack Query 5
- TailwindCSS
- React-router
- Axios
- Express.js + express-sessions
- MongoDB + mongoose
- cors, dotenv, envalid, bcrypt, http-errors, morgan

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
