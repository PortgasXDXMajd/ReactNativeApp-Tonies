module.exports = {
    preset: "react-native",
    testEnvironment: "node",
    testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)"],
    testPathIgnorePatterns: [".*.integration.test..*"],
  };
  