# ping-identity-to-do-list

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Notes from Ashish

---

1. PTAL at the ./test-suite.xlsx file. It should give an idea of how I approach writing tests:
   i) Prepare a list of all the possible test cases
   ii) Identify testing strategy against each test from below options in the descending order of priority:
   Unit Tests > Integration Tests > E2Es
   Thereby minimizing the need for more E2Es
2. I could not pen down all the possible test cases because of time contraints, but tried writing a few cypress e2e tests, the store relates UTs and one component's UTs to show-case my skills

---

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```
