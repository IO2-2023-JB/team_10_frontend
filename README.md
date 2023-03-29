## Code quality

This command should be run before each commit to ensure code quality

```
yarn lint
```

This runs a TypeScript check and an ESLint check

## Bundle size analysis

This project uses `rollup-plugin-visualizer` which lets you easily analyze the production build bundle (sizes of all dependencies). Run `yarn build` to generate a report into the `stats.html` file. Open the file in a browser to see the report.
