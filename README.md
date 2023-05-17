# MojeWideło Team 10 Front-End

## Overview

This repository contains the frontend of the MojeWideło application - a video streaming platform implemented during the software engineering course at the Faculty of Mathematics and Information Science of the Warsaw University of Technology.

## Requirements

- NodeJS & NPM

  Download from https://nodejs.org/en

  ```
  node --version
  v16.17.1

  npm --version
  8.15.0
  ```

- Yarn

  ```
  npm install --global yarn

  yarn --version
  1.22.19
  ```

- NPM packages

  Run every time an NPM package is added to/removed from the project. Run in the root directory of this repository.

  ```
  yarn
  ```

## Running

- Run dev server

  ```
  yarn dev
  ```

  App will run on `localhost`. Check command output for URL with port

- Build production version
  ```
  yarn build
  ```
  Production build will be generated in the `build` directory. It is a static HTML/CSS/JS page which can be hosted with any web server.

## Key dependencies

- Vite

  Build tool providing fast development experience for modern web applications. Contains a development server and a build tool that bundles code into optimized production assets.

- MUI

  UI tools suite implementing Google's Material Design principles. Offers a collection of production-ready components and features.

- React Query

  React data-fetching library offering useful tools for asynchronous fetching and updating data via REST API.

- Recoil

  React state management library, alternative to Redux.

## Code formatting

This project uses Prettier for code formatting. Please always format your code before commiting.

How to format:

- VS Code extension (recommended)

  Install the Prettier VS Code extension and set it as the default formatter (`CTRL+SHIFT+P` > `Format Document`).

  Enabling `Format on save` in VS Code settings is also recommended.

- Terminal
  ```
  yarn global add prettier
  prettier --write .
  ```

## Code quality

This command should be run before each commit to ensure code quality

```
yarn lint
```

This runs a TypeScript check, an ESLint check and a Prettier check

## Testing

Run Cypress

- `yarn cypress open`
- `E2E Testing`
- `Start E2E Testing in ____`

Do not close the Cypress window!

## Bundle size analysis

This project uses `rollup-plugin-visualizer` which lets you easily analyze the production build bundle (sizes of all dependencies). Run `yarn build` to generate a report into the `stats.html` file. Open the file in a browser to see the report.

## API

The REST API specification that this project is compatible with is available at:
https://app.swaggerhub.com/apis-docs/MATEUSZZAGORSKI2/VideIO/1.0.2

## Development team

- Norbert Niziołek
- Mikołaj Nowak
- Patryk Saj
- Jakub Sosnowski
- Mateusz Zagórski
