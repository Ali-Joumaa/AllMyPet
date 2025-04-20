module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.[jt]sx?$": "babel-jest"
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios|react-icons|react-router-dom)/)"
    ],
  };
  