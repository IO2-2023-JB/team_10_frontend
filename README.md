# MojeWideło Team 10 Front-End

## Dependencies

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

This runs a TypeScript check and an ESLint check

## Bundle size analysis

This project uses `rollup-plugin-visualizer` which lets you easily analyze the production build bundle (sizes of all dependencies). Run `yarn build` to generate a report into the `stats.html` file. Open the file in a browser to see the report.
