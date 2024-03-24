module.exports = {
  clearMocks: true,
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  testEnvironment: "jsdom",
  coverageReporters: ["json-summary"]
};
