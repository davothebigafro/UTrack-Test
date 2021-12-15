# Front end of project

# Prerequisites

- Node.js https://nodejs.org/en/download/
- Yarn https://yarnpkg.com/en/docs/install

## Install

Upon initial clone, or any changes to `package.json`, run :

```
yarn install
```

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

### `yarn test`

Launches the unit test runner. I've added a small Jest unit test for the Table component, would like to have extensively tested all my components.

### `npx cypress run`

Launches the end to end test runner. You must have the app running already. cypress/integration/sample_spec.js is my example of using cypress for e2e testing.

### `yarn build`

Builds the app for production to the `build` folder.
