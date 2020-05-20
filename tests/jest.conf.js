const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '../'),
  preset: "jest-puppeteer",
  testEnvironment: "jsdom",
  testSequencer: "./tests/testSequencer.js",
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  coverageDirectory: "tests/coverage",
  collectCoverage: true,
  setupFiles: [
    "./tests/jest.setup.js"
  ]
}
